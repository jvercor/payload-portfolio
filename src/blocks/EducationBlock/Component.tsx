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

      <div className="flex flex-col gap-8">
        {educations.map((edu) => {
          const startDate = formatDate(edu.start_date)
          const endDate = edu.end_date ? formatDate(edu.end_date) : 'Present'

          return (
            <div key={edu.id} className="bg-card rounded border border-border p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold">{edu.title}</h3>
                  <h4 className="text-lg italic">{edu.institution}</h4>
                </div>
                <div className="whitespace-nowrap self-start">
                  <div className="text-sm font-medium text-primary-foreground bg-primary px-3 py-1 rounded mb-2">
                    {startDate} — {endDate}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                </div>
              </div>

              <div className="inline-flex text-xs font-semibold px-2 py-1 rounded-full border border-border uppercase tracking-wider whitespace-nowrap bg-tertiary text-muted-foreground">
                {edu.type}
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
