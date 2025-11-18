import glob from 'fast-glob'

interface WorkExperience {
  title: string
  description: string
  author: string
  date: string
  technologies: string
  tldr: string
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

  return workExperiences.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
