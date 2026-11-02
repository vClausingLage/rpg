import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

type Spec = {
  player: string
  name: string
  class: string
  career: string
  age: string
  isMechanic?: boolean
  personality: string
  story_background: string
  talents: string
  signature_item: string
  buddy: string
  rival: string
  attrs: { strength: number; agility: number; wits: number; empathy: number }
  skills: Record<string, number>
}

// Attribute 14 Punkte (2–4), Fertigkeiten 10 Punkte (max. 3), Gesundheit = Stärke, Willenskraft = Empathie.
const specs: Spec[] = [
  {
    player: 'Merle', name: 'Merle', class: 'WY-Agentin', career: 'Company Agent', age: '34',
    personality: 'Glatt, höflich, kalkulierend. Hält Anweisungen der Firma für wichtiger als Menschen.',
    story_background: 'Schreibtischtäterin der Weyland-Yutani-Zentrale. Hat vor Abflug den Zwischenstopp (Treffen mit der Gannet) in MU/TH/UR eingegeben und kennt die Direktive „Muster sichern“.',
    talents: 'Pull Rank (Firmenautorität)', signature_item: 'WY-Autorisierungschip',
    buddy: 'Cäcilie', rival: 'Kevin',
    attrs: { strength: 2, agility: 4, wits: 4, empathy: 4 },
    skills: { observation: 3, comtech: 2, command: 1, manipulation: 3, medical_aid: 1 },
  },
  {
    player: 'Kevin', name: 'Kevin', class: 'Captain', career: 'Officer', age: '47',
    personality: 'Zurückhaltend, verantwortungsbewusst, misstrauisch gegenüber der Firma.',
    story_background: 'Kapitän der Kestrel. Will seine Crew unversehrt nach Hause bringen. Der Override-Chip für den Autopiloten liegt in seinem Safe.',
    talents: 'Field Commander', signature_item: 'Override-Chip des Captains',
    buddy: 'Elena', rival: 'Merle',
    attrs: { strength: 3, agility: 3, wits: 4, empathy: 4 },
    skills: { command: 3, observation: 2, piloting: 1, manipulation: 2, comtech: 2 },
  },
  {
    player: 'Cäcilie', name: 'Cäcilie', class: 'Leutnant', career: 'Officer', age: '31',
    personality: 'Ehrgeizig, geldgierig, charmant. Wittert die Gelegenheit ihres Lebens.',
    story_background: 'Erster Offizier. Weiß nicht, was los ist, aber dass die Mission viel Geld bringt. Geht gern bei der Bergung mit.',
    talents: 'Pull Rank', signature_item: 'Abgenutzter Taschenrechner (Prämien-Fantasien)',
    buddy: 'Merle', rival: 'Kevin',
    attrs: { strength: 3, agility: 4, wits: 3, empathy: 4 },
    skills: { command: 2, manipulation: 3, observation: 2, piloting: 1, comtech: 2 },
  },
  {
    player: 'Lea', name: 'Lea', class: 'Mechanikerin', career: 'Roughneck', age: '29', isMechanic: true,
    personality: 'Still, in sich gekehrt, handwerklich brillant.',
    story_background: 'Kennt die Kestrel in- und auswendig, auch alle Schächte. Hat zwei Wartungsrückstände auf Deck C verschwiegen.',
    talents: 'Resilient', signature_item: 'Abgegriffener Schraubenschlüssel',
    buddy: 'Elena', rival: 'Merle',
    attrs: { strength: 4, agility: 3, wits: 4, empathy: 3 },
    skills: { heavy_machinery: 3, comtech: 2, stamina: 2, survival: 2, close_combat: 1 },
  },
  {
    player: 'Elena', name: 'Elena', class: 'Pilotin / Comtech (Android)', career: 'Pilot', age: 'Android (synthetisch)',
    personality: 'Fürsorglich, ruhig, weiß um ihre Grenzen. Will alle beschützen.',
    story_background: 'Android im Rollstuhl: Ein Unfall hat ihren Unterkörper irreparabel zerstört. Kann Ebenen nur ohne Rollstuhl wechseln (Leitern, Schächte) und muss ihn dann zurücklassen.',
    talents: 'Full Throttle', signature_item: 'Rollstuhl (Spezialanfertigung)',
    buddy: 'Lea', rival: 'Cäcilie',
    attrs: { strength: 4, agility: 2, wits: 4, empathy: 4 },
    skills: { piloting: 3, comtech: 3, observation: 2, heavy_machinery: 1, medical_aid: 1 },
  },
]

const story = (await payload.find({ collection: 'stories', where: { slug: { equals: 'stiller-treffpunkt' } }, limit: 1, depth: 0 })).docs[0]
if (!story) throw new Error('Story stiller-treffpunkt fehlt – erst seed-stories ausführen.')

const ids: Record<string, number> = {}
const playerIds: Record<string, number> = {}
for (const s of specs) {
  const player = (await payload.find({ collection: 'players', where: { and: [{ name: { equals: s.player } }, { story: { equals: story.id } }] }, limit: 1, depth: 0 })).docs[0]
  if (!player) throw new Error(`Spieler ${s.player} fehlt`)
  playerIds[s.player] = player.id
  if (player.avatar) { ids[s.name] = typeof player.avatar === 'object' ? (player.avatar as any).id : (player.avatar as number); continue }
  const avatar = await payload.create({
    collection: 'avatars',
    data: {
      player: player.id, name: s.name, class: s.class, career: s.career, age: s.age,
      isMechanic: Boolean(s.isMechanic), personality: s.personality, story_background: s.story_background,
      talents: s.talents, signature_item: s.signature_item,
      exp: 0, story_points: 0, stress_level: 0,
      health: s.attrs.strength, resolve: s.attrs.empathy, encumbrance: 0, cash: 0,
      ...s.attrs, ...s.skills,
    } as any,
  })
  await payload.update({ collection: 'players', id: player.id, data: { avatar: avatar.id } })
  ids[s.name] = avatar.id
}
for (const s of specs) {
  await payload.update({ collection: 'avatars', id: ids[s.name], data: { buddy: ids[s.buddy], rival: ids[s.rival] } as any })
}
console.log('avatars:', ids)
process.exit(0)
