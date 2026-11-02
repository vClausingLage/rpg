import type { Ship } from '../types'

/** Abgekoppelter Fracht-Anhänger der Kestrel. Spielt nur eine Nebenrolle. */
export const kestrelCargo: Ship = {
  id: 'kestrel-cargo',
  name: 'Kestrel-Frachtmodul',
  type: 'Fracht-Anhänger (abgekoppelt, nur lose im Orbit nachgeführt)',
  summary:
    'Das große Frachtmodul wurde für die Reise abgekoppelt. Es spielt keine große Rolle – höchstens als Notversteck, Beweis für „die Fracht ist irgendwo da draußen“ oder als Ort für kleine Funde.',
  decks: [{ id: 'A', name: 'Frachtmodul', width: 26, height: 10 }],
  rooms: [
    {
      id: 'hold', name: 'Frachthalle', deck: 'A', kind: 'cargo', zones: 4, step: 1,
      rect: { x: 4, y: 1, w: 20, h: 7 }, exits: ['gate'],
      players: 'Stapel von Containern, Kabelschächte, Warnaufkleber.',
      gm: 'Container: Maschinenteile und Biowaren (ohne Bedeutung). Gute Stelle für einen gelungenen Fund/Notfallausrüstung. Wenn dramaturgisch nötig: leichter Schatten, ohne Alien.',
    },
    {
      id: 'gate', name: 'Kupplungsschleuse', deck: 'A', kind: 'airlock', zones: 1, step: 2,
      rect: { x: 0, y: 3, w: 4, h: 3 }, exits: ['hold'], players: 'Schott mit Handrad.', gm: 'Verbindet mit Kestrel Deck B.',
    },
  ],
  vents: [
    { id: 'vc1', deck: 'A', points: [[6, 2], [14, 2], [22, 2]], connects: ['hold'], note: 'Kabelkanal an der Decke.' },
  ],
  shafts: [],
}
