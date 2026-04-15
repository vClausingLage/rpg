import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { coreAvatarFields } from './shared'

export const Avatars: CollectionConfig = {
  slug: 'avatars',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'player', 'class', 'stress_level', 'health', 'updatedAt'],
    group: 'Alien RPG',
    useAsTitle: 'name',
  },
  fields: coreAvatarFields({ includePlayer: true }),
}
