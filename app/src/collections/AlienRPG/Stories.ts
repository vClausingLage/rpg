import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { authenticated } from '@/access/authenticated'

export const Stories: CollectionConfig = {
  slug: 'stories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Alien RPG',
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'planned',
      options: [
        { label: 'Planned', value: 'planned' },
        { label: 'Running', value: 'running' },
        { label: 'Finished', value: 'finished' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'summary', type: 'textarea' },
    {
      name: 'script',
      type: 'richText',
      editor: lexicalEditor({ features: ({ defaultFeatures }) => defaultFeatures }),
      admin: { description: 'Narrator script: premise, acts, NPCs, secrets.' },
    },
    {
      name: 'overviewPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: { description: 'Optional block-based page shown as this story\'s overview.' },
    },
    {
      name: 'revealedRooms',
      type: 'json',
      defaultValue: [],
      admin: {
        description: 'IDs of rooms the narrator has revealed to the players ("shipId:roomId").',
      },
    },
    slugField({ useAsSlug: 'title', required: false }),
  ],
}
