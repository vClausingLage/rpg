import { setActiveStory } from '@/app/(frontend)/narrator/stories/actions'

type Props = {
  stories: { id: number | string; title: string; status?: string | null }[]
  activeId?: number | string
  /** Path to return to after switching. */
  next: string
}

const statusLabel: Record<string, string> = { planned: 'geplant', running: 'läuft', finished: 'beendet' }

export function StorySwitcher({ stories, activeId, next }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#8bb8aa]">Story</span>
      {stories.map((story) => {
        const active = String(story.id) === String(activeId)
        return (
          <form action={setActiveStory} key={story.id}>
            <input name="storyId" type="hidden" value={String(story.id)} />
            <input name="next" type="hidden" value={next} />
            <button
              aria-pressed={active}
              className={`rounded border px-3 py-1 text-sm ${
                active
                  ? 'border-[#d7f46b] bg-[#d7f46b] font-medium text-[#08100e]'
                  : 'border-[#315a51] text-[#d8eee8] hover:border-[#d7f46b]'
              }`}
              type="submit"
            >
              {story.title}
              {story.status ? <span className="ml-2 text-xs opacity-70">{statusLabel[story.status] ?? story.status}</span> : null}
            </button>
          </form>
        )
      })}
      <a className="text-sm text-[#d7f46b] underline-offset-4 hover:underline" href="/narrator/stories">
        Stories verwalten
      </a>
    </div>
  )
}
