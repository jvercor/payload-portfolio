import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Educations: CollectionConfig = {
  slug: 'educations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'institution', 'status'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Degree', value: 'degree' },
        { label: 'Certification', value: 'certification' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'start_date',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'end_date',
      label: 'End Date',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in_progress' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
