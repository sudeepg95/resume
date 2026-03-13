/**
 * sync-to-latex.ts
 * Generates LaTeX files for Sudeep___AwesomeCV_Resume from sudeep-cv.ts.
 * Run: npm run sync:to-latex  (from resume/ directory)
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cvData } from '../src/data/sudeep-cv';
import type { WorkExperience, Project, Education, Certificate, Skill } from '../src/utils/schemas/cv-schema';

const LATEX_DIR = resolve(process.cwd(), '../Sudeep___AwesomeCV_Resume/sudeep');

const SKILL_CATEGORIES: Record<string, string[]> = {
  Programming: ['JavaScript', 'Python', 'Golang', 'Java', 'Bash'],
  'Frameworks/Libraries': ['React', 'React Native', 'Redux', 'Angular', 'Gatsby', 'Vue.js', 'Express', 'NestJS'],
  'Development Tools': ['Sublime', 'VSCode', 'IntelliJ', 'nano'],
  Technologies: ['HTML5', 'SCSS/LESS/CSS3', 'nginx', 'apache2'],
  'Other Tools': ['Git', 'Webpack', 'Jest', 'Vercel'],
};

const COUNTRY_NAMES: Record<string, string> = { IN: 'India', US: 'USA', GB: 'UK' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return 'Present';
  const [year, month] = isoDate.split('-').map(Number);
  const monthName = new Date(Date.UTC(year, month - 1)).toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${monthName} ${String(year).slice(2)}'`;
}

function formatPhone(phone: string): string {
  const match = phone.replace(/\s/g, '').match(/^\+(\d{1,3})(\d+)$/);
  return match ? `(+${match[1]}) ${match[2]}` : phone;
}

/** Escape LaTeX special characters in user-supplied plain text. */
function esc(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

function write(filename: string, content: string): void {
  const filePath = resolve(LATEX_DIR, filename);
  writeFileSync(filePath, content, 'utf-8');
  console.log(`Written: ${filePath}`);
}

// ─── Generators ──────────────────────────────────────────────────────────────

function generateMain(): string {
  const { basics } = cvData;
  const city = basics.location?.city ?? '';
  const countryCode = basics.location?.country_code ?? '';
  const country = COUNTRY_NAMES[countryCode] ?? countryCode;
  const address = [city, country].filter(Boolean).join(', ');
  const phone = basics.phone ? formatPhone(basics.phone) : '';
  const github = basics.profiles?.find((p) => p.network === 'GitHub')?.username ?? '';
  const linkedin = basics.profiles?.find((p) => p.network === 'LinkedIn')?.username ?? '';

  // String.raw preserves backslashes; ${} interpolations still work
  return (
    String.raw`%!TEX TS-program = xelatex
%!TEX encoding = UTF-8 Unicode
%
% Author:
% Sudeep G <sudeepg95@gmail.com>
%
% AUTO-GENERATED personal info — edit resume/src/data/sudeep-cv.ts then run:
%   npm run sync:to-latex   (from resume/ directory)

%-------------------------------------------------------------------------------
% CONFIGURATIONS
%-------------------------------------------------------------------------------
\documentclass[11pt, a4paper]{awesome-cv}

% Configure page margins with geometry
\geometry{left=1.4cm, top=1.0cm, right=1.4cm, bottom=1.0cm, footskip=.05cm}

% Specify the location of the included fonts
\fontdir[fonts/]

% Color for highlights
\colorlet{awesome}{awesome-skyblue}

% Set false if you don't want to highlight section with awesome color
\setbool{acvSectionColorHighlight}{true}

% Social information separator
\renewcommand{\acvHeaderSocialSep}{\quad\textbar\quad}

%-------------------------------------------------------------------------------
%	PERSONAL INFORMATION
%	AUTO-GENERATED — edit resume/src/data/sudeep-cv.ts
%-------------------------------------------------------------------------------
\name{}{` +
    esc(basics.name) +
    String.raw`}
\position{` +
    esc(basics.label) +
    String.raw`}
\address{` +
    esc(address) +
    String.raw`}

\mobile{` +
    esc(phone) +
    String.raw`}
\email{` +
    esc(basics.email) +
    String.raw`}
\github{` +
    esc(github) +
    String.raw`}
\linkedin{` +
    esc(linkedin) +
    String.raw`}

%-------------------------------------------------------------------------------
\begin{document}

\makecvheader

\makecvfooter
  {\today}
  {Sudeep~~~·~~~Resume}
  {\thepage}

%-------------------------------------------------------------------------------
%	CV/RESUME CONTENT
%-------------------------------------------------------------------------------
\input{subtopics/summary.tex}
\input{subtopics/skills.tex}
\input{subtopics/experience.tex}
\input{subtopics/projects.tex}
\input{subtopics/education.tex}

%-------------------------------------------------------------------------------
\end{document}`
  );
}

function generateSummary(): string {
  const summary = esc(cvData.about.summary);
  return `%-------------------------------------------------------------------------------
%\tSECTION TITLE
%-------------------------------------------------------------------------------
\\cvsection{Summary}


%-------------------------------------------------------------------------------
%\tCONTENT
%-------------------------------------------------------------------------------
\\begin{cvparagraph}

%---------------------------------------------------------
${summary}
\\end{cvparagraph}
`;
}

function generateExperienceEntry(job: WorkExperience, commented = false): string {
  const p = commented ? '% ' : '';
  const location = [job.city, job.country].filter(Boolean).join(', ');
  const startDate = formatDate(job.start_date);
  const endDate = formatDate(job.end_date);
  const dateRange = `${startDate} - ${endDate}`;

  // Fall back to summary when highlights are empty — avoids a blank line inside \cvitems
  const bulletSources: string[] =
    (job.highlights ?? []).length > 0
      ? (job.highlights ?? [])
      : job.summary
        ? [job.summary]
        : [];

  const items = bulletSources.map((h) => `${p}\t\t\t\\item {${esc(h)}}`).join('\n');
  // No trailing \n when empty — a blank line inside \cventry args causes a LaTeX \par error
  const itemsBlock = items ? `${items}\n` : '';

  return (
    `${p}%---------------------------------------------------------\n` +
    `${p}  \\cventry\n` +
    `${p}    {${esc(job.position)}} % Job title\n` +
    `${p}    {${esc(job.name)}} % Organization\n` +
    `${p}    {${esc(location)}} % Location\n` +
    `${p}    {${dateRange}} % Date(s)\n` +
    `${p}    {\n` +
    `${p}\t\t\\begin{cvitems} % Description(s) of tasks/responsibilities\n` +
    itemsBlock +
    `${p}\t\t\\end{cvitems}\n` +
    `${p}    }\n\n`
  );
}

function generateExperience(): string {
  const entries = (cvData.work ?? []).map((job) => generateExperienceEntry(job)).join('');

  return (
    `%-------------------------------------------------------------------------------\n` +
    `%\tSECTION TITLE\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\cvsection{Experience}\n\n\n` +
    `%-------------------------------------------------------------------------------\n` +
    `%\tCONTENT\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\begin{cventries}\n\n` +
    entries +
    `%---------------------------------------------------------\n` +
    `\\end{cventries}\n`
  );
}

function generateSkills(): string {
  const skillMap = new Map<string, string[]>();
  const skills = cvData.skills ?? [];

  // Assign each skill to a category
  for (const [category, names] of Object.entries(SKILL_CATEGORIES)) {
    const matched = skills.filter((s: Skill) => names.includes(s.name)).map((s: Skill) => s.name);
    if (matched.length > 0) skillMap.set(category, matched);
  }

  // Skills not in any category go to "Other"
  const categorized = new Set(Object.values(SKILL_CATEGORIES).flat());
  const uncategorized = skills.filter((s: Skill) => !categorized.has(s.name)).map((s: Skill) => s.name);
  if (uncategorized.length > 0) skillMap.set('Other', uncategorized);

  const rows = Array.from(skillMap.entries())
    .map(([cat, items]) => `  \\cvskill\n    {${esc(cat)}} % Category\n    {${items.map(esc).join(', ')}}`)
    .join('\n%---------------------------------------------------------\n');

  return (
    `%-------------------------------------------------------------------------------\n` +
    `%\tSECTION TITLE\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\cvsection{Skills}\n` +
    `%-------------------------------------------------------------------------------\n` +
    `%\tCONTENT\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\begin{cvskills}\n\n` +
    `%---------------------------------------------------------\n` +
    rows +
    `\n%---------------------------------------------------------\n` +
    `\\end{cvskills}\n`
  );
}

function generateProjectEntry(project: Project): string {
  const org = esc(project.highlights?.[0] ?? '');
  const name = esc(project.name);
  const tech = (project.keywords ?? []).map(esc).join(', ');
  const description = esc(project.description);
  const commented = project.visible === false;
  const p = commented ? '% ' : '';

  return (
    `${p}%---------------------------------------------------------\n` +
    `${p}\t\\cventry\n` +
    `${p}\t{${org}} % Organization\n` +
    `${p}\t{${name}} % Project name\n` +
    `${p}\t{} % Location\n` +
    `${p}\t{${tech}} % Tech stack\n` +
    `${p}\t{\n` +
    `${p}\t\t\\begin{cvitems}\n` +
    `${p}\t\t\t\\item[] ${description}\n` +
    `${p}\t\t\\end{cvitems}\n` +
    `${p}\t}\n\n`
  );
}

function generateProjects(): string {
  const entries = (cvData.projects ?? []).map(generateProjectEntry).join('');

  return (
    `%-------------------------------------------------------------------------------\n` +
    `%\tSECTION TITLE\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\cvsection{Projects}\n\n\n` +
    `%-------------------------------------------------------------------------------\n` +
    `%\tCONTENT\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\begin{cventries}\n\n` +
    entries +
    `%---------------------------------------------------------\n` +
    `\\end{cventries}\n`
  );
}

function generateEducation(): string {
  const certs = cvData.certificates ?? [];
  const education = cvData.education ?? [];

  const certItems = certs
    .map((c: Certificate) => {
      const urlPart = c.url ? ` - \\href{${c.url}}{link}` : '';
      return `\t\t    \\item {\n\t\t        ${esc(c.name)} by ${esc(c.issuer)}${urlPart}\n\t\t    }`;
    })
    .join('\n');

  const certEntry =
    certs.length > 0
      ? `%---------------------------------------------------------\n` +
        `\t\\cventry\n` +
        `\t{Online Certifications} % Degree\n` +
        `\t{Coursera} % Institution\n` +
        `\t{} % Location\n` +
        `\t{} % Date(s)\n` +
        `\t{\n` +
        `\t\t\\begin{cvitems} % Description(s) bullet points\n` +
        `${certItems}\n` +
        `\t\t\\end{cvitems}\n` +
        `\t}\n\n`
      : '';

  const eduEntries = education
    .map((edu: Education) => {
      const degree = esc(`${edu.study_type} in ${edu.area}`);
      const institution = esc(edu.institution);
      const location = esc([edu.city, edu.country].filter(Boolean).join(', '));
      const endYear = edu.end_date ? edu.end_date.split('-')[0] : '';

      return (
        `%---------------------------------------------------------\n` +
        `\t\\cventry\n` +
        `\t{${degree}} % Degree\n` +
        `\t{${institution}} % Institution\n` +
        `\t{${location}} % Location\n` +
        `\t{${endYear}} % Date(s)\n` +
        `\t{\n` +
        `\t}\n\n`
      );
    })
    .join('');

  return (
    `%-------------------------------------------------------------------------------\n` +
    `%\tSECTION TITLE\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\cvsection{Education}\n` +
    `%-------------------------------------------------------------------------------\n` +
    `%\tCONTENT\n` +
    `%-------------------------------------------------------------------------------\n` +
    `\\begin{cventries}\n\n` +
    certEntry +
    eduEntries +
    `%---------------------------------------------------------\n` +
    `\\end{cventries}\n`
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

write('main.tex', generateMain());
write('subtopics/summary.tex', generateSummary());
write('subtopics/experience.tex', generateExperience());
write('subtopics/skills.tex', generateSkills());
write('subtopics/projects.tex', generateProjects());
write('subtopics/education.tex', generateEducation());

console.log('\nDone. Run `make sudeep` in Sudeep___AwesomeCV_Resume/ to rebuild the PDF.');
