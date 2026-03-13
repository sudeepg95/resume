/**
 * sync-from-latex.ts
 * Parses the LaTeX files in Sudeep___AwesomeCV_Resume and regenerates
 * resume/src/data/sudeep-cv.ts from them.
 * Run: npm run sync:from-latex  (from resume/ directory)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const LATEX_DIR = resolve(process.cwd(), '../Sudeep___AwesomeCV_Resume/sudeep');
const OUTPUT_FILE = resolve(process.cwd(), 'src/data/sudeep-cv.ts');

// The resumeLink is not stored in LaTeX; preserve it from the current file.
const RESUME_LINK_FALLBACK =
  'https://drive.google.com/file/d/1ez2cOn9VhzDl45XweK6E0kcsXiX-7aSQ/view?usp=sharing';

// Known skill levels (LaTeX has no level info — preserved from sudeep-cv.ts).
const SKILL_LEVELS: Record<string, number> = {
  JavaScript: 90,
  Python: 90,
  Golang: 80,
  Java: 80,
  Bash: 85,
  React: 95,
  'React Native': 90,
  Redux: 90,
  Angular: 85,
  Gatsby: 80,
  'Vue.js': 80,
  Express: 90,
  NestJS: 85,
  Sublime: 90,
  VSCode: 95,
  IntelliJ: 90,
  nano: 70,
  HTML5: 95,
  'SCSS/LESS/CSS3': 95,
  nginx: 80,
  apache2: 75,
  Git: 95,
  Webpack: 85,
  Jest: 85,
  Vercel: 90,
};

const MONTH_NAMES: Record<string, string> = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

// ─── LaTeX parser utilities ───────────────────────────────────────────────────

function readLatex(filename: string): string {
  return readFileSync(resolve(LATEX_DIR, filename), 'utf-8');
}

/** Extract content of a single regex-captured group, trimmed. */
function extract(text: string, pattern: RegExp): string | null {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

/** Extract balanced brace content starting at pos (pos must point at '{' ). */
function extractBraced(text: string, pos: number): { content: string; nextPos: number } | null {
  if (text[pos] !== '{') return null;
  let depth = 1;
  let i = pos + 1;
  while (i < text.length && depth > 0) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') depth--;
    i++;
  }
  if (depth !== 0) return null;
  return { content: text.slice(pos + 1, i - 1).trim(), nextPos: i };
}

/** Parse N brace-delimited args starting from the position after a command. */
function parseArgs(text: string, startPos: number, n: number): string[] | null {
  const args: string[] = [];
  let pos = startPos;
  for (let i = 0; i < n; i++) {
    // Skip whitespace
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    const result = extractBraced(text, pos);
    if (!result) return null;
    args.push(result.content);
    pos = result.nextPos;
  }
  return args;
}

/** Find all \cventry occurrences in text, along with whether each is commented out. */
function findCvEntries(text: string): Array<{ args: string[]; commented: boolean }> {
  const entries: Array<{ args: string[]; commented: boolean }> = [];
  let searchPos = 0;

  while (searchPos < text.length) {
    const idx = text.indexOf('\\cventry', searchPos);
    if (idx === -1) break;
    searchPos = idx + 1;

    // Determine if this \cventry is on a commented line
    const lineStart = text.lastIndexOf('\n', idx) + 1;
    const linePrefix = text.slice(lineStart, idx);
    const commented = linePrefix.trimStart().startsWith('%');

    const args = parseArgs(text, idx + '\\cventry'.length, 5);
    if (!args) continue;
    entries.push({ args, commented });
  }

  return entries;
}

/** Unescape common LaTeX sequences back to plain text. */
function unesc(text: string): string {
  return text
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '$')
    .replace(/\\#/g, '#')
    .replace(/\\_/g, '_')
    .replace(/\\textbackslash\{\}/g, '\\')
    .replace(/\\textasciitilde\{\}/g, '~')
    .replace(/\\textasciicircum\{\}/g, '^')
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1') // \href{url}{text} → text
    .replace(/\\textsuperscript\{([^}]*)\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract \item contents from a cvitems block. */
function extractItems(cvitemsContent: string): string[] {
  const items: string[] = [];
  let pos = 0;

  while (pos < cvitemsContent.length) {
    const itemIdx = cvitemsContent.indexOf('\\item', pos);
    if (itemIdx === -1) break;
    pos = itemIdx + '\\item'.length;

    // Skip optional [] (used in projects)
    if (cvitemsContent[pos] === '[') {
      const close = cvitemsContent.indexOf(']', pos);
      if (close !== -1) pos = close + 1;
    }

    // Skip whitespace
    while (pos < cvitemsContent.length && /[ \t]/.test(cvitemsContent[pos])) pos++;

    let content = '';
    if (cvitemsContent[pos] === '{') {
      const result = extractBraced(cvitemsContent, pos);
      if (result) {
        content = result.content;
        pos = result.nextPos;
      }
    } else {
      // Unbraced: take until next \item or \end
      const nextItem = cvitemsContent.indexOf('\\item', pos);
      const endEnv = cvitemsContent.indexOf('\\end', pos);
      const stop = Math.min(
        nextItem === -1 ? Infinity : nextItem,
        endEnv === -1 ? Infinity : endEnv
      );
      content = stop === Infinity ? cvitemsContent.slice(pos) : cvitemsContent.slice(pos, stop);
      pos = stop === Infinity ? cvitemsContent.length : stop;
    }

    const cleaned = unesc(content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
    if (cleaned) items.push(cleaned);
  }

  return items;
}

// ─── Date parsing ─────────────────────────────────────────────────────────────

function parseLatexDate(str: string): string | null {
  const s = str.trim();
  // "November 21'" → "2021-11-01"
  const m = s.match(/^(\w+)\s+(\d{2})'$/);
  if (m) {
    const mm = MONTH_NAMES[m[1]];
    if (mm) return `20${m[2]}-${mm}-01`;
  }
  // Plain year "2016" → "2016-01-01"
  const yearOnly = s.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-01-01`;
  return null;
}

function parseDateRange(range: string): { start_date: string; end_date: string | null } | null {
  const parts = range.split(/\s*[-\u2013]\s*/); // handles both - and –
  if (parts.length !== 2) return null;
  const start = parseLatexDate(parts[0]);
  if (!start) return null;
  const endStr = parts[1].trim();
  const end = endStr === 'Present' ? null : parseLatexDate(endStr);
  return { start_date: start, end_date: end };
}

// ─── Section parsers ─────────────────────────────────────────────────────────

function parseMain() {
  const text = readLatex('main.tex');

  const name = extract(text, /\\name\{[^}]*\}\{([^}]+)\}/) ?? 'Sudeep G';
  const label = extract(text, /\\position\{([^}]+)\}/) ?? '';
  const address = extract(text, /\\address\{([^}]+)\}/) ?? '';
  const phone = extract(text, /\\mobile\{([^}]+)\}/) ?? '';
  const email = extract(text, /\\email\{([^}]+)\}/) ?? '';
  const github = extract(text, /\\github\{([^}]+)\}/) ?? '';
  const linkedin = extract(text, /\\linkedin\{([^}]+)\}/) ?? '';

  // Normalize phone: "(+91) 9020709002" → "+919020709002"
  const normalizedPhone = phone.replace(/[() ]/g, '').replace(/^\+/, '+');

  // Parse address: "Bengaluru, India" → city + country code
  const [city = '', countryName = ''] = address.split(',').map((s) => s.trim());
  const COUNTRY_CODES: Record<string, string> = { India: 'IN', USA: 'US', UK: 'GB' };
  const country_code = COUNTRY_CODES[countryName] ?? countryName;

  return {
    name: unesc(name),
    label: unesc(label),
    phone: normalizedPhone,
    email,
    github: unesc(github),
    linkedin: unesc(linkedin),
    city: unesc(city),
    country_code,
  };
}

function parseSummary(): string {
  const text = readLatex('subtopics/summary.tex');
  const match = text.match(/\\begin\{cvparagraph\}([\s\S]*?)\\end\{cvparagraph\}/);
  if (!match) return '';
  return unesc(match[1].replace(/%-+\s*/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
}

function parseExperience() {
  const text = readLatex('subtopics/experience.tex');
  const entries = findCvEntries(text);

  return entries
    .filter(({ commented }) => !commented)
    .map(({ args }) => {
      const [position, name, location, dates, description] = args;
      const dateRange = parseDateRange(dates);
      const highlights = extractItems(description);
      const [city = '', country = ''] = (location || '').split(',').map((s) => s.trim());

      return {
        name: unesc(name),
        position: unesc(position),
        type: null as null,
        url: null as null,
        start_date: dateRange?.start_date ?? '',
        end_date: dateRange?.end_date ?? null,
        summary: '',
        highlights,
        city: unesc(city),
        state: null as null,
        country: unesc(country),
      };
    });
}

function parseSkills() {
  const text = readLatex('subtopics/skills.tex');
  const skills: Array<{ name: string; level: number }> = [];
  const regex = /\\cvskill\s*\{([^}]+)\}\s*\{([^}]+)\}/g;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    const items = m[2].split(',').map((s) => unesc(s.trim()));
    for (const item of items) {
      if (item) {
        skills.push({ name: item, level: SKILL_LEVELS[item] ?? 80 });
      }
    }
  }

  return skills;
}

function parseProjects() {
  const text = readLatex('subtopics/projects.tex');
  const entries = findCvEntries(text);

  return entries.map(({ args, commented }) => {
    const [org, name, , tech, description] = args;
    const keywords = tech
      .split(/,|\\&/)
      .map((s) => unesc(s.trim()))
      .filter(Boolean);
    const items = extractItems(description);
    const descText = items.join(' ');

    return {
      name: unesc(name),
      description: descText,
      highlights: org ? [unesc(org)] : ([] as string[]),
      keywords,
      start_date: undefined as string | undefined,
      end_date: undefined as string | undefined,
      url: null as null,
      visible: !commented,
    };
  });
}

function parseEducation(): { education: ReturnType<typeof parseEduEntries>; certificates: ReturnType<typeof parseCerts> } {
  return {
    education: parseEduEntries(),
    certificates: parseCerts(),
  };
}

function parseEduEntries() {
  const text = readLatex('subtopics/education.tex');
  const entries = findCvEntries(text);

  return entries
    .filter(({ commented }) => !commented)
    .filter(({ args }) => {
      // Skip the "Online Certifications" entry — handled separately
      const degree = args[0].trim();
      return degree !== 'Online Certifications';
    })
    .map(({ args }) => {
      const [degree, institution, location, dates] = args;
      const [city = '', country = ''] = (location || '').split(',').map((s) => s.trim());
      const dateRange = parseDateRange(dates) ?? { start_date: '', end_date: dates.trim() };

      // Parse "B.Tech in Computer Science & Engineering" → study_type + area
      const degreeClean = unesc(degree);
      const inIdx = degreeClean.indexOf(' in ');
      const study_type = inIdx !== -1 ? degreeClean.slice(0, inIdx) : degreeClean;
      const area = inIdx !== -1 ? degreeClean.slice(inIdx + 4) : '';

      return {
        institution: unesc(institution),
        url: null as null,
        area,
        study_type,
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
        score: null as null,
        courses: [] as string[],
        city: unesc(city),
        state: null as null,
        country: unesc(country),
      };
    });
}

function parseCerts() {
  const text = readLatex('subtopics/education.tex');
  const entries = findCvEntries(text);

  const certEntry = entries.find(({ args }) => args[0].trim() === 'Online Certifications');
  if (!certEntry) return [] as Array<{ name: string; date: null; issuer: string; url: null }>;

  const items = extractItems(certEntry.args[4]);

  return items.map((item) => {
    // "TensorFlow in Practice Specialization by deeplearning.ai"
    const byIdx = item.lastIndexOf(' by ');
    const dashIdx = item.lastIndexOf(' - ');

    let name = item;
    let issuer = '';

    if (byIdx !== -1) {
      name = item.slice(0, byIdx).trim();
      issuer = item.slice(byIdx + 4).trim();
      // Strip license suffix after " - "
      const licenseIdx = issuer.indexOf(' - ');
      if (licenseIdx !== -1) issuer = issuer.slice(0, licenseIdx).trim();
    } else if (dashIdx !== -1) {
      name = item.slice(0, dashIdx).trim();
      issuer = item.slice(dashIdx + 3).trim();
    }

    return { name, date: null as null, issuer, url: null as null };
  });
}

// ─── TypeScript serializer ───────────────────────────────────────────────────

function toTS(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((v) => `${inner}${toTS(v, indent + 1)}`).join(',\n');
    return `[\n${items},\n${pad}]`;
  }
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${inner}${k}: ${toTS(v, indent + 1)}`);
    if (entries.length === 0) return '{}';
    return `{\n${entries.join(',\n')},\n${pad}}`;
  }
  return String(value);
}

// ─── Resume link preservation ────────────────────────────────────────────────

function extractResumeLink(): string {
  try {
    const current = readFileSync(OUTPUT_FILE, 'utf-8');
    const match = current.match(/export const resumeLink\s*=\s*'([^']+)'/);
    return match ? match[1] : RESUME_LINK_FALLBACK;
  } catch {
    return RESUME_LINK_FALLBACK;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const basics = parseMain();
const summary = parseSummary();
const work = parseExperience();
const skills = parseSkills();
const projects = parseProjects();
const { education, certificates } = parseEducation();
const resumeLink = extractResumeLink();

const cvData = {
  basics: {
    name: basics.name,
    label: basics.label,
    image: null,
    bg_image: null,
    email: basics.email,
    phone: basics.phone,
    url: null,
    location: {
      address: null,
      postal_code: null,
      city: basics.city,
      country_code: basics.country_code,
      region: null,
    },
    profiles: [
      { network: 'LinkedIn', username: basics.linkedin, url: `https://www.linkedin.com/in/${basics.linkedin}`, icon: null },
      { network: 'GitHub', username: basics.github, url: `https://github.com/${basics.github}`, icon: null },
      { network: 'Email', username: null, url: basics.email, icon: null },
      { network: 'Phone', username: null, url: basics.phone, icon: null },
    ],
    actions: [] as unknown[],
  },
  about: { summary },
  media: [] as unknown[],
  work,
  volunteer: [] as unknown[],
  education,
  awards: [] as unknown[],
  publications: [] as unknown[],
  languages: [] as unknown[],
  certificates,
  skills,
  interests: [] as unknown[],
  references: [] as unknown[],
  projects,
  links: [] as unknown[],
  locations: [] as unknown[],
};

const output = `import type { CVData } from '~/utils/schemas/cv-schema';

// AUTO-GENERATED from LaTeX sources — edit Sudeep___AwesomeCV_Resume/sudeep/ then run:
//   npm run sync:from-latex   (from resume/ directory)

export const resumeLink =
  '${resumeLink}';

export const cvData: CVData = ${toTS(cvData, 0)};

export default cvData;
`;

writeFileSync(OUTPUT_FILE, output, 'utf-8');
console.log(`Written: ${OUTPUT_FILE}`);
console.log('\nDone. Run `npm run type-check` to verify the output is valid.');
