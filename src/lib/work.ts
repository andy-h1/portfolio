import glob from 'fast-glob'
import { StaticImageData } from 'next/image'

interface WorkExperience {
  title: string
  description: string
  author: string
  date: string
  technologies: string
  tldr: string
  logo?: StaticImageData
  logoSmall?: StaticImageData
}

export interface WorkExperienceWithSlug extends WorkExperience {
  slug: string
}

async function importWorkExperience(
  workFilename: string,
): Promise<WorkExperienceWithSlug> {
  let { workExperience } = (await import(`../app/work/${workFilename}`)) as {
    default: React.ComponentType
    workExperience: WorkExperience
  }

  return {
    slug: workFilename.replace(/(\/page)?\.mdx$/, ''),
    ...workExperience,
  }
}

export async function getAllWorkExperiences() {
  let workFilenames = await glob('*/page.mdx', {
    cwd: './src/app/work',
  })

  let workExperiences = await Promise.all(workFilenames.map(importWorkExperience))

  return workExperiences.sort((a, z) => {
    // Extract start date from range format (e.g., "2024-02 to 2024-09" -> "2024-02")
    const aDate = a.date.split(' to ')[0]
    const zDate = z.date.split(' to ')[0]
    return +new Date(zDate) - +new Date(aDate)
  })
}
