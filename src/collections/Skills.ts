import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'proficiency_level', 'context_of_use'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'proficiency_level',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'Expert', value: 'expert' },
      ],
      required: true,
    },
    {
      name: 'context_of_use',
      type: 'select',
      options: [
        { label: 'Production', value: 'production' },
        { label: 'Labs/Personal', value: 'labs' },
        { label: 'Study', value: 'study' },
      ],
      required: true,
    },
  ],
}
