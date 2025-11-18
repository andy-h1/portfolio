import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type WorkExperienceWithSlug, getAllWorkExperiences } from '@/lib/work'

function WorkExperienceItem({ workExperience }: { workExperience: WorkExperienceWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-1 md:items-baseline">
      <Card>
        <div className="flex items-start gap-4">
          {workExperience.logoSmall && (
            <div className="relative z-30 h-12 w-12 flex-shrink-0 rounded-md overflow-hidden ring-1 ring-zinc-900/5 dark:ring-white/10 bg-zinc-200 dark:bg-zinc-400 p-2 flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src={workExperience.logoSmall}
                  alt={`${workExperience.title} logo`}
                  className="object-contain"
                  fill
                  sizes="48px"
                  priority
                />
              </div>
            </div>
          )}
          <div className="flex-1">
            <Card.Title href={`/work/${workExperience.slug}`}>
              {workExperience.title}
            </Card.Title>
            <Card.Description>{workExperience.description}</Card.Description>
            <Card.Cta>Read experience</Card.Cta>
          </div>
        </div>
      </Card>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Work Experience',
  description:
    'All of my professional experiences as a software engineer, including projects delivered and technologies used, collected in chronological order.',
}

export default async function WorkIndex() {
  let workExperiences = await getAllWorkExperiences()

  return (
    <SimpleLayout
      title="My professional experiences since being a software engineer."
      intro="All of the long-form of my experiences, working as an engineer, projects delivered and technologies used." 
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {workExperiences.map((workExperience) => (
            <WorkExperienceItem key={workExperience.slug} workExperience={workExperience} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
