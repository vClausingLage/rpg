import fs from 'node:fs'
import path from 'node:path'

import config from '@payload-config'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

// 1) Existing, already played story: attach legacy players and overview page.
const legacy = await payload.find({ collection: 'stories', where: { slug: { equals: 'hopes-last-day' } }, limit: 1 })
let legacyStory = legacy.docs[0]
if (!legacyStory) {
  const overview = await payload.find({ collection: 'pages', where: { slug: { equals: 'narrator-overview' } }, limit: 1, depth: 0 })
  legacyStory = await payload.create({
    collection: 'stories',
    data: {
      title: "Hope's Last Day",
      status: 'finished',
      summary: 'Erste Kampagne – einmal durchgespielt.',
      overviewPage: overview.docs[0]?.id,
    },
  })
}
const orphans = await payload.find({ collection: 'players', where: { story: { exists: false } }, limit: 100, depth: 0, pagination: false })
for (const p of orphans.docs) {
  await payload.update({ collection: 'players', id: p.id, data: { story: legacyStory.id } })
}

// 2) New story.
const markdown = fs.readFileSync(path.resolve('src/data/stories/stiller-treffpunkt/script.md'), 'utf8')
const editorConfig = await editorConfigFactory.fromFeatures({
  config: payload.config,
  features: ({ defaultFeatures }) => defaultFeatures,
})
const script = convertMarkdownToLexical({ editorConfig, markdown })

const existing = await payload.find({ collection: 'stories', where: { slug: { equals: 'stiller-treffpunkt' } }, limit: 1 })
const data = {
  title: 'Stiller Treffpunkt',
  status: 'running' as const,
  summary:
    'Eine Frachter-Crew erwacht auf einem Kurs, den keiner gesetzt hat – direkt auf ein stilles Bergungsschiff über einem Wüstenplaneten zu.',
  script: script as any,
}
const story = existing.docs[0]
  ? await payload.update({ collection: 'stories', id: existing.docs[0].id, data })
  : await payload.create({ collection: 'stories', data })

const crew = ['Merle', 'Lea', 'Elena', 'Kevin', 'Cäcilie']
for (const name of crew) {
  const found = await payload.find({ collection: 'players', where: { and: [{ name: { equals: name } }, { story: { equals: story.id } }] }, limit: 1, depth: 0 })
  if (!found.docs[0]) await payload.create({ collection: 'players', data: { name, story: story.id } })
}

console.log('story slug:', story.slug, 'id:', story.id, 'legacy:', legacyStory.id)
process.exit(0)
