import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { panicResponseOptions } from './shared'

export const StressAndPanicResponses: CollectionConfig = {
  slug: 'stress-and-panic-responses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'response', 'updatedAt'],
    group: 'Alien RPG',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'response',
      type: 'select',
      options: panicResponseOptions,
      required: true,
    },
    {
      name: 'effect',
      type: 'textarea',
    },
  ],
}
