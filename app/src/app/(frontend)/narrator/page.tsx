import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { NarratorDashboard } from '@/components/AlienRPG/NarratorDashboard'

export const dynamic = 'force-dynamic'

export default async function NarratorPage() {
  const payload = await getPayload({ config: configPromise })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    redirect('/admin')
  }

  const req = await createLocalReq({ user }, payload)

  const [players, presets, responses] = await Promise.all([
    payload.find({
      collection: 'players',
      depth: 3,
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
  ])

  return (
    <NarratorDashboard
      players={players.docs}
      presets={presets.docs}
      responses={responses.docs}
    />
  )
}
