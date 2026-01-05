import type { Block } from 'payload'

export const LearningBlock: Block = {
  slug: 'learning',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: false,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      min: 1,
      max: 100,
      defaultValue: 10,
    },
  ],
  labels: {
    plural: 'Learnings',
    singular: 'Learning',
  },
}
