import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import type { Skill } from '@/payload-types'

type Props = {
  title?: string
  limit?: number
}

export const ExperienceBlock: React.FC<Props> = async ({ title, limit }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: experiences } = await payload.find({
    collection: 'experiences',
    limit: limit || 100,
    depth: 2,
    sort: '-start_date',
  })

  if (!experiences || experiences.length === 0) {
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
        {experiences.map((exp) => {
          const startDate = formatDate(exp.start_date)
          const endDate = exp.is_current ? 'Present' : formatDate(exp.end_date)

          // Handle skills relationship safely
          const skills = (exp.technologies as (Skill | string)[])
            ?.map((tech) => {
              if (typeof tech === 'object' && tech !== null) return tech
              return null
            })
            .filter(Boolean) as Skill[]

          return (
            <div key={exp.id} className="bg-card rounded border border-border p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold">{exp.role_title}</h3>
                  <div className="text-lg text-primary font-medium">{exp.company_name}</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded whitespace-nowrap self-start">
                  {startDate} — {endDate}
                </div>
              </div>

              <div className="mb-6">
                {/* Context / Summary */}
                {exp.context && <p className="mb-4 text-muted-foreground">{exp.context}</p>}

                {/* RichText Responsibilities */}
                <RichText
                  data={exp.responsibilities}
                  enableGutter={false}
                  className="max-w-none prose-sm"
                />
              </div>

              {/* Skills - Per Experience */}
              {skills && skills.length > 0 && (
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Technologies used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center px-2.5 py-1 rounded text-sm font-medium bg-secondary text-secondary-foreground"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
