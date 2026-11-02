import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { GameClock } from '@/components/AlienRPG/GameClock'
import { StorySwitcher } from '@/components/AlienRPG/StorySwitcher'
import { getActiveStory } from '@/utilities/activeStory'
import { MotionTrackerSoundboard } from '@/components/AlienRPG/MotionTrackerSoundboard'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export default async function NarratorOverviewPage() {
  const payload = await getPayload({ config: configPromise })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    redirect('/admin')
  }

  const req = await createLocalReq({ user }, payload)

  const { stories, active } = await getActiveStory(payload, req)
  const overviewRef = active?.overviewPage
  const overviewId = typeof overviewRef === 'object' && overviewRef ? overviewRef.id : (overviewRef ?? undefined)

  const result = overviewId
    ? { docs: [await payload.findByID({ collection: 'pages', id: overviewId, depth: 2, req })] }
    : active?.script
      ? { docs: [] as any[] }
      : await payload.find({
        collection: 'pages',
        depth: 2,
        limit: 1,
        pagination: false,
        req,
        where: { slug: { equals: 'narrator-overview' } },
      })

  const page = result.docs[0]

  return (
    <main className="min-h-screen bg-[#020504] text-[#d8eee8]">
      <MotionTrackerSoundboard />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a className="text-sm text-[#d7f46b] underline-offset-4 hover:underline" href="/narrator">
            Back to dashboard
          </a>
          {active ? (
            <a className="text-sm text-[#d7f46b] underline-offset-4 hover:underline" href={`/narrator/stories/${active.slug}`}>
              Skript &amp; Schiffspläne: {active.title}
            </a>
          ) : null}
        </div>
        <div className="mt-4">
          <StorySwitcher activeId={active?.id} next="/narrator/overview" stories={stories} />
        </div>
        <div className="mt-6 border-b border-[#24433d] pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d7f46b]">Storytelling and hints</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#f1f4de]">
            {page?.title || 'Narrator overview'}
          </h1>
        </div>

        <GameClock />

        {page?.layout?.length ? (
          <div className="text-[#d8eee8]">
            <RenderBlocks blocks={page.layout} />
          </div>
        ) : active?.script ? null : (
          <section className="mt-8 rounded border border-[#24433d] bg-[#07110f] p-6">
            <h2 className="text-xl text-[#f1f4de]">Create the overview page in Payload</h2>
            <p className="mt-3 text-[#8bb8aa]">
              Add a Page with slug <span className="font-mono text-[#d7f46b]">narrator-overview</span>,
              then use the existing content blocks for scenes, secret hints, clues, countdowns, and
              reminders.
            </p>
          </section>
        )}

        <section className="mt-8 rounded border border-[#24433d] bg-[#07110f] p-6">
          <h2 className="text-xl text-[#f1f4de]">Sound snippet ideas</h2>
          <div className="mt-4 grid gap-3 text-sm text-[#8bb8aa] sm:grid-cols-2">
            <p>Ship hum loops for calm travel, emergency power, cryo deck, and derelict silence.</p>
            <p>Access doors, pressure seals, elevator starts, airlock cycling, and terminal beeps.</p>
            <p>Radio chatter layers: clean comms, broken transmissions, distress calls, and static bursts.</p>
            <p>Threat cues: vent movement, distant metal impacts, claws on grating, and breath in a suit mic.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
