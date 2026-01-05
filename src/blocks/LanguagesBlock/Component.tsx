import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Props = {
  title?: string
  limit?: number
}

export const LanguagesBlock: React.FC<Props> = async ({ title, limit }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: languages } = await payload.find({
    collection: 'languages',
    limit: limit || 100,
  })

  if (!languages || languages.length === 0) {
    return null
  }

  // Helper to visualize proficiency
  const getProficiencyWidth = (level: string) => {
    switch (level) {
      case 'native':
        return '100%'
      case 'fluent':
        return '90%'
      case 'business':
        return '75%'
      case 'conversational':
        return '50%'
      case 'basic':
        return '25%'
      default:
        return '50%'
    }
  }

  const getProficiencyLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  return (
    <div className="container">
      {title && <h2 className="text-3xl font-bold mb-8 md:mb-12">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((lang) => (
          <div key={lang.id} className="bg-card rounded border border-border p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">{lang.name}</h3>
              <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                {getProficiencyLabel(lang.level)}
              </span>
            </div>

            <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: getProficiencyWidth(lang.level) }}
              />
            </div>

            {lang.context && <p className="text-xs text-muted-foreground italic">{lang.context}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
