import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Learnings: CollectionConfig = {
  slug: 'learnings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'source'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
    },
    {
      name: 'instructor',
      type: 'text',
    },
    {
      name: 'duration',
      type: 'text',
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
}
