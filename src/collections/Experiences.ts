import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['role_title', 'company_name', 'start_date'],
    useAsTitle: 'role_title',
  },
  fields: [
    {
      name: 'role_title',
      label: 'Role Title',
      type: 'text',
      required: true,
    },
    {
      name: 'company_name',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'start_date',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'is_current',
      type: 'checkbox',
      label: 'Current Role',
      defaultValue: false,
    },
    {
      name: 'end_date',
      label: 'End Date',
      type: 'date',
      admin: {
        condition: (_, siblingData) => !siblingData.is_current,
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'context',
      type: 'textarea',
      required: true,
    },
    {
      name: 'responsibilities',
      type: 'richText',
      required: true,
    },
    {
      name: 'technologies',
      type: 'relationship',
      hasMany: true,
      relationTo: 'skills',
    },
  ],
}
