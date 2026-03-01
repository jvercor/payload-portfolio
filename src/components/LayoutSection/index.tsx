import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  /** Extra classes applied to the outer section element. */
  className?: string
  /** Extra classes applied to the inner layout-content wrapper. */
  contentClassName?: string
  /** HTML element to render as the section. Defaults to 'section'. */
  as?: React.ElementType
  /**
   * When true, children are rendered directly inside layout-section
   * without a layout-content wrapper. Use for full-bleed sections that
   * manage their own inner layout (e.g. hero with background image).
   */
  noContentWrapper?: boolean
  children?: React.ReactNode
}

/**
 * LayoutSection — the single structural unit for every page section.
 *
 * Renders:
 *   <Tag class="layout-section [className]">
 *     <div class="layout-content [contentClassName]">
 *       {children}
 *     </div>
 *   </Tag>
 *
 * Add "layout-content-compact" or "layout-content-spacious" to
 * contentClassName to override vertical padding.
 */
export const LayoutSection: React.FC<Props> = ({
  as: Tag = 'section',
  className,
  contentClassName,
  noContentWrapper = false,
  children,
}) => {
  return (
    <Tag className={cn('layout-section', className)}>
      {noContentWrapper ? (
        children
      ) : (
        <div className={cn('layout-content', contentClassName)}>{children}</div>
      )}
    </Tag>
  )
}
