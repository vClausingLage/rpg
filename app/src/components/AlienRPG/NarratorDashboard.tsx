'use client'

import React, { useMemo, useState } from 'react'

import {
  attachNewItem,
  createAvatarFromPreset,
  createPlayer,
  detachItem,
  updateAvatarField,
} from '@/app/(frontend)/narrator/actions'

type Doc = Record<string, any>

const vitalFields = [
  'stress_level',
  'health',
  'resolve',
  'exp',
  'story_points',
  'encumbrance',
  'cash',
]

const attributeGroups = [
  ['strength', 'close_combat', 'heavy_machinery'],
  ['agility', 'mobility', 'piloting', 'ranged_combat'],
  ['wits', 'comtech', 'observation', 'survival'],
  ['empathy', 'command', 'manipulation', 'medical_aid'],
]

const textFields = [
  'personality',
  'story_background',
  'talents',
  'critical_injuries_and_trauma',
  'signature_item',
]

function label(value: string) {
  return value.replaceAll('_', ' ')
}

function docId(value: unknown) {
  if (!value) return ''
  if (typeof value === 'object' && 'id' in value) return String((value as Doc).id)
  return String(value)
}

function relationList(value: unknown) {
  return Array.isArray(value) ? value : []
}

function FieldForm({
  avatarId,
  field,
  value,
  type = 'number',
}: {
  avatarId: string
  field: string
  value: unknown
  type?: 'number' | 'text' | 'textarea' | 'boolean'
}) {
  if (type === 'boolean') {
    const checked = Boolean(value)
    return (
      <form action={updateAvatarField} className="flex items-center justify-between gap-3 rounded border border-[#24433d] bg-[#07110f] px-3 py-2">
        <input name="avatarId" type="hidden" value={avatarId} />
        <input name="field" type="hidden" value={field} />
        <input name="value" type="hidden" value={checked ? 'false' : 'true'} />
        <span className="text-sm uppercase tracking-[0.08em] text-[#8bb8aa]">{label(field)}</span>
        <button className={checked ? 'text-[#d7f46b]' : 'text-[#6f8c84]'} type="submit">
          {checked ? 'active' : 'clear'}
        </button>
      </form>
    )
  }

  return (
    <form action={updateAvatarField} className="rounded border border-[#24433d] bg-[#07110f] p-3">
      <input name="avatarId" type="hidden" value={avatarId} />
      <input name="field" type="hidden" value={field} />
      <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-[#8bb8aa]">{label(field)}</label>
      {type === 'textarea' ? (
        <textarea
          className="min-h-24 w-full resize-y rounded border border-[#315a51] bg-[#020504] px-3 py-2 text-sm text-[#d8eee8]"
          defaultValue={String(value || '')}
          name="value"
        />
      ) : (
        <input
          className="w-full rounded border border-[#315a51] bg-[#020504] px-3 py-2 text-sm text-[#d8eee8]"
          defaultValue={String(value ?? '')}
          name="value"
          type={type}
        />
      )}
      <button className="mt-2 rounded bg-[#c7d66d] px-3 py-1 text-sm font-medium text-[#08100e]" type="submit">
        Save
      </button>
    </form>
  )
}

function StressPanel({ avatar, responses }: { avatar: Doc; responses: Doc[] }) {
  return (
    <section className="border-y border-[#24433d] bg-[#081513] p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-lg uppercase tracking-[0.12em] text-[#e6f0ca]">Stress and panic</h2>
        <span className="font-mono text-3xl text-[#d7f46b]">{avatar.stress_level ?? 0}</span>
      </div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
        {Array.from({ length: 11 }, (_, stress) => (
          <form action={updateAvatarField} key={stress}>
            <input name="avatarId" type="hidden" value={avatar.id} />
            <input name="field" type="hidden" value="stress_level" />
            <input name="value" type="hidden" value={stress} />
            <button
              className={`h-10 w-full rounded border text-sm ${
                Number(avatar.stress_level || 0) === stress
                  ? 'border-[#d7f46b] bg-[#d7f46b] text-[#07110f]'
                  : 'border-[#315a51] text-[#b7d4cc]'
              }`}
              type="submit"
            >
              {stress}
            </button>
          </form>
        ))}
      </div>
      <form action={updateAvatarField} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input name="avatarId" type="hidden" value={avatar.id} />
        <input name="field" type="hidden" value="stress_and_panic_responses" />
        <select
          className="min-h-10 flex-1 rounded border border-[#315a51] bg-[#020504] px-3 text-[#d8eee8]"
          defaultValue={docId(avatar.stress_and_panic_responses)}
          name="value"
        >
          <option value="">No response</option>
          {responses.map((response) => (
            <option key={response.id} value={response.id}>
              {response.name}
            </option>
          ))}
        </select>
        <button className="rounded bg-[#c7d66d] px-4 py-2 font-medium text-[#08100e]" type="submit">
          Set response
        </button>
      </form>
    </section>
  )
}

function RelationEditor({
  avatar,
  field,
  collection,
  fields,
}: {
  avatar: Doc
  field: string
  collection: string
  fields: { name: string; type?: string; placeholder?: string }[]
}) {
  const items = field === 'armor' ? (avatar[field] ? [avatar[field]] : []) : relationList(avatar[field])

  return (
    <section className="rounded border border-[#24433d] bg-[#07110f] p-4">
      <h3 className="mb-3 text-sm uppercase tracking-[0.12em] text-[#e6f0ca]">{label(field)}</h3>
      <div className="space-y-2">
        {items.length === 0 && <p className="text-sm text-[#6f8c84]">None logged.</p>}
        {items.map((item) => (
          <div className="flex items-center justify-between gap-3 border-b border-[#18322d] pb-2" key={docId(item)}>
            <span className="text-sm text-[#d8eee8]">
              {item.name}
              {item.level !== undefined ? ` / level ${item.level}` : ''}
              {item.damage !== undefined ? ` / damage ${item.damage}` : ''}
              {item.weight !== undefined ? ` / wt ${item.weight}` : ''}
            </span>
            <form action={detachItem}>
              <input name="avatarId" type="hidden" value={avatar.id} />
              <input name="field" type="hidden" value={field} />
              <input name="itemId" type="hidden" value={docId(item)} />
              <button className="rounded border border-[#8f3f3b] px-2 py-1 text-xs text-[#ffb1a9]" type="submit">
                Remove
              </button>
            </form>
          </div>
        ))}
      </div>
      <form action={attachNewItem} className="mt-4 grid gap-2 sm:grid-cols-2">
        <input name="avatarId" type="hidden" value={avatar.id} />
        <input name="field" type="hidden" value={field} />
        <input name="collection" type="hidden" value={collection} />
        {fields.map((input) => (
          <input
            className="min-h-10 rounded border border-[#315a51] bg-[#020504] px-3 text-sm text-[#d8eee8]"
            key={input.name}
            name={input.name}
            placeholder={input.placeholder || label(input.name)}
            required={input.name === 'name'}
            type={input.type || 'text'}
          />
        ))}
        <button className="rounded bg-[#c7d66d] px-3 py-2 text-sm font-medium text-[#08100e]" type="submit">
          Add
        </button>
      </form>
    </section>
  )
}

export function NarratorDashboard({
  players,
  presets,
  responses,
}: {
  players: Doc[]
  presets: Doc[]
  responses: Doc[]
}) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(players[0]?.id ? String(players[0].id) : '')
  const selectedPlayer = useMemo(
    () => players.find((player) => String(player.id) === selectedPlayerId) || players[0],
    [players, selectedPlayerId],
  )
  const avatar = selectedPlayer?.avatar
  const picture = avatar?.picture

  return (
    <main className="min-h-screen bg-[#020504] text-[#d8eee8]">
      <div className="border-b border-[#24433d] bg-[#07110f] px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d7f46b]">MU/TH/UR narrator console</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#f1f4de]">Alien RPG table</h1>
          </div>
          <a className="text-sm text-[#d7f46b] underline-offset-4 hover:underline" href="/narrator/overview">
            Story overview
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <form action={createPlayer} className="rounded border border-[#24433d] bg-[#07110f] p-4">
            <label className="mb-2 block text-xs uppercase tracking-[0.12em] text-[#8bb8aa]">New player</label>
            <div className="flex gap-2">
              <input className="min-w-0 flex-1 rounded border border-[#315a51] bg-[#020504] px-3 text-sm" name="name" placeholder="Player name" required />
              <button className="rounded bg-[#c7d66d] px-3 py-2 text-sm font-medium text-[#08100e]" type="submit">
                Add
              </button>
            </div>
          </form>

          <nav className="space-y-2">
            {players.map((player) => (
              <button
                className={`w-full rounded border px-3 py-3 text-left ${
                  String(player.id) === selectedPlayerId
                    ? 'border-[#d7f46b] bg-[#12211e]'
                    : 'border-[#24433d] bg-[#07110f]'
                }`}
                key={player.id}
                onClick={() => setSelectedPlayerId(String(player.id))}
                type="button"
              >
                <span className="block text-sm font-medium text-[#f1f4de]">{player.name}</span>
                <span className="text-xs text-[#8bb8aa]">{player.avatar?.name || 'No avatar attached'}</span>
              </button>
            ))}
          </nav>
        </aside>

        {!selectedPlayer ? (
          <section className="rounded border border-[#24433d] bg-[#07110f] p-6">
            <p>Create a player to start the roster.</p>
          </section>
        ) : !avatar ? (
          <section className="rounded border border-[#24433d] bg-[#07110f] p-6">
            <h2 className="mb-3 text-xl text-[#f1f4de]">Attach an avatar preset to {selectedPlayer.name}</h2>
            <form action={createAvatarFromPreset} className="flex flex-col gap-3 sm:flex-row">
              <input name="playerId" type="hidden" value={selectedPlayer.id} />
              <select className="min-h-10 flex-1 rounded border border-[#315a51] bg-[#020504] px-3" name="presetId" required>
                <option value="">Choose preset</option>
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </select>
              <button className="rounded bg-[#c7d66d] px-4 py-2 font-medium text-[#08100e]" type="submit">
                Create avatar
              </button>
            </form>
          </section>
        ) : (
          <section className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
              <div className="overflow-hidden rounded border border-[#24433d] bg-[#07110f]">
                {picture?.url ? (
                  <img alt={picture.alt || avatar.name} className="aspect-square w-full object-cover" src={picture.url} />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-[#0b1815] font-mono text-5xl text-[#315a51]">
                    {String(avatar.name || '?').slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <FieldForm avatarId={avatar.id} field="name" type="text" value={avatar.name} />
                <FieldForm avatarId={avatar.id} field="class" type="text" value={avatar.class} />
                <FieldForm avatarId={avatar.id} field="career" type="text" value={avatar.career} />
                <FieldForm avatarId={avatar.id} field="age" type="text" value={avatar.age} />
                <FieldForm avatarId={avatar.id} field="isMechanic" type="boolean" value={avatar.isMechanic} />
                <FieldForm avatarId={avatar.id} field="isFatigued" type="boolean" value={avatar.isFatigued} />
                <FieldForm avatarId={avatar.id} field="isRadiated" type="boolean" value={avatar.isRadiated} />
              </div>
            </div>

            <StressPanel avatar={avatar} responses={responses} />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {vitalFields.map((field) => (
                <FieldForm avatarId={avatar.id} field={field} key={field} value={avatar[field]} />
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {attributeGroups.map((group) => (
                <div className="grid gap-3 sm:grid-cols-2" key={group.join('-')}>
                  {group.map((field) => (
                    <FieldForm avatarId={avatar.id} field={field} key={field} value={avatar[field]} />
                  ))}
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {textFields.map((field) => (
                <FieldForm avatarId={avatar.id} field={field} key={field} type="textarea" value={avatar[field]} />
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <RelationEditor avatar={avatar} collection="tiny-items" field="tiny_items" fields={[{ name: 'name' }]} />
              <RelationEditor
                avatar={avatar}
                collection="armor"
                field="armor"
                fields={[
                  { name: 'name' },
                  { name: 'level', type: 'number' },
                  { name: 'weight', type: 'number' },
                ]}
              />
              <RelationEditor
                avatar={avatar}
                collection="gear"
                field="gear"
                fields={[
                  { name: 'name' },
                  { name: 'power' },
                  { name: 'weight', type: 'number' },
                ]}
              />
              <RelationEditor
                avatar={avatar}
                collection="weapons"
                field="weapons"
                fields={[
                  { name: 'name' },
                  { name: 'modifier', type: 'number' },
                  { name: 'damage', type: 'number' },
                  { name: 'range' },
                  { name: 'ammo', type: 'number' },
                  { name: 'weight', type: 'number' },
                ]}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
