import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'

type Props = {
  title?: string
  limit?: number
}

export const EducationBlock: React.FC<Props> = async ({ title, limit }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: educations } = await payload.find({
    collection: 'educations',
    limit: limit || 100,
    sort: '-start_date',
  })

  if (!educations || educations.length === 0) {
    return null
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="container">
      {title && <h2 className="text-3xl font-bold mb-8 md:mb-12">{title}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educations.map((edu) => {
          const startDate = formatDate(edu.start_date)
          const endDate = edu.end_date ? formatDate(edu.end_date) : 'Present'
          const isCompleted = edu.status === 'completed'

          return (
            <div
              key={edu.id}
              className="bg-card rounded border border-border p-4 flex flex-col h-full"
            >
              <div className="mb-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold leading-tight">{edu.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}
                  >
                    {edu.type}
                  </span>
                </div>
                <div className="text-lg text-primary font-medium mt-1">{edu.institution}</div>
              </div>

              <div className="flex items-center text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit mb-4">
                <span>
                  {startDate} — {endDate}
                </span>
                {edu.location && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{edu.location}</span>
                  </>
                )}
              </div>

              {edu.description && (
                <div className="mt-auto text-muted-foreground prose dark:prose-invert prose-sm max-w-none">
                  <RichText data={edu.description} enableGutter={false} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
