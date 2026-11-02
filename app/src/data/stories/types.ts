export type RoomKind =
  | 'bridge'
  | 'corridor'
  | 'quarters'
  | 'tech'
  | 'storage'
  | 'airlock'
  | 'medical'
  | 'cargo'
  | 'engine'
  | 'lift'
  | 'ladder'
  | 'core'
  | 'hive'

export type Room = {
  id: string
  name: string
  deck: string
  /** Grid units (1 unit = 1 square on the map). */
  rect: { x: number; y: number; w: number; h: number }
  kind: RoomKind
  /** Number of movement zones (Alien RPG: every room/corridor segment is a zone). */
  zones?: number
  /** Room IDs (same ship) reachable through normal doors. */
  exits: string[]
  /** Read-aloud / what the players see when they enter. */
  players: string
  /** Narrator-only: secrets, threats, checks. */
  gm: string
  /** Recommended exploration order (1 = first), used for step-by-step reveal. */
  step: number
  /** Not wheelchair accessible (stairs, ladders, shafts, thresholds). */
  noWheelchair?: boolean
}

export type Vent = {
  id: string
  deck: string
  /** Polyline in grid units. */
  points: [number, number][]
  /** Room IDs the vent opens into. */
  connects: string[]
  note?: string
}

export type Shaft = {
  id: string
  name: string
  deck: string
  x: number
  y: number
  /** Deck IDs this vertical shaft connects. */
  decks: string[]
  note: string
}

export type Deck = { id: string; name: string; width: number; height: number }

export type Ship = {
  id: string
  name: string
  type: string
  summary: string
  /** If true the ship is unknown to the players: rooms start hidden. */
  unknown?: boolean
  decks: Deck[]
  rooms: Room[]
  vents: Vent[]
  shafts: Shaft[]
}

export type StoryMaps = { ships: Ship[] }
