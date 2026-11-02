import type { StoryMaps } from './types'
import { stillerTreffpunktMaps } from './stiller-treffpunkt'

/** Map data per story slug. Stories without an entry have no ship plans. */
const mapsBySlug: Record<string, StoryMaps> = {
  'stiller-treffpunkt': stillerTreffpunktMaps,
}

export const getStoryMaps = (slug?: string | null): StoryMaps | null =>
  (slug && mapsBySlug[slug]) || null
