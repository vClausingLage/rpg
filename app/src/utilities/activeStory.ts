import { cookies } from 'next/headers'
import type { Payload, PayloadRequest } from 'payload'

import type { Story } from '@/payload-types'

export const ACTIVE_STORY_COOKIE = 'rpg-active-story'

/**
 * Resolves the story the narrator is currently running.
 * Order: cookie -> first "running" story -> first story. Returns all stories for the switcher.
 */
export async function getActiveStory(payload: Payload, req: PayloadRequest) {
  const { docs: stories } = await payload.find({
    collection: 'stories',
    depth: 0,
    limit: 100,
    pagination: false,
    req,
    sort: 'createdAt',
  })

  const cookieValue = (await cookies()).get(ACTIVE_STORY_COOKIE)?.value
  const active: Story | undefined =
    stories.find((s) => String(s.id) === cookieValue) ??
    stories.find((s) => s.status === 'running') ??
    stories[0]

  return { stories, active }
}
