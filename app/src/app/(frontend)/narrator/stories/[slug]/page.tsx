import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { ShipMap } from '@/components/AlienRPG/ShipMap'
import RichText from '@/components/RichText'
import { getStoryMaps } from '@/data/stories'

export const dynamic = 'force-dynamic'

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) redirect('/admin')
  const req = await createLocalReq({ user }, payload)

  const result = await payload.find({
    collection: 'stories',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: { slug: { equals: slug } },
  })
  const story = result.docs[0]
  if (!story) notFound()

  const maps = getStoryMaps(story.slug)
  const revealed = Array.isArray(story.revealedRooms) ? (story.revealedRooms as string[]) : []

  return (
    <main className="min-h-screen bg-[#020504] text-[#d8eee8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav className="flex flex-wrap gap-4 text-sm text-[#d7f46b]">
          <a className="underline-offset-4 hover:underline" href="/narrator/stories">← Stories</a>
          <a className="underline-offset-4 hover:underline" href="/narrator">Dashboard</a>
          <a className="underline-offset-4 hover:underline" href="/narrator/overview">Overview</a>
          {story.script ? <a className="underline-offset-4 hover:underline" href="#script">Skript</a> : null}
          {maps ? <a className="underline-offset-4 hover:underline" href="#maps">Schiffspläne</a> : null}
        </nav>

        <h1 className="mt-4 text-3xl font-semibold text-[#f1f4de]">{story.title}</h1>
        {story.summary ? <p className="mt-2 max-w-3xl text-[#8bb8aa]">{story.summary}</p> : null}

        {story.script ? (
          <section className="mt-8 rounded border border-[#24433d] bg-[#07110f] p-6" id="script">
            <RichText className="prose-invert" data={story.script as any} enableGutter={false} />
          </section>
        ) : null}

        {maps ? (
          <section className="mt-10 space-y-8" id="maps">
            <h2 className="text-2xl text-[#f1f4de]">Schiffspläne</h2>
            {maps.ships.map((ship) => (
              <ShipMap initialRevealed={revealed} key={ship.id} ship={ship} storyId={story.id} />
            ))}
          </section>
        ) : null}
      </div>
    </main>
  )
}
