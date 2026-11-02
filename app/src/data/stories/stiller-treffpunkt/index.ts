import type { StoryMaps } from '../types'
import { gannet } from './gannet'
import { kestrel } from './kestrel'
import { kestrelCargo } from './kestrel-cargo'

export const stillerTreffpunktMaps: StoryMaps = { ships: [kestrel, kestrelCargo, gannet] }
