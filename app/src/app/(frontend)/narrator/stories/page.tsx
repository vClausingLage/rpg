import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createLocalReq, getPayload } from 'payload'

import { createStory, setActiveStory, updateStoryStatus } from './actions'
import { getActiveStory } from '@/utilities/activeStory'

export const dynamic = 'force-dynamic'

const statuses = [
  { value: 'planned', label: 'geplant' },
  { value: 'running', label: 'läuft' },
  { value: 'finished', label: 'beendet' },
]

export default async function StoriesPage() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) redirect('/admin')
  const req = await createLocalReq({ user }, payload)
  const { stories, active } = await getActiveStory(payload, req)

  return (
    <main className="min-h-screen bg-[#020504] text-[#d8eee8]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <a className="text-sm text-[#d7f46b] underline-offset-4 hover:underline" href="/narrator">
          Zurück zum Dashboard
        </a>
        <h1 className="mt-4 text-3xl font-semibold text-[#f1f4de]">Stories</h1>
        <p className="mt-2 text-[#8bb8aa]">
          Jede Story hat eigene Spieler, ein Skript und Schiffspläne. Die aktive Story bestimmt, welche Spieler im Dashboard erscheinen.
        </p>

        <ul className="mt-6 space-y-3">
          {stories.map((story) => (
            <li className="rounded border border-[#24433d] bg-[#07110f] p-4" key={story.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl text-[#f1f4de]">
                    {story.title}
                    {String(active?.id) === String(story.id) ? (
                      <span className="ml-3 rounded bg-[#d7f46b] px-2 py-0.5 text-xs font-medium text-[#08100e]">aktiv</span>
                    ) : null}
                  </h2>
                  {story.summary ? <p className="mt-1 text-sm text-[#8bb8aa]">{story.summary}</p> : null}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <form action={updateStoryStatus} className="flex gap-2">
                    <input name="storyId" type="hidden" value={String(story.id)} />
                    <select className="rounded border border-[#315a51] bg-[#020504] px-2 py-1" defaultValue={story.status ?? 'planned'} name="status">
                      {statuses.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <button className="rounded border border-[#315a51] px-3 py-1" type="submit">
                      Status setzen
                    </button>
                  </form>
                  <form action={setActiveStory}>
                    <input name="storyId" type="hidden" value={String(story.id)} />
                    <input name="next" type="hidden" value={`/narrator/stories/${story.slug}`} />
                    <button className="rounded bg-[#c7d66d] px-3 py-1 font-medium text-[#08100e]" type="submit">
                      Öffnen
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form action={createStory} className="mt-8 flex gap-2 rounded border border-[#24433d] bg-[#07110f] p-4">
          <input
            className="min-w-0 flex-1 rounded border border-[#315a51] bg-[#020504] px-3 py-2 text-sm"
            name="title"
            placeholder="Neue Story (Titel)"
            required
          />
          <button className="rounded bg-[#c7d66d] px-4 py-2 text-sm font-medium text-[#08100e]" type="submit">
            Anlegen
          </button>
        </form>
      </div>
    </main>
  )
}
