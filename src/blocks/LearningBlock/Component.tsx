import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Props = {
  title?: string
  limit?: number
}

export const LearningBlock: React.FC<Props> = async ({ title, limit }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: learnings } = await payload.find({
    collection: 'learnings',
    limit: limit || 100,
  })

  if (!learnings || learnings.length === 0) {
    return null
  }

  return (
    <div className="container">
      {title && <h2 className="text-3xl font-bold mb-8 md:mb-12">{title}</h2>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learnings.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded border border-border p-4 flex flex-col h-full"
          >
            <div className="mb-3">
              <h3 className="text-lg font-bold leading-snug mb-1">{item.title}</h3>
              <div className="text-sm font-semibold text-muted-foreground">{item.source}</div>
            </div>

            <div className="space-y-2 mt-auto text-sm text-muted-foreground">
              {item.instructor && (
                <div className="flex items-center gap-2">
                  <span className="font-medium uppercase text-xs tracking-wide">Instructor:</span>
                  <span>{item.instructor}</span>
                </div>
              )}
              {item.duration && (
                <div className="flex items-center gap-2">
                  <span className="font-medium uppercase text-xs tracking-wide">Duration:</span>
                  <span>{item.duration}</span>
                </div>
              )}
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 group"
              >
                View Certificate/Course
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  →
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
