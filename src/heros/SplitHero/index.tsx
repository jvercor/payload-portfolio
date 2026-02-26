'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type SplitHeroProps = Page['hero'] & {
  subtitle?: string | null
}

export const SplitHero: React.FC<SplitHeroProps> = ({ links, media, richText, subtitle }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  })

  return (
    <div className="container py-16 md:py-24">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Left: content */}
        <div className="flex-1 flex flex-col gap-6">
          {richText && (
            <RichText
              className="[&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:font-bold [&_h1]:leading-tight"
              data={richText}
              enableGutter={false}
            />
          )}
          {subtitle && <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4 mt-2">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Right: image */}
        {media && typeof media === 'object' && (
          <div className="flex-1 w-full">
            <Media
              className="w-full rounded-lg overflow-hidden"
              imgClassName="w-full h-auto object-cover"
              priority
              resource={media}
            />
          </div>
        )}
      </div>
    </div>
  )
}
