'use client'

import { Clock, RotateCcw, TimerReset } from 'lucide-react'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'alien-rpg-game-minutes'
const DAY_MINUTES = 24 * 60

function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function GameClock() {
  const [minutes, setMinutes] = useState(0)
  const [lastStretch, setLastStretch] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(STORAGE_KEY))
      if (Number.isFinite(stored) && stored > 0) setMinutes(Math.floor(stored))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(STORAGE_KEY, String(minutes))
    } catch {}
  }, [minutes, loaded])

  function addStretch() {
    const added = 5 + Math.floor(Math.random() * 6) // 5-10 minutes
    setLastStretch(added)
    setMinutes((current) => current + added)
  }

  function reset() {
    if (!window.confirm('Reset the in-game clock to 00:00?')) return
    setMinutes(0)
    setLastStretch(null)
  }

  const dayProgress = ((minutes % DAY_MINUTES) / DAY_MINUTES) * 100
  const days = Math.floor(minutes / DAY_MINUTES)

  return (
    <section className="mt-6 rounded border border-[#24433d] bg-[#07110f] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded border border-[#315a51] bg-[#020504] text-[#d7f46b]">
            <Clock aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d7f46b]">
              Mission time
            </p>
            <p className="text-sm text-[#8bb8aa]">
              {lastStretch ? `Last stretch: +${lastStretch} min` : 'Elapsed in-game time (hh:mm)'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            aria-label={`Elapsed in-game time ${formatTime(minutes)}`}
            className="font-mono text-3xl font-semibold tabular-nums text-[#f1f4de]"
          >
            {formatTime(minutes)}
          </span>
          <button
            className="flex min-h-10 items-center gap-2 rounded border border-[#d7f46b] bg-[#d7f46b] px-3 text-sm font-semibold text-[#07110f] hover:bg-[#e4fb86]"
            onClick={addStretch}
            type="button"
          >
            <TimerReset aria-hidden="true" size={16} />
            +1 Stretch
          </button>
          <button
            aria-label="Reset clock"
            className="flex min-h-10 items-center rounded border border-[#315a51] px-3 text-[#8bb8aa] hover:border-[#d7f46b] hover:text-[#d8eee8]"
            onClick={reset}
            title="Reset clock"
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div
          aria-valuemax={DAY_MINUTES}
          aria-valuemin={0}
          aria-valuenow={minutes % DAY_MINUTES}
          aria-label="Progress through the current in-game day"
          className="h-3 overflow-hidden rounded border border-[#24433d] bg-[#020504]"
          role="progressbar"
        >
          <div
            className="h-full bg-[#d7f46b] transition-[width] duration-500"
            style={{ width: `${dayProgress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-xs text-[#8bb8aa]">
          <span>00:00</span>
          <span>{days > 0 ? `Day ${days + 1}` : 'Day 1'}</span>
          <span>24:00</span>
        </div>
      </div>
    </section>
  )
}
