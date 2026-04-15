import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Armor: CollectionConfig = {
  slug: 'armor',
  labels: {
    singular: 'Armor',
    plural: 'Armor',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'level', 'weight', 'updatedAt'],
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
      name: 'level',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
