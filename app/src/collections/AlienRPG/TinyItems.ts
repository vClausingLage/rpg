import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const TinyItems: CollectionConfig = {
  slug: 'tiny-items',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'updatedAt'],
    group: 'Alien RPG',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
