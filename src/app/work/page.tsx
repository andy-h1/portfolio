import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type WorkExperienceWithSlug, getAllWorkExperiences } from '@/lib/work'
import { formatDate } from '@/lib/formatDate'

function WorkExperienceItem({ workExperience }: { workExperience: WorkExperienceWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/work/${workExperience.slug}`}>
          {workExperience.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={workExperience.date}
          className="md:hidden"
          decorate
        >
          {workExperience.date}
        </Card.Eyebrow>
        <Card.Description>{workExperience.description}</Card.Description>
        <Card.Cta>Read experience</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={workExperience.date}
        className="mt-1 max-md:hidden"
      >
        {workExperience.date}
      </Card.Eyebrow>
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
