import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Players: CollectionConfig = {
  slug: 'players',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'avatar', 'updatedAt'],
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
      name: 'avatar',
      type: 'relationship',
      relationTo: 'avatars',
      hasMany: false,
    },
    {
      name: 'story',
      type: 'relationship',
      relationTo: 'stories',
      hasMany: false,
      admin: { position: 'sidebar', description: 'Story this player takes part in.' },
    },
  ],
}
