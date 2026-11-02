'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { ACTIVE_STORY_COOKIE } from '@/utilities/activeStory'

async function authed() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) redirect('/admin')
  return { payload, req: await createLocalReq({ user }, payload) }
}

export async function setActiveStory(formData: FormData) {
  const id = String(formData.get('storyId') ?? '')
  if (!id) return
  await authed()
  ;(await cookies()).set(ACTIVE_STORY_COOKIE, id, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  revalidatePath('/narrator', 'layout')
  const next = String(formData.get('next') ?? '')
  if (next.startsWith('/narrator')) redirect(next)
}

export async function createStory(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  if (!title) return
  const { payload, req } = await authed()
  const story = await payload.create({ collection: 'stories', data: { title }, req })
  ;(await cookies()).set(ACTIVE_STORY_COOKIE, String(story.id), { path: '/', maxAge: 60 * 60 * 24 * 365 })
  revalidatePath('/narrator', 'layout')
}

export async function updateStoryStatus(formData: FormData) {
  const id = String(formData.get('storyId') ?? '')
  const status = String(formData.get('status') ?? '')
  if (!id || !['planned', 'running', 'finished'].includes(status)) return
  const { payload, req } = await authed()
  await payload.update({
    collection: 'stories',
    id,
    data: { status: status as 'planned' | 'running' | 'finished' },
    req,
  })
  revalidatePath('/narrator', 'layout')
}

/** Reveal / hide a room for the players. key = "shipId:roomId". */
export async function toggleRoomReveal(storyId: string | number, key: string) {
  const { payload, req } = await authed()
  const story = await payload.findByID({ collection: 'stories', id: storyId, depth: 0, req })
  const current = Array.isArray(story.revealedRooms) ? (story.revealedRooms as string[]) : []
  const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key]
  await payload.update({ collection: 'stories', id: storyId, data: { revealedRooms: next }, req })
  revalidatePath(`/narrator/stories/${story.slug}`)
  return next
}
