// src/utils/schemas/cv-schema.ts
import { z } from 'zod';

// Location Schema
export const LocationSchema = z.object({
  address: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  city: z.string(),
  country_code: z.string(),
  region: z.string().nullable().optional(),
});

// Profile Schema
export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().nullable().optional(),
  url: z.string(),
  icon: z.string().nullable().optional(),
});

// Action Schema
export const ActionSchema = z.object({
  type: z.string(),
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
});

// Basics Schema
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

// About Schema
export const AboutSchema = z.object({
  summary: z.string(),
});

// Work Experience Schema
export const WorkExperienceSchema = z.object({
  name: z.string(),
  position: z.string(),
  type: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  start_date: z.string(), // ISO date format YYYY-MM-DD
  end_date: z.string().nullable().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().nullable().optional(),
  country: z.string().optional(),
});

// Education Schema
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

// Skill Schema
export const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()),
});

// Certificate Schema
export const CertificateSchema = z.object({
  name: z.string(),
  date: z.string().nullable().optional(),
  issuer: z.string(),
  url: z.string().nullable().optional(),
});

// Project Schema
export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  url: z.string().nullable().optional(),
});

// Award Schema
export const AwardSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  awarder: z.string(),
  summary: z.string().optional(),
});

// Publication Schema
export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  release_date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
});

// Language Schema
export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

// Interest Schema
export const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
});

// Reference Schema
export const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
  contact: z.string().optional(),
});

// Volunteer Schema
export const VolunteerSchema = z.object({
  organization: z.string(),
  position: z.string(),
  url: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

// Media Schema
export const MediaSchema = z.object({
  type: z.string(),
  url: z.string(),
  title: z.string().optional(),
});

// Link Schema
export const LinkSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
});

// Main CV Data Schema
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
  skills: z.array(SkillSchema).optional(),
  interests: z.array(InterestSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  links: z.array(LinkSchema).optional(),
  locations: z.array(LocationSchema).optional(),
});

// TypeScript Types
export type CVData = z.infer<typeof CVDataSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type About = z.infer<typeof AboutSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
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
