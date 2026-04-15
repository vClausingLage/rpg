import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Weapons: CollectionConfig = {
  slug: 'weapons',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'modifier', 'damage', 'range', 'ammo', 'weight', 'updatedAt'],
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
      name: 'modifier',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'damage',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'range',
      type: 'text',
    },
    {
      name: 'ammo',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'weight',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
