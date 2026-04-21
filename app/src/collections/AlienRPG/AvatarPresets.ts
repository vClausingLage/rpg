import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { coreAvatarFields } from './shared'

export const AvatarPresets: CollectionConfig = {
  slug: 'avatar-presets',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'class', 'career', 'updatedAt'],
    group: 'Alien RPG',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'preset_notes',
      label: 'Preset notes',
      type: 'textarea',
      admin: {
        description: 'GM-only notes about when to use this preset.',
      },
    },
    ...coreAvatarFields({ includePlayer: false }),
  ],
}
