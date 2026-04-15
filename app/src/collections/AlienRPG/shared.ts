import type { Field } from 'payload'

export const panicResponseOptions = [
  { label: 'Jumpy', value: 'jumpy' },
  { label: 'Tunnel Vision', value: 'tunnel_vision' },
  { label: 'Aggravated', value: 'aggravated' },
  { label: 'Shakes', value: 'shakes' },
  { label: 'Frantic', value: 'frantic' },
  { label: 'Deflated', value: 'deflated' },
  { label: 'Paranoid', value: 'paranoid' },
  { label: 'Hesitant', value: 'hesitant' },
  { label: 'Freeze', value: 'freeze' },
  { label: 'Seek Cover', value: 'seek_cover' },
  { label: 'Scream', value: 'scream' },
  { label: 'Flee', value: 'flee' },
  { label: 'Frenzy', value: 'frenzy' },
  { label: 'Catatonic', value: 'catatonic' },
]

export const coreAvatarFields = ({ includePlayer }: { includePlayer: boolean }): Field[] => [
  ...(includePlayer
    ? ([
        {
          name: 'player',
          type: 'relationship',
          relationTo: 'players',
          hasMany: false,
          admin: {
            position: 'sidebar',
          },
        },
      ] satisfies Field[])
    : []),
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'class',
    type: 'text',
  },
  {
    name: 'picture',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'age',
    type: 'text',
    maxLength: 50,
  },
  {
    type: 'row',
    fields: [
      {
        name: 'career',
        type: 'text',
        maxLength: 100,
      },
      {
        name: 'isMechanic',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },
  {
    name: 'personality',
    type: 'textarea',
  },
  {
    name: 'story_background',
    type: 'textarea',
  },
  {
    name: 'talents',
    type: 'textarea',
  },
  {
    type: 'row',
    fields: [
      {
        name: 'buddy',
        type: 'relationship',
        relationTo: 'avatars',
        hasMany: false,
      },
      {
        name: 'rival',
        type: 'relationship',
        relationTo: 'avatars',
        hasMany: false,
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'exp',
        type: 'number',
        defaultValue: 0,
        min: 0,
      },
      {
        name: 'story_points',
        type: 'number',
        defaultValue: 0,
        min: 0,
      },
      {
        name: 'stress_level',
        type: 'number',
        defaultValue: 0,
        min: 0,
      },
    ],
  },
  {
    name: 'stress_and_panic_responses',
    type: 'relationship',
    relationTo: 'stress-and-panic-responses',
    hasMany: false,
  },
  {
    type: 'row',
    fields: [
      {
        name: 'health',
        type: 'number',
        defaultValue: 0,
      },
      {
        name: 'resolve',
        type: 'number',
        defaultValue: 0,
      },
      {
        name: 'encumbrance',
        type: 'number',
        defaultValue: 0,
      },
      {
        name: 'cash',
        type: 'number',
        defaultValue: 0,
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'isFatigued',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'isRadiated',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  },
  {
    name: 'critical_injuries_and_trauma',
    type: 'text',
  },
  {
    name: 'signature_item',
    type: 'text',
  },
  {
    type: 'collapsible',
    label: 'Loadout',
    fields: [
      {
        name: 'tiny_items',
        type: 'relationship',
        relationTo: 'tiny-items',
        hasMany: true,
      },
      {
        name: 'armor',
        type: 'relationship',
        relationTo: 'armor',
        hasMany: false,
      },
      {
        name: 'gear',
        type: 'relationship',
        relationTo: 'gear',
        hasMany: true,
      },
      {
        name: 'weapons',
        type: 'relationship',
        relationTo: 'weapons',
        hasMany: true,
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Attributes and Skills',
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'strength', type: 'number', defaultValue: 0 },
          { name: 'close_combat', type: 'number', defaultValue: 0 },
          { name: 'heavy_machinery', type: 'number', defaultValue: 0 },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'agility', type: 'number', defaultValue: 0 },
          { name: 'mobility', type: 'number', defaultValue: 0 },
          { name: 'piloting', type: 'number', defaultValue: 0 },
          { name: 'ranged_combat', type: 'number', defaultValue: 0 },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'wits', type: 'number', defaultValue: 0 },
          { name: 'comtech', type: 'number', defaultValue: 0 },
          { name: 'observation', type: 'number', defaultValue: 0 },
          { name: 'survival', type: 'number', defaultValue: 0 },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'empathy', type: 'number', defaultValue: 0 },
          { name: 'command', type: 'number', defaultValue: 0 },
          { name: 'manipulation', type: 'number', defaultValue: 0 },
          { name: 'medical_aid', type: 'number', defaultValue: 0 },
        ],
      },
    ],
  },
]
