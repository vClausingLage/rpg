import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { NarratorDashboard } from '@/components/AlienRPG/NarratorDashboard'
import { StorySwitcher } from '@/components/AlienRPG/StorySwitcher'
import { getActiveStory } from '@/utilities/activeStory'

export const dynamic = 'force-dynamic'

export default async function NarratorPage() {
  const payload = await getPayload({ config: configPromise })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    redirect('/admin')
  }

  const req = await createLocalReq({ user }, payload)

  const { stories, active } = await getActiveStory(payload, req)

  const [players, presets, responses, tinyItems, armor, gear, weapons] = await Promise.all([
    payload.find({
      collection: 'players',
      depth: 3,
      where: active ? { story: { equals: active.id } } : undefined,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'avatar-presets',
      depth: 1,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'stress-and-panic-responses',
      depth: 0,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'tiny-items',
      depth: 0,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'armor',
      depth: 0,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'gear',
      depth: 0,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
    payload.find({
      collection: 'weapons',
      depth: 0,
      limit: 100,
      pagination: false,
      req,
      sort: 'name',
    }),
  ])

  return (
    <>
    <div className="border-b border-[#24433d] bg-[#050c0a] px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <StorySwitcher activeId={active?.id} next="/narrator" stories={stories} />
      </div>
    </div>
    <NarratorDashboard
      storyId={active?.id}
      loadoutOptions={{
        armor: armor.docs,
        gear: gear.docs,
        tiny_items: tinyItems.docs,
        weapons: weapons.docs,
      }}
      players={players.docs}
      presets={presets.docs}
      responses={responses.docs}
    />
    </>
  )
}
