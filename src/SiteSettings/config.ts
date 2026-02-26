import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const colorSchemes = [
  { label: 'Default', value: 'default' },
] as const

export type ColorScheme = (typeof colorSchemes)[number]['value']

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'colorScheme',
      type: 'select',
      defaultValue: 'default',
      options: colorSchemes.map(({ label, value }) => ({ label, value })),
      admin: {
        description: 'Choose the color scheme applied to the public-facing website.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
