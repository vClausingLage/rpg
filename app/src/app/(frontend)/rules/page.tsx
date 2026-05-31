import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type SectionLink = {
  href: string
  label: string
}

type RuleCardProps = {
  children: ReactNode
  eyebrow?: string
  id?: string
  title: string
}

type Row = {
  label: string
  value: ReactNode
}

export const metadata: Metadata = {
  title: 'Alien RPG Rules Summary',
  description: 'A public GM reference page for Alien RPG rules, rolls, combat, stress, and panic.',
}

const sectionLinks: SectionLink[] = [
  { href: '#dice', label: 'Dice' },
  { href: '#characters', label: 'Characters' },
  { href: '#skill-rolls', label: 'Skill Rolls' },
  { href: '#space-time', label: 'Space and Time' },
  { href: '#combat', label: 'Combat' },
  { href: '#health', label: 'Health' },
  { href: '#stress-panic', label: 'Stress and Panic' },
  { href: '#gm-flow', label: 'GM Flow' },
]

const rangeRows: Row[] = [
  { label: 'Adjacent', value: 'In your face, same exact position.' },
  { label: 'Short', value: 'Same zone.' },
  { label: 'Medium', value: 'Adjacent zone.' },
  { label: 'Long', value: 'Up to 4 zones away.' },
  { label: 'Extreme', value: 'More than 4 zones away.' },
]

const timeRows: Row[] = [
  { label: 'Round', value: '5-10 seconds. Use for combat and immediate danger.' },
  { label: 'Stretch', value: '5-10 minutes. Use for searching, recovery, and pressure clocks.' },
  { label: 'Shift', value: '5-10 hours. Use for travel, repair work, and long tasks.' },
]

const rangedModifiers: Row[] = [
  { label: 'Aim', value: '+2 dice.' },
  { label: 'Below minimum range', value: '-2 dice.' },
  { label: 'Target in partial cover', value: '-2 dice.' },
  { label: 'Target in full cover', value: '-3 dice.' },
  { label: 'Aim for weak spot', value: '-2 dice, then reduce armor by 1 on a hit.' },
  { label: 'Large target', value: '+2 dice, such as a vehicle.' },
  { label: 'Small target', value: '-2 dice, such as a terminal or chestburster.' },
  { label: 'Armor piercing', value: 'Reduce armor by 1.' },
]

const stressTriggers = [
  'Pushing a skill roll.',
  'Certain nearby stress or panic responses.',
  'Second or third attack with full auto.',
  'Being fatigued.',
  'Being attacked by a member of your own crew.',
  'A stress encounter called by the GM.',
]

const panicTriggers = [
  'Witness a player character become broken.',
  'See a Xenomorph for the first time.',
  'A Xenomorph enters Adjacent range, even if seen before.',
  'Witness a player character suffer certain panic responses.',
  'Experience a truly horrifying event.',
]

function DiceBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'bad' | 'good' | 'neutral' }) {
  const toneClasses = {
    bad: 'border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-200',
    good: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    neutral: 'border-border bg-card text-foreground',
  }

  return (
    <span
      className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-md border px-2 font-mono text-sm font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}

function RuleCard({ children, eyebrow, id, title }: RuleCardProps) {
  return (
    <section
      className="scroll-mt-24 rounded-lg border border-border bg-card/70 p-5 shadow-sm md:p-6"
      id={id}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-normal md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-sm leading-6 text-foreground/90 md:text-base">{children}</div>
    </section>
  )
}

function DataRows({ rows }: { rows: Row[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div className="rounded-md border border-border bg-background p-4" key={row.label}>
          <dt className="font-semibold text-foreground">{row.label}</dt>
          <dd className="mt-1 text-sm leading-6 text-muted-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li className="rounded-md border border-border bg-background px-4 py-3" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function RulesPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="border-b border-border bg-card/40">
        <div className="container py-8 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">GM reference</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal md:text-6xl">
                Alien RPG Rules Summary
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
                A compact table reference for sessions: dice outcomes, player state, zones, combat, damage, stress,
                and panic. Use this as a play aid, not as a replacement for the core rulebook.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-background p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Facehugger</p>
                <div className="mt-2 flex items-center gap-2">
                  <DiceBadge tone="bad">1</DiceBadge>
                  <span className="text-sm text-muted-foreground">Stress die trouble</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Success</p>
                <div className="mt-2 flex items-center gap-2">
                  <DiceBadge tone="good">6</DiceBadge>
                  <span className="text-sm text-muted-foreground">Hit or stunt</span>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="Rules sections" className="mt-8 flex flex-wrap gap-2">
            {sectionLinks.map((link) => (
              <a
                className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container grid gap-6 py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
        <aside className="hidden rounded-lg border border-border bg-card/70 p-4 lg:sticky lg:top-6 lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">At the table</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            <li>1. Ask what the character wants.</li>
            <li>2. Pick roll type: normal, passive, or opposed.</li>
            <li>3. Count attribute + skill + gear + modifiers.</li>
            <li>4. Add stress dice if stressed.</li>
            <li>5. Resolve successes, facehuggers, push, panic, and consequences.</li>
          </ol>
        </aside>

        <div className="space-y-6">
          <RuleCard eyebrow="Core symbols" id="dice" title="Dice">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-3">
                  <DiceBadge tone="good">6</DiceBadge>
                  <div>
                    <h3 className="font-semibold">Success</h3>
                    <p className="text-sm text-muted-foreground">
                      One success usually completes the action. Extra successes can buy extra damage, speed, detail, or
                      other benefits when the move allows it.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-red-500/40 bg-red-500/10 p-4">
                <div className="flex items-center gap-3">
                  <DiceBadge tone="bad">1</DiceBadge>
                  <div>
                    <h3 className="font-semibold">Facehugger on stress dice</h3>
                    <p className="text-sm text-muted-foreground">
                      A 1 on a stress die can trigger a stress or panic response. Ones on base dice do not count for
                      this.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RuleCard>

          <RuleCard eyebrow="Player characters" id="characters" title="Stats, Gear, and Supplies">
            <DataRows
              rows={[
                { label: 'Health', value: '(Strength + Agility) / 2.' },
                { label: 'Resolve', value: '(Wits + Empathy) / 2.' },
                { label: 'Encumbrance', value: 'Maximum item weight equals Strength x 2.' },
                {
                  label: 'Over-encumbrance',
                  value: 'Can carry up to encumbrance x 2. Gain Stress +1 per stretch while over the limit.',
                },
              ]}
            />

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Consumables: Air, Ammo, Power</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                After use, make a supply roll. Roll stress dice equal to the current rating. Reduce the rating by one
                for each facehugger result. When the rating reaches zero, the resource is spent.
              </p>
            </div>
          </RuleCard>

          <RuleCard eyebrow="Resolution" id="skill-rolls" title="Skill Rolls">
            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Normal roll</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Roll dice equal to Attribute + Skill, then add gear, situational modifiers, and stress dice. No success
                means failure. One success means the action works. Extra successes can improve the result.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Push</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  If the roll failed and no stress die rolled a facehugger, the player may push: Stress +1, add one
                  stress die, keep all successes, and reroll the rest.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Story point</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Spend one story point to add one success when the fiction supports it.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Stress response</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Roll D6 + Stress Level - Resolve when panic or a stress response is triggered.
                </p>
              </div>
            </div>

            <DataRows
              rows={[
                { label: 'Passive roll', value: 'Used when the situation tests awareness, such as Observation.' },
                { label: 'Opposed roll', value: 'Win by rolling more successes than the opponent.' },
              ]}
            />
          </RuleCard>

          <RuleCard eyebrow="Positioning" id="space-time" title="Space and Time">
            <div>
              <h3 className="mb-3 font-semibold">Time scales</h3>
              <DataRows rows={timeRows} />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Zones</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A zone can be cluttered or open. Clutter gives chances to hide or take cover. Access points can be
                  sealed.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Common borders</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Furniture: Armor 1</li>
                  <li>Lock or door: Armor 2</li>
                  <li>Lock or outside door: Armor 3</li>
                  <li>Armored bulkhead: Armor 4</li>
                </ul>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Line of sight</h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-muted-foreground">
                <li>Line of sight reaches through zones unless blocked.</li>
                <li>Hidden characters and characters in full cover are out of sight.</li>
                <li>Doors block sight. A half action can be used to peek through.</li>
                <li>Hidden targets must be actively searched for with Observation.</li>
                <li>Darkness gives humans -2 dice. Aliens ignore it. A flashlight removes the penalty.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Range bands</h3>
              <DataRows rows={rangeRows} />
            </div>
          </RuleCard>

          <RuleCard eyebrow="Violence" id="combat" title="Combat">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Turn structure</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Draw initiative cards randomly. Each character acts once per speed. Many aliens act twice.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Actions</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Take 1 full action + 1 half action, or take 2 half actions. Targets may have interrupt actions:
                  Defend against close combat or Dodge against ranged combat.
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Damage</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Apply weapon damage and extra success effects, subtract armor, then reduce Health by remaining damage.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold">Ranged combat modifiers</h3>
              <DataRows rows={rangedModifiers} />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Ammo and reloads</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  After a ranged attack, reload if the weapon is single shot. Otherwise make a supply roll and reload as
                  a quick action if the roll fails.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Full auto</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Make up to three attacks. If all hit, add Stress +1 for every attack after the first. Aiming only
                  affects the first attack. Watch for friendly fire.
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Close combat</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Aim for a weak spot at -2 dice to reduce armor by 1 on a hit. Defend with an opposed Close Combat roll.
                Special attacks can disarm an opponent, take an item, pass an enemy, or create positional advantage.
              </p>
            </div>
          </RuleCard>

          <RuleCard eyebrow="Injury" id="health" title="Health and Critical Injuries">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Recovery</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Regain 1 Health per stretch in a safe area if not fatigued.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Broken at 0 Health</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  A broken character is down to one move action per round. The next useful choice is First Aid, Rally,
                  or being On Your Own.
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Critical injury flow</h3>
              <ol className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                <li>1. Roll D6 for the critical injury.</li>
                <li>2. If non-lethal, the character remains broken until treated or recovered.</li>
                <li>3. If lethal, make a death roll with Stamina.</li>
                <li>4. Success means the character lingers on. Failure means death.</li>
              </ol>
            </div>
          </RuleCard>

          <RuleCard eyebrow="Pressure" id="stress-panic" title="Stress and Panic">
            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Panic roll formula</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Roll <strong>D6 + Stress Level - Resolve</strong>. Panic can be instant or last for one stretch,
                depending on the result and the response.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold">Stress increases when...</h3>
                <CheckList items={stressTriggers} />
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Make a panic roll when...</h3>
                <CheckList items={panicTriggers} />
              </div>
            </div>
          </RuleCard>

          <RuleCard eyebrow="Play aid" id="gm-flow" title="GM Flow for Hidden Threats">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Searching and guard</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Searching a zone usually calls for Observation. Keeping guard gives +2 dice to Observation when the
                  guarded danger appears.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                <h3 className="font-semibold">Enemy contact</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use opposed Observation when stealth matters. On a win, decide whether the scene is a surprise,
                  ambush, reveal, hide, or pull back.
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-background p-4">
              <h3 className="font-semibold">Surprise and ambush</h3>
              <ul className="mt-2 grid gap-2 text-sm leading-6 text-muted-foreground">
                <li>Surprise: attacker chooses low initiative cards. The target cannot Defend or Dodge.</li>
                <li>
                  Ambush: attacker gets low initiative cards and +2 dice on the first attack. The target cannot Defend
                  or Dodge.
                </li>
                <li>Reveal: put the threat in sight and move to normal initiative.</li>
                <li>Hide: keep the threat concealed and require active searching to locate it.</li>
                <li>Pull back: remove the threat from immediate contact and keep pressure on the clock.</li>
              </ul>
            </div>
          </RuleCard>
        </div>
      </div>
    </main>
  )
}
