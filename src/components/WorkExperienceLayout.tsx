'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type WorkExperienceWithSlug } from '@/lib/work'
import { formatDateRange } from '@/lib/formatDateRange'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WorkExperienceLayout({
  workExperience,
  children,
}: {
  workExperience: WorkExperienceWithSlug
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-7xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to work experience"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-16 lg:mb-0 xl:-top-12 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:order-first lg:row-span-1">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  {workExperience.title}
                </h1>
                <time
                  dateTime={workExperience.date}
                  className="mt-4 flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDateRange(workExperience.date)}</span>
                </time>
                <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                  <p>
                    <strong>Technologies used:</strong> {workExperience.technologies}
                  </p>
                  <p>
                    <strong>TLDR:</strong> {workExperience.tldr}
                  </p>
                </div>
              </div>
              {workExperience.logo && (
                <div className="lg:pl-20">
                  <div className="max-w-xs px-2.5 lg:max-w-none">
                    <Image
                      src={workExperience.logo}
                      alt={`${workExperience.title} logo`}
                      sizes="(min-width: 1024px) 32rem, 20rem"
                      className={`aspect-square rotate-3 rounded-2xl border-2 border-zinc-800 bg-white dark:bg-zinc-800 ${workExperience.title === 'Lix' || workExperience.title === 'Seldon' ? 'object-contain p-8' : 'object-cover'}`}
                      priority
                    />
                  </div>
                </div>
              )}
              <div className="lg:col-span-2">
                <Prose className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400" data-mdx-content>
                  {children}
                </Prose>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}