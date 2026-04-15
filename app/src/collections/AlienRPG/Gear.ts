import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Gear: CollectionConfig = {
  slug: 'gear',
  labels: {
    singular: 'Gear',
    plural: 'Gear',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'power', 'weight', 'updatedAt'],
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
      name: 'power',
      type: 'text',
    },
    {
      name: 'weight',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
