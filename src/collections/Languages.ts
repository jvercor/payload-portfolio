import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Languages: CollectionConfig = {
  slug: 'languages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'level'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      label: 'Proficiency Level',
      options: [
        { label: 'Native', value: 'native' },
        { label: 'Fluent', value: 'fluent' },
        { label: 'Business', value: 'business' },
        { label: 'Conversational', value: 'conversational' },
        { label: 'Basic', value: 'basic' },
      ],
      required: true,
    },
    {
      name: 'context',
      type: 'text',
    },
  ],
}
