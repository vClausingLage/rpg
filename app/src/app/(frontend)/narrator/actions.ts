'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload, type CollectionSlug } from 'payload'

const scalarFields = new Set([
  'name',
  'class',
  'age',
  'personality',
  'isMechanic',
  'story_background',
  'career',
  'talents',
  'exp',
  'story_points',
  'stress_level',
  'stress_and_panic_responses',
  'health',
  'isFatigued',
  'resolve',
  'isRadiated',
  'critical_injuries_and_trauma',
  'encumbrance',
  'cash',
  'signature_item',
  'strength',
  'close_combat',
  'heavy_machinery',
  'agility',
  'mobility',
  'piloting',
  'ranged_combat',
  'wits',
  'comtech',
  'observation',
  'survival',
  'empathy',
  'command',
  'manipulation',
  'medical_aid',
])

const numberFields = new Set([
  'exp',
  'story_points',
  'stress_level',
  'health',
  'resolve',
  'encumbrance',
  'cash',
  'strength',
  'close_combat',
  'heavy_machinery',
  'agility',
  'mobility',
  'piloting',
  'ranged_combat',
  'wits',
  'comtech',
  'observation',
  'survival',
  'empathy',
  'command',
  'manipulation',
  'medical_aid',
])

const booleanFields = new Set(['isMechanic', 'isFatigued', 'isRadiated'])
const hasManyFields = new Set(['tiny_items', 'gear', 'weapons'])
const attachableCollections = new Set(['tiny-items', 'armor', 'gear', 'weapons'])

async function getAuthedLocalAPI() {
  const payload = await getPayload({ config: configPromise })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    redirect('/admin')
  }

  const req = await createLocalReq({ user }, payload)

  return { payload, req }
}

function idOf(value: unknown) {
  if (!value) return undefined
  if (typeof value === 'object' && 'id' in value) return String(value.id)
  return String(value)
}

function idsOf(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.map(idOf).filter(Boolean) as string[]
}

function formString(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === 'string' ? value : ''
}

export async function createPlayer(formData: FormData) {
  const name = formString(formData, 'name').trim()
  if (!name) return

  const { payload, req } = await getAuthedLocalAPI()
  await payload.create({
    collection: 'players',
    data: { name },
    req,
  })

  revalidatePath('/narrator')
}

export async function updateAvatarField(formData: FormData) {
  const avatarId = formString(formData, 'avatarId')
  const field = formString(formData, 'field')
  const rawValue = formString(formData, 'value')

  if (!avatarId || !scalarFields.has(field)) return

  let value: string | number | boolean | null = rawValue
  if (numberFields.has(field)) value = Number(rawValue || 0)
  if (booleanFields.has(field)) value = rawValue === 'true'
  if (field === 'stress_and_panic_responses' && !rawValue) value = null

  const { payload, req } = await getAuthedLocalAPI()
  await payload.update({
    collection: 'avatars',
    id: avatarId,
    data: { [field]: value },
    req,
  })

  revalidatePath('/narrator')
}

export async function attachNewItem(formData: FormData) {
  const avatarId = formString(formData, 'avatarId')
  const field = formString(formData, 'field')
  const collection = formString(formData, 'collection') as CollectionSlug
  const name = formString(formData, 'name').trim()

  if (!avatarId || !name || !attachableCollections.has(collection)) return
  if (field !== 'armor' && !hasManyFields.has(field)) return

  const { payload, req } = await getAuthedLocalAPI()
  const avatar = await payload.findByID({ collection: 'avatars', id: avatarId, depth: 0, req })

  const data: Record<string, string | number> = { name }
  for (const key of ['level', 'weight', 'modifier', 'damage', 'ammo']) {
    const value = formString(formData, key)
    if (value) data[key] = Number(value)
  }
  for (const key of ['power', 'range']) {
    const value = formString(formData, key).trim()
    if (value) data[key] = value
  }

  const created = await payload.create({ collection, data, req })

  if (field === 'armor') {
    await payload.update({
      collection: 'avatars',
      id: avatarId,
      data: { armor: created.id },
      req,
    })
  } else {
    const nextIds = [...idsOf(avatar[field as keyof typeof avatar]), String(created.id)]
    await payload.update({
      collection: 'avatars',
      id: avatarId,
      data: { [field]: nextIds },
      req,
    })
  }

  revalidatePath('/narrator')
}

export async function detachItem(formData: FormData) {
  const avatarId = formString(formData, 'avatarId')
  const field = formString(formData, 'field')
  const itemId = formString(formData, 'itemId')

  if (!avatarId || !field) return

  const { payload, req } = await getAuthedLocalAPI()
  const avatar = await payload.findByID({ collection: 'avatars', id: avatarId, depth: 0, req })

  if (field === 'armor') {
    await payload.update({ collection: 'avatars', id: avatarId, data: { armor: null }, req })
  } else if (hasManyFields.has(field)) {
    const nextIds = idsOf(avatar[field as keyof typeof avatar]).filter((id) => id !== itemId)
    await payload.update({ collection: 'avatars', id: avatarId, data: { [field]: nextIds }, req })
  }

  revalidatePath('/narrator')
}

export async function createAvatarFromPreset(formData: FormData) {
  const playerId = formString(formData, 'playerId')
  const presetId = formString(formData, 'presetId')

  if (!playerId || !presetId) return

  const { payload, req } = await getAuthedLocalAPI()
  const preset = await payload.findByID({
    collection: 'avatar-presets',
    id: presetId,
    depth: 0,
    req,
  })

  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    sizes: _sizes,
    filename: _filename,
    preset_notes: _presetNotes,
    ...copy
  } = preset as unknown as Record<string, unknown>

  const avatar = await payload.create({
    collection: 'avatars',
    data: {
      ...copy,
      player: Number(playerId),
    } as any,
    req,
  })

  await payload.update({
    collection: 'players',
    id: playerId,
    data: { avatar: avatar.id },
    req,
  })

  revalidatePath('/narrator')
}
