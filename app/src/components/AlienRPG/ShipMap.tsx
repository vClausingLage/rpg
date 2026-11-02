'use client'

import React, { useMemo, useState, useTransition } from 'react'

import { toggleRoomReveal } from '@/app/(frontend)/narrator/stories/actions'
import type { Room, RoomKind, Ship } from '@/data/stories/types'

const UNIT = 34

const kindColor: Record<RoomKind, string> = {
  bridge: '#1d4a5c',
  corridor: '#16302b',
  quarters: '#2a3b2c',
  tech: '#3a3a22',
  storage: '#2f2f2f',
  airlock: '#4b3a1d',
  medical: '#2c4a45',
  cargo: '#2d3342',
  engine: '#4b2a22',
  lift: '#3b2d4a',
  ladder: '#3b2d4a',
  core: '#1e3a2a',
  hive: '#4a1d2a',
}

const kindLabel: Record<RoomKind, string> = {
  bridge: 'Brücke',
  corridor: 'Gang',
  quarters: 'Wohnen',
  tech: 'Technik',
  storage: 'Lager',
  airlock: 'Schleuse',
  medical: 'Medizin',
  cargo: 'Fracht',
  engine: 'Maschinen',
  lift: 'Aufzug',
  ladder: 'Leiter',
  core: 'KI-Kern',
  hive: 'Hive',
}

export function ShipMap({
  initialRevealed,
  ship,
  storyId,
}: {
  initialRevealed: string[]
  ship: Ship
  storyId: number | string
}) {
  const [deckId, setDeckId] = useState(ship.decks[0].id)
  const [mode, setMode] = useState<'gm' | 'players'>('gm')
  const [showVents, setShowVents] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(new Set(initialRevealed))
  const [pending, startTransition] = useTransition()

  const key = (room: Room) => `${ship.id}:${room.id}`
  // Known ships (home ship) are fully visible to players; unknown ones only once revealed.
  const isVisible = (room: Room) => !ship.unknown || revealed.has(key(room))

  const deck = ship.decks.find((d) => d.id === deckId) ?? ship.decks[0]
  const rooms = ship.rooms.filter((r) => r.deck === deck.id)
  const roomsById = useMemo(() => new Map(ship.rooms.map((r) => [r.id, r])), [ship])
  const selected = selectedId ? roomsById.get(selectedId) : undefined
  const gm = mode === 'gm'
  const nextHidden = ship.rooms
    .filter((r) => !revealed.has(key(r)))
    .sort((a, b) => a.step - b.step)[0]

  const toggle = (room: Room) => {
    const k = key(room)
    setRevealed((current) => {
      const next = new Set(current)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
    startTransition(async () => {
      await toggleRoomReveal(storyId, k)
    })
  }

  const revealNext = () => {
    if (!nextHidden) return
    setDeckId(nextHidden.deck)
    setSelectedId(nextHidden.id)
    toggle(nextHidden)
  }

  return (
    <section className="rounded border border-[#24433d] bg-[#07110f] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h3 className="text-xl text-[#f1f4de]">{ship.name}</h3>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8bb8aa]">{ship.type}</p>
          <p className="mt-2 text-sm text-[#8bb8aa]">{ship.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            className={`rounded border px-3 py-1 ${gm ? 'border-[#d7f46b] bg-[#d7f46b] text-[#08100e]' : 'border-[#315a51]'}`}
            onClick={() => setMode('gm')}
            type="button"
          >
            Erzähler
          </button>
          <button
            className={`rounded border px-3 py-1 ${!gm ? 'border-[#d7f46b] bg-[#d7f46b] text-[#08100e]' : 'border-[#315a51]'}`}
            onClick={() => setMode('players')}
            type="button"
          >
            Spieleransicht
          </button>
          <label className="flex items-center gap-1 px-2">
            <input checked={showVents} onChange={(e) => setShowVents(e.target.checked)} type="checkbox" />
            Schächte
          </label>
          {ship.unknown ? (
            <button
              className="rounded border border-[#c7d66d] px-3 py-1 text-[#d7f46b] disabled:opacity-40"
              disabled={!nextHidden || pending}
              onClick={revealNext}
              type="button"
            >
              Nächsten Raum aufdecken{nextHidden ? ` (${nextHidden.name})` : ''}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist">
        {ship.decks.map((d) => (
          <button
            aria-selected={d.id === deck.id}
            className={`rounded border px-3 py-1 text-sm ${d.id === deck.id ? 'border-[#d7f46b] text-[#d7f46b]' : 'border-[#315a51]'}`}
            key={d.id}
            onClick={() => {
              setDeckId(d.id)
              setSelectedId(null)
            }}
            role="tab"
            type="button"
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[auto_1fr]">
        <div className="overflow-auto rounded border border-[#24433d] bg-[#020504]">
          <svg
            aria-label={`${ship.name} – ${deck.name}`}
            height={deck.height * UNIT}
            viewBox={`0 0 ${deck.width * UNIT} ${deck.height * UNIT}`}
            width={deck.width * UNIT}
          >
            {rooms.map((room) => {
              const visible = isVisible(room)
              if (!gm && !visible) return null
              const { x, y, w, h } = room.rect
              const hiddenForGm = gm && !visible
              return (
                <g
                  className="cursor-pointer"
                  key={room.id}
                  onClick={() => setSelectedId(room.id)}
                  opacity={hiddenForGm ? 0.45 : 1}
                >
                  <rect
                    fill={kindColor[room.kind]}
                    height={h * UNIT - 2}
                    rx={3}
                    stroke={selectedId === room.id ? '#d7f46b' : '#4d7a6e'}
                    strokeDasharray={hiddenForGm ? '5 4' : undefined}
                    strokeWidth={selectedId === room.id ? 2.5 : 1.2}
                    width={w * UNIT - 2}
                    x={x * UNIT + 1}
                    y={y * UNIT + 1}
                  />
                  <text fill="#f1f4de" fontSize={11} x={x * UNIT + 6} y={y * UNIT + 16}>
                    {room.name.length * 6.2 > w * UNIT - 8 ? room.name.slice(0, Math.floor((w * UNIT - 8) / 6.2)) + '…' : room.name}
                  </text>
                  {hiddenForGm ? (
                    <text fill="#d7f46b" fontSize={11} x={x * UNIT + 6} y={y * UNIT + 30}>
                      verborgen
                    </text>
                  ) : null}
                  {room.noWheelchair ? (
                    <text fill="#ff9d7a" fontSize={11} x={x * UNIT + w * UNIT - 20} y={y * UNIT + 16}>
                      ♿✕
                    </text>
                  ) : null}
                </g>
              )
            })}

            {showVents
              ? ship.vents
                  .filter((v) => v.deck === deck.id)
                  .filter((v) => gm || v.connects.some((id) => revealed.has(`${ship.id}:${id}`) || !ship.unknown))
                  .map((v) => (
                    <g key={v.id} pointerEvents="none">
                      <polyline
                        fill="none"
                        points={v.points.map(([px, py]) => `${px * UNIT},${py * UNIT}`).join(' ')}
                        stroke="#ffb454"
                        strokeDasharray="3 5"
                        strokeLinecap="round"
                        strokeWidth={2}
                      />
                      <circle cx={v.points[0][0] * UNIT} cy={v.points[0][1] * UNIT} fill="#ffb454" r={3} />
                    </g>
                  ))
              : null}

            {ship.shafts
              .filter((s) => s.decks.includes(deck.id))
              .map((s) => (
                <g key={s.id} pointerEvents="none">
                  <circle cx={s.x * UNIT} cy={s.y * UNIT} fill="#020504" r={9} stroke="#ffb454" strokeWidth={2} />
                  <text fill="#ffb454" fontSize={9} textAnchor="middle" x={s.x * UNIT} y={s.y * UNIT + 3}>
                    {s.id}
                  </text>
                </g>
              ))}
          </svg>
        </div>

        <aside className="min-h-40 rounded border border-[#24433d] bg-[#050c0a] p-4 text-sm">
          {selected && (gm || isVisible(selected)) ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg text-[#f1f4de]">{selected.name}</h4>
                  <p className="font-mono text-xs uppercase text-[#8bb8aa]">
                    {kindLabel[selected.kind]} · Deck {selected.deck} · {selected.zones ?? 1} Zone(n) · Schritt {selected.step}
                  </p>
                </div>
                {gm && ship.unknown ? (
                  <button
                    className="shrink-0 rounded border border-[#c7d66d] px-3 py-1 text-[#d7f46b] disabled:opacity-40"
                    disabled={pending}
                    onClick={() => toggle(selected)}
                    type="button"
                  >
                    {revealed.has(key(selected)) ? 'Verbergen' : 'Aufdecken'}
                  </button>
                ) : null}
              </div>
              {selected.noWheelchair ? (
                <p className="rounded border border-[#7a3d2a] bg-[#2a1511] p-2 text-[#ffb59c]">
                  Nicht mit dem Rollstuhl befahrbar – Elena muss den Rollstuhl zurücklassen.
                </p>
              ) : null}
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#8bb8aa]">Spieler sehen</p>
                <p className="mt-1 text-[#d8eee8]">{selected.players}</p>
              </div>
              {gm ? (
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#d7f46b]">Nur Erzähler</p>
                  <p className="mt-1 text-[#d8eee8]">{selected.gm}</p>
                </div>
              ) : null}
              <p className="text-[#8bb8aa]">
                Ausgänge:{' '}
                {selected.exits.length
                  ? selected.exits
                      .map((id) => roomsById.get(id))
                      .filter((r): r is Room => Boolean(r) && (gm || isVisible(r!)))
                      .map((r) => r.name)
                      .join(', ') || '—'
                  : 'nur über Schächte'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-[#8bb8aa]">
              <p>Raum anklicken für Details.</p>
              <p>
                <span className="text-[#ffb454]">- - -</span> Lüftungs-/Wartungsschächte, <span className="text-[#ffb454]">S1/S2</span> vertikale Schächte,{' '}
                <span className="text-[#ff9d7a]">♿✕</span> nicht rollstuhltauglich.
              </p>
              {ship.unknown ? (
                <p>
                  Unbekanntes Schiff: {ship.rooms.filter((r) => revealed.has(key(r))).length}/{ship.rooms.length} Räume aufgedeckt.
                </p>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
