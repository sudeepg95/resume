// src/utils/data-loader.ts
import type { CVData } from './schemas/cv-schema';
import { CVDataSchema } from './schemas/cv-schema';

/**
 * Load and validate CV data from JSON file
 */
export async function loadCVData(dataPath: string): Promise<CVData> {
  try {
    // In Astro, we can import JSON directly
    const data = await import(/* @vite-ignore */ dataPath);
    const jsonData = data.default || data;

    // Validate data against schema
    const validatedData = CVDataSchema.parse(jsonData);

    return validatedData;
  } catch (error) {
    console.error('Error loading CV data:', error);
    throw new Error(`Failed to load CV data from ${dataPath}: ${error}`);
  }
}

/**
 * Transform legacy JSON structure to current schema
 */
export function transformLegacyData(legacyData: any): CVData {
  try {
    // Handle legacy data structure differences
    const transformedData = {
      basics: {
        name: legacyData.basics?.name || '',
        label: legacyData.basics?.label || '',
        image: legacyData.basics?.image || null,
        bg_image: legacyData.basics?.bg_image || null,
        email: legacyData.basics?.email || '',
        phone: legacyData.basics?.phone || undefined,
        url: legacyData.basics?.url || null,
        location: legacyData.basics?.location
          ? {
              address: legacyData.basics.location.address || null,
              postal_code: legacyData.basics.location.postal_code || null,
              city: legacyData.basics.location.city || '',
              country_code: legacyData.basics.location.country_code || '',
              region: legacyData.basics.location.region || null,
            }
          : undefined,
        profiles: legacyData.basics?.profiles || [],
        actions: legacyData.basics?.actions || [],
      },
      about: {
        summary: legacyData.about?.summary || legacyData.basics?.summary || '',
      },
      media: legacyData.media || [],
      work:
        legacyData.work?.map((work: any) => ({
          name: work.name,
          position: work.position,
          type: work.type || null,
          url: work.url || null,
          start_date: work.start_date || work.startDate,
          end_date: work.end_date || work.endDate || null,
          summary: work.summary,
          highlights: work.highlights || [],
          city: work.city,
          state: work.state || null,
          country: work.country,
        })) || [],
      volunteer: legacyData.volunteer || [],
      education:
        legacyData.education?.map((edu: any) => ({
          institution: edu.institution,
          url: edu.url || null,
          area: edu.area,
          study_type: edu.study_type || edu.studyType,
          start_date: edu.start_date || edu.startDate,
          end_date: edu.end_date || edu.endDate || null,
          score: edu.score || null,
          courses: edu.courses || [],
          city: edu.city,
          state: edu.state || null,
          country: edu.country,
        })) || [],
      awards: legacyData.awards || [],
      publications: legacyData.publications || [],
      languages: legacyData.languages || [],
      certificates: legacyData.certificates || [],
      skills: legacyData.skills || [],
      interests: legacyData.interests || [],
      references: legacyData.references || [],
      projects: legacyData.projects || [],
      links: legacyData.links || [],
      locations: legacyData.locations || [],
    };

    // Validate transformed data
    return CVDataSchema.parse(transformedData);
  } catch (error) {
    console.error('Error transforming legacy data:', error);
    throw new Error(`Failed to transform legacy data: ${error}`);
  }
}

/**
 * Get all available CV data files
 */
export async function getAvailableDataFiles(): Promise<string[]> {
  // This would be implemented based on your file structure
  // For now, return a hardcoded list
  return ['sudeep-cv.json'];
}

/**
 * Generate static paths for dynamic routing
 */
export async function generateCVPaths() {
  const dataFiles = import.meta.glob('/src/data/*.json');
  const paths = [];

  for (const path in dataFiles) {
    try {
      const data = (await dataFiles[path]()) as { default: any };
      const fileName = path.split('/').pop()?.replace('.json', '') || 'resume';

      // Transform and validate data
      const transformedData = transformLegacyData(data.default);

      paths.push({
        params: { slug: fileName },
        props: { cvData: transformedData },
      });
    } catch (error) {
      console.error(`Invalid data in ${path}:`, error);
    }
  }

  return paths;
}
