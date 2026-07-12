'use client'

import { Pause, Play, Radar, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type TrackerSound = {
  label: string
  detail: string
  src: string
}

const trackerSounds: TrackerSound[] = [
  {
    label: 'Empty',
    detail: 'No contact',
    src: '/audio/mt_empty.mp3',
  },
  {
    label: 'Far',
    detail: 'Distant ping',
    src: '/audio/mt_far.mp3',
  },
  {
    label: 'Nearing',
    detail: 'Closing fast',
    src: '/audio/mt_nearing.mp3',
  },
  {
    label: 'Near',
    detail: 'Contact close',
    src: '/audio/mt_near.mp3',
  },
]

export function MotionTrackerSoundboard() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeSrc, setActiveSrc] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  function stopCurrent() {
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    setIsPlaying(false)
  }

  async function playSound(sound: TrackerSound) {
    if (activeSrc === sound.src && isPlaying) {
      stopCurrent()
      return
    }

    stopCurrent()

    const audio = new Audio(sound.src)
    audio.volume = 0.85
    audioRef.current = audio
    setActiveSrc(sound.src)
    setIsPlaying(true)

    audio.addEventListener('ended', () => setIsPlaying(false), { once: true })

    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <section className="sticky top-0 z-30 border-b border-[#24433d] bg-[#020504]/95 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6 lg:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-[#315a51] bg-[#07110f] text-[#d7f46b]">
              <Radar aria-hidden="true" size={20} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d7f46b]">
                Motion tracker
              </p>
              <p className="text-sm text-[#8bb8aa]">Alien table ambience</p>
            </div>
          </div>
          <button
            className="flex min-h-10 items-center gap-2 rounded border border-[#315a51] px-3 text-sm text-[#d8eee8] hover:border-[#d7f46b]"
            onClick={stopCurrent}
            type="button"
          >
            <Pause aria-hidden="true" size={16} />
            Stop
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {trackerSounds.map((sound) => {
            const active = activeSrc === sound.src && isPlaying

            return (
              <button
                className={`flex min-h-16 items-center gap-3 rounded border px-3 text-left transition ${
                  active
                    ? 'border-[#d7f46b] bg-[#d7f46b] text-[#07110f]'
                    : 'border-[#24433d] bg-[#07110f] text-[#d8eee8] hover:border-[#d7f46b]'
                }`}
                key={sound.src}
                onClick={() => void playSound(sound)}
                type="button"
              >
                {active ? <Volume2 aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
                <span>
                  <span className="block text-sm font-semibold">{sound.label}</span>
                  <span className={active ? 'block text-xs text-[#21342f]' : 'block text-xs text-[#8bb8aa]'}>
                    {sound.detail}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
