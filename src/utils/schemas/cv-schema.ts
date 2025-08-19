import { z } from 'zod';

export const LocationSchema = z.object({
  address: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  city: z.string(),
  country_code: z.string(),
  region: z.string().nullable().optional(),
});

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().nullable().optional(),
  url: z.string(),
  icon: z.string().nullable().optional(),
});

export const ActionSchema = z.object({
  type: z.string(),
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
});

export const BasicsSchema = z.object({
  name: z.string(),
  label: z.string(),
  image: z.string().nullable().optional(),
  bg_image: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  url: z.string().nullable().optional(),
  location: LocationSchema.optional(),
  profiles: z.array(ProfileSchema).optional(),
  actions: z.array(ActionSchema).optional(),
});

export const AboutSchema = z.object({
  summary: z.string(),
});

export const WorkExperienceSchema = z.object({
  name: z.string(),
  position: z.string(),
  type: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().nullable().optional(),
  country: z.string().optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  url: z.string().nullable().optional(),
  area: z.string(),
  study_type: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  score: z.string().nullable().optional(),
  courses: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().nullable().optional(),
  country: z.string().optional(),
});

export const SkillItemSchema = z.object({
  title: z.string(),
  icon: z.string(),
  url: z.string(),
});

export const SkillSchema = z.object({
  frameworks: z.array(SkillItemSchema),
  programming: z.array(SkillItemSchema),
  tools: z.array(SkillItemSchema),
});

export const CertificateSchema = z.object({
  name: z.string(),
  date: z.string().nullable().optional(),
  issuer: z.string(),
  url: z.string().nullable().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  url: z.string().nullable().optional(),
});

export const AwardSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  awarder: z.string(),
  summary: z.string().optional(),
});

export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  release_date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
});

export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

export const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
});

export const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
  contact: z.string().optional(),
});

export const VolunteerSchema = z.object({
  organization: z.string(),
  position: z.string(),
  url: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const MediaSchema = z.object({
  type: z.string(),
  url: z.string(),
  title: z.string().optional(),
});

export const LinkSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
});

export const CVDataSchema = z.object({
  basics: BasicsSchema,
  about: AboutSchema,
  media: z.array(MediaSchema).optional(),
  work: z.array(WorkExperienceSchema).optional(),
  volunteer: z.array(VolunteerSchema).optional(),
  education: z.array(EducationSchema).optional(),
  awards: z.array(AwardSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
  skills: SkillSchema.optional(),
  interests: z.array(InterestSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  links: z.array(LinkSchema).optional(),
  locations: z.array(LocationSchema).optional(),
});

export type CVData = z.infer<typeof CVDataSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type About = z.infer<typeof AboutSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Interest = z.infer<typeof InterestSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type Volunteer = z.infer<typeof VolunteerSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Link = z.infer<typeof LinkSchema>;
