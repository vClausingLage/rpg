import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type Row = { label: string; value: ReactNode }
type TableProps = { head: string[]; rows: ReactNode[][]; wide?: boolean }

export const metadata: Metadata = {
  title: 'Alien RPG Quick Rules',
  description: 'Short play-aid for the Alien RPG Starter Set: rolls, stealth, combat, damage, stress and panic.',
}

const sections = [
  { id: 'roll', label: 'Skill Roll' },
  { id: 'panic', label: 'Panic' },
  { id: 'stealth', label: 'Stealth' },
  { id: 'combat', label: 'Combat' },
  { id: 'ranged', label: 'Ranged' },
  { id: 'damage', label: 'Damage' },
  { id: 'hazards', label: 'Hazards' },
  { id: 'gear', label: 'Gear' },
]

const panicTable: ReactNode[][] = [
  ['≤0', 'Keeping Cool', 'No effect.'],
  ['1', 'Spooked', 'Stress +1.'],
  ['2', 'Noisy', 'Enemies nearby (GM) are alerted to you.'],
  ['3', 'Twitchy', 'Immediate supply roll for air, ammo or power (GM).'],
  ['4', 'Lose Item', 'Lose a weapon or important item. Combat: pick up with a quick action. Else OBSERVATION + a stretch to find it.'],
  ['5', 'Paranoid', 'Cannot give or receive help on skill rolls until panic ends.'],
  ['6', 'Hesitant', 'Automatically get initiative card #10 until panic stops.'],
  ['7', 'Freeze', 'Lose next turn, no interrupt actions before then.'],
  ['8', 'Seek Cover', 'Interrupt: take full cover in a cluttered zone, stress −1, lose next turn. In an open zone: Scream instead.'],
  ['9', 'Scream', 'Lose next turn, no interrupts. Stress −1. Every friendly PC in the zone makes a panic roll.'],
  ['10', 'Flee', 'Interrupt: move to an adjacent zone away from the source, stress −1, friends in the old zone gain stress +1. Keep fleeing with all actions. Cannot flee: Catatonic.'],
  ['11', 'Frenzy', 'Attack the nearest person or creature, friend or foe. Friendly PCs in the zone make a panic roll. Lasts until the target is broken or panic stops.'],
  ['12+', 'Catatonic', 'You collapse and cannot move until panic stops.'],
]

const stressResponseTable: ReactNode[][] = [
  ['≤0', 'Keeping Cool', 'No effect.'],
  ['1', 'Jumpy', 'When you push a skill roll, gain +2 stress instead of +1.'],
  ['2', 'Tunnel Vision', 'WITS skill rolls −2 dice.'],
  ['3', 'Aggravated', 'EMPATHY skill rolls −2 dice.'],
  ['4', 'Shakes', 'AGILITY skill rolls −2 dice.'],
  ['5', 'Frantic', 'STRENGTH skill rolls −2 dice.'],
  ['6', 'Deflated', 'Cannot push rolls. If Jumpy, remove it and ignore further Jumpy.'],
  ['7+', 'Mess Up', 'Action fails regardless of successes and you gain stress +1.'],
]

const critTable: ReactNode[][] = [
  ['1', 'Focused', 'No', 'Relieve all stress.', '–'],
  ['2', 'Intense Pain', 'No', 'Stress +1.', '–'],
  ['3', 'Wounded', 'No', 'Movement in combat is a full action for D6 days.', '–'],
  ['4', 'Bleeding Out', 'Yes', 'Also Wounded.', 'Shift'],
  ['5', 'Dying', 'Yes', 'Also Wounded.', 'Stretch'],
  ['6', 'Last Breath', 'Yes', 'Also Wounded.', 'Round'],
]

const androidTable: ReactNode[][] = [
  ['1', 'Ruptured Fluid Pump', 'Lose next turn, no interrupts until then.'],
  ['2', 'Destroyed Leg Servos', 'Movement becomes a full action.'],
  ['3', 'Destroyed Arm Servos', 'One arm non-functional, one-handed gear only.'],
  ['4', 'Head Dislocation', 'All quick actions become full actions.'],
  ['5', 'Severe Chassis Breach', 'Completely immobilized.'],
  ['6', 'System Shutdown', 'Shredded beyond repair, but keeps operating. A COMTECH roll is needed to communicate.'],
]

const fullActions: ReactNode[][] = [
  ['Close combat attack', 'CLOSE COMBAT'],
  ['Ranged attack', 'RANGED COMBAT'],
  ['Jump or climb', 'MOBILITY'],
  ['Take full cover', '–'],
  ['Use a terminal', 'COMTECH'],
  ['Use machinery', 'HEAVY MACHINERY'],
  ['Give first aid', 'MEDICAL AID'],
  ['Persuade someone', 'MANIPULATION'],
  ['Give orders', 'COMMAND'],
  ['Drive a vehicle', 'PILOTING'],
]

const quickActions = [
  'Move to an adjacent zone',
  'Move between Short and Adjacent range',
  'Move to a door or hatch and peek through',
  'Lock a door or hatch',
  'Take partial cover',
  'Defend (interrupt)',
  'Aim a ranged attack',
  'Dodge (interrupt)',
  'Reload a weapon',
  'Pick up an item',
  'Rally a broken character',
]

const rangedMods: ReactNode[][] = [
  ['Careful aim', '+2'],
  ['Below minimum range', '−2 per band'],
  ['Target in partial cover', '−2'],
  ['Target in full cover', '−3'],
  ['Aim for weak spot', '−2 (armor −1 on hit)'],
  ['Large target', '+2'],
  ['Small target', '−2'],
]

const weapons: ReactNode[][] = [
  ['M4A3 Service Pistol', '+2', '2', 'A/M', '2', '½', ''],
  ['.357 Magnum Revolver', '+1', '3', 'S/M', '1', '1', ''],
  ['Watatsumi DV-303 Bolt Gun', '−1', '3', 'A/S', 'Single-shot', '1', 'Armor piercing'],
  ['Armat M41A Pulse Rifle', '+2', '2', 'S/L', '3', '1', 'Armor piercing, full auto, grenade launcher'],
  ['Armat 37A2 12 Gauge Pump', '+2', '3', 'A/S', '1', '1', ''],
  ['M240 Incinerator Unit', '+1', '2', 'S/S', '2', '1', 'Fire'],
  ['M40 HEDP Hand Grenade', '–', '2E', 'S/M', 'Single use', '¼', 'Explosive'],
  ['Seismic Survey Charge', '–', '3E', 'S/M', 'Single use', '1', 'Explosive'],
  ['Unarmed Attack', '–', '1', 'A', '–', '–', ''],
  ['Blunt Instrument', '+1', '1', 'A', '–', '1', ''],
  ['Combat Knife', '+1', '2', 'A', '–', '½', ''],
  ['Fire Axe', '–', '2', 'A', '–', '1', 'Armor piercing'],
  ['Cutting Torch', '−1', '3', 'A', '3', '1', 'Armor piercing'],
]

const equipment: ReactNode[][] = [
  ['Computer terminal', 'N/A', 'COMTECH roll to access and process data'],
  ['Seegson C-Series Tape Recorder', '1', 'Record and play music (MANIPULATION +1)'],
  ['Comm Unit', '–', 'Remote team communication'],
  ['Personal Data Transmitter', '–', 'Location and vitals (MEDICAL AID +1)'],
  ['Seegson P-DAT', '½', 'Coordinates field teams (COMMAND +1)'],
  ['Flashlight (Short)', '½', 'Removes darkness effects in a zone'],
  ['M314 Motion Tracker (Long, power 5)', '1', 'Detects motion in stealth mode'],
  ['Watatsumi DV-303 Bolt Gun (tool)', '1', 'Ship repairs (HEAVY MACHINERY +2)'],
  ['Mechanical Cutting Torch (power 3)', '1', 'Construction and repairs (HEAVY MACHINERY +2)'],
  ['Maintenance Jack', '1', 'HEAVY MACHINERY +1 die'],
  ['Power Cell', '¼', 'Restores full power to one item'],
  ['Personal Medkit', '¼', 'MEDICAL AID +2 for first aid (single use)'],
  ['Surgical Kit', '1', 'MEDICAL AID +2 for first aid and surgery. Base damage 2 as weapon'],
  ['Pauling MedPod', 'N/A', 'First aid and surgery at MEDICAL AID level 10'],
]

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'bad' | 'good' | 'neutral' }) {
  const tones = {
    bad: 'border-red-500/60 bg-red-500/10 text-red-700 dark:text-red-200',
    good: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    neutral: 'border-border bg-card text-foreground',
  }
  return (
    <span
      className={`inline-flex min-h-7 min-w-7 items-center justify-center rounded-md border px-2 font-mono text-sm font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

function Card({ children, id, title, eyebrow }: { children: ReactNode; id: string; title: string; eyebrow?: string }) {
  return (
    <section className="scroll-mt-20 rounded-lg border border-border bg-card/70 p-5 shadow-sm md:p-6" id={id}>
      {eyebrow ? (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-6 text-foreground/90">{children}</div>
    </section>
  )
}

function Box({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      {title ? <h3 className="font-semibold">{title}</h3> : null}
      <div className={`text-muted-foreground ${title ? 'mt-1' : ''}`}>{children}</div>
    </div>
  )
}

function Rows({ rows }: { rows: Row[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div className="rounded-md border border-border bg-background p-3" key={row.label}>
          <dt className="font-semibold text-foreground">{row.label}</dt>
          <dd className="mt-1 text-muted-foreground">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Table({ head, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-background">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead className="bg-card text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th className="px-3 py-2 font-semibold" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr className="border-t border-border align-top" key={i}>
              {row.map((cell, j) => (
                <td className={`px-3 py-2 ${j === 0 ? 'whitespace-nowrap font-mono font-semibold' : j === 1 ? 'font-semibold' : 'text-muted-foreground'}`} key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((item, i) => (
        <li className="flex gap-2" key={i}>
          <span aria-hidden className="text-muted-foreground">
            ▸
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function RulesPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="border-b border-border bg-card/40">
        <div className="container py-8 md:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Hope&apos;s Last Day · Play aid
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-normal md:text-5xl">Alien RPG Quick Rules</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Condensed from the Starter Set rulebook. Tap a section to jump to it.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Badge tone="good">6</Badge> success (base or stress die)
            </span>
            <span className="flex items-center gap-2">
              <Badge tone="bad">1</Badge> on a stress die: stress response
            </span>
          </div>
        </div>
      </div>

      <nav
        aria-label="Rules sections"
        className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur"
      >
        <div className="container flex gap-2 overflow-x-auto py-2">
          {sections.map((s) => (
            <a
              className="shrink-0 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              href={`#${s.id}`}
              key={s.id}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container space-y-6 py-8">
        <Card eyebrow="Core" id="roll" title="Skill Roll">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['1', 'Base dice = Attribute + Skill (no skill: attribute only).'],
              ['2', 'Add gear and help (+1 each, up to 3 helpers). Modifiers never go below 1 base die.'],
              ['3', 'Add stress dice = your stress level.'],
              ['4', 'Roll. One 6 = success. More 6s = better result (+1 damage each in combat).'],
            ].map(([n, text]) => (
              <li className="flex gap-3 rounded-md border border-border bg-background p-3" key={n}>
                <Badge>{n}</Badge>
                <span className="text-muted-foreground">{text}</span>
              </li>
            ))}
          </ol>

          <div className="grid gap-3 md:grid-cols-3">
            <Box title="Push (once)">
              Failed or want more 6s, and no 1 on a stress die: stress +1, add one stress die, re-roll all dice not
              showing 6.
            </Box>
            <Box title="Story point (max 3)">
              Adds one automatic 6 on a base die, before or after pushing. Earned via personal agenda.
            </Box>
            <Box title="Stress die shows 1">
              Stress response: D6 + stress − Resolve, see the table below. Cannot push.
            </Box>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Passive roll">
              Called by the GM for things you are unaware of (usually OBSERVATION). Cannot be pushed, no stress
              response. Stress dice still added.
            </Box>
            <Box title="Opposed roll">
              Roll more 6s than the opponent. Pushing is allowed, even for the target. NPCs never push and have no
              stress dice. Tie with no clear active side: break randomly.
            </Box>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Derived values">
              Health = (Strength + Agility) / 2, Resolve = (Wits + Empathy) / 2, both rounded up.
            </Box>
            <Box title="Other dice">
              D3 = D6 / 2 rounded up. 2D6 = sum. D66 = two D6, first is tens, second is ones (11 to 66).
            </Box>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Stress response (a stress die showed 1)</h3>
            <Table head={['Result', 'Response', 'Effect']} rows={stressResponseTable} />
            <p className="mt-2 text-muted-foreground">
              Repeat of a response you already have: stress +1 instead. Removed by relieving stress.
            </p>
          </div>
        </Card>

        <Card eyebrow="Pressure" id="panic" title="Stress and Panic">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Stress +1 when you...">
              <Bullets
                items={[
                  'push a roll',
                  'a nearby PC suffers a stress or panic response, or an NPC panics',
                  'make a 2nd or 3rd attack in a full auto burst',
                  'become fatigued',
                  'are attacked by your own crew',
                  'face an unnerving encounter (GM)',
                  'are over-encumbered: +1 per step moved (stretch / round)',
                ]}
              />
            </Box>
            <Box title="Panic roll when...">
              <Bullets
                items={[
                  'another PC becomes broken',
                  'you see a Xenomorph for the first time',
                  'a Xenomorph comes Adjacent, even if seen before',
                  'another PC suffers certain panic responses',
                  'a truly horrifying event (GM)',
                ]}
              />
            </Box>
          </div>

          <p className="rounded-md border border-border bg-background p-3 font-mono text-sm font-semibold">
            Panic roll = D6 + stress level − Resolve
          </p>
          <Table head={['Result', 'Panic', 'Effect']} rows={panicTable} />

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="More panic">
              Both responses apply. If they cannot combine, the higher wins. Same response again: use the next higher
              one on the table.
            </Box>
            <Box title="Stopping panic">
              Ends when another character in speaking range makes a COMMAND roll (full action), you are broken, or one
              stretch passes.
            </Box>
          </div>
          <Box title="Relieving stress">
            Each stretch resting in a safe area: stress −1 and remove one stress response of your choice per level
            reduced. No skill rolls during rest. Interrupted rest does not count.
          </Box>
        </Card>

        <Card eyebrow="Map and time" id="stealth" title="Space, Time and Stealth">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Range bands">
              <Bullets
                items={[
                  <span key="a"><strong>Adjacent (A)</strong>: in your face.</span>,
                  <span key="s"><strong>Short (S)</strong>: same zone.</span>,
                  <span key="m"><strong>Medium (M)</strong>: adjacent zone.</span>,
                  <span key="l"><strong>Long (L)</strong>: up to 4 zones away.</span>,
                  <span key="e"><strong>Extreme (E)</strong>: farther away.</span>,
                ]}
              />
            </Box>
            <Box title="Time">
              <Bullets
                items={[
                  <span key="r"><strong>Round</strong>: 5-10 seconds. Combat.</span>,
                  <span key="s"><strong>Stretch</strong>: 5-10 minutes. Stealth.</span>,
                  <span key="h"><strong>Shift</strong>: 5-10 hours. Repairs.</span>,
                ]}
              />
            </Box>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Zones">
              <strong>Cluttered</strong>: can hide or take cover. <strong>Open</strong>: cannot. Everyone in a zone
              sees each other except hiding or full-cover characters, and narrow crawlspaces. Open borders do not block
              sight. A blocked border blocks sight unless a door or hatch is open or someone peeks through it.
            </Box>
            <Box title="Darkness">
              Dim zones: OBSERVATION −2 dice for humans and androids. Xenomorphs are unaffected. A flashlight removes
              it.
            </Box>
          </div>

          <Box title="Stealth sequence (each stretch)">
            <ol className="grid gap-1.5">
              <li>
                <strong>1. PCs move one zone</strong> (individually or as a group), then scan. In line of sight of an
                NPC: passive open opposed OBSERVATION roll (best roll per group).
              </li>
              <li>
                <strong>Winner</strong> may: reveal themselves, ambush, hide in the zone, or back out the way they
                came. <strong>Tie</strong>: both spot each other, draw initiative.
              </li>
              <li>
                <strong>2. NPCs move</strong> on the GM&apos;s hidden map, one zone per point of Speed (Xenomorphs),
                same detection roll.
              </li>
              <li>
                <strong>3. New stretch</strong>: PCs act first, then NPCs.
              </li>
            </ol>
          </Box>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Hiding">
              Only in a cluttered zone. Takes a stretch, so no moving or searching in it, except for free right after
              winning a detection roll. Items can be hidden too. While hidden, no opposed rolls are made against you:
              enemies must search the zone for a stretch (OBSERVATION, retry each stretch). If found, draw initiative.
            </Box>
            <Box title="Keeping guard">
              Stay still for a stretch doing nothing else: +2 dice to OBSERVATION to spot anything coming into sight.
            </Box>
            <Box title="Searching a zone">
              May need several stretches (or a shift). Several searchers: separate rolls, or one rolls and the others
              help.
            </Box>
            <Box title="Taking action while an NPC is in sight">
              Moving out, interacting or ambushing: opposed OBSERVATION roll against all enemies in line of sight.
            </Box>
            <Box title="Motion tracker (M314)">
              Once per stretch, with a power supply roll before it gives info. Detects every NPC within 4 zones, even
              out of sight, but only those that moved in the previous stretch. Mark pings with tokens. A ping is not a
              sighting.
            </Box>
            <Box title="Crawlspaces">
              Enter at access points (one zone of movement). Cannot pass other characters in a crawlspace zone. Seal
              an access point with a cutting torch.
            </Box>
          </div>

          <Box title="Starting a fight / social mode">
            Spotting an NPC (or being spotted) ends stealth: draw initiative, even if the NPC is not obviously hostile.
            Social mode (talking, resting, tasks over a stretch): stealth stops, the GM estimates elapsed stretches and
            moves NPCs. Stealth restarts when you move again.
          </Box>
        </Card>

        <Card eyebrow="Violence" id="combat" title="Combat and Close Combat">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Initiative">
              Cards 1-10. Each player draws one at the start of every round, the GM draws for NPCs. Lowest number acts
              first. Xenomorphs draw one card per point of Speed. The GM may draw one card for a whole NPC group.
            </Box>
            <Box title="Holding off">
              On your turn, swap cards with a PC or NPC whose turn comes later. They cannot refuse and act immediately.
              Spent quick actions still count. Xenomorphs rarely hold off.
            </Box>
            <Box title="Surprise">
              Attacker gets card #1 in round one, others draw from the rest. Several attackers: lowest cards, free
              distribution.
            </Box>
            <Box title="Ambush">
              Surprise attack on an unaware opponent: lowest initiative cards, <strong>+2 dice</strong>, target cannot
              defend or dodge.
            </Box>
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <h3 className="mb-2 font-semibold">Each round: 1 full action + 1 quick action, or 2 quick actions</h3>
              <Table head={['Full action', 'Skill']} rows={fullActions} />
            </div>
            <div className="space-y-3">
              <Box title="Quick actions">
                <Bullets items={quickActions} />
              </Box>
              <Box>
                Quick actions can be saved for interrupts (defend, dodge) during the round. Two quick actions mean no
                full action. Nothing carries over to the next round. Tip: rotate and flip your initiative card to track
                actions.
              </Box>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Moving">
              One quick action: into an adjacent zone, to a door to peek, or between Short and Adjacent. Unlocked
              doors can be passed for free. Locking is a quick action. Breaking a door: close combat attack at +2
              (typical door armor 2, takes 10 damage). Electronic locks: COMTECH (full action).
            </Box>
            <Box title="Blocking, dragging, leaving">
              Block a character from passing (they must take you out or Pass). Drag a broken person: both Adjacent,
              STAMINA roll. Leave combat by moving out of sight: opponents roll OBSERVATION to find you, else combat is
              over.
            </Box>
            <Box title="Giving orders">
              Full action COMMAND. Each 6 gives the target +1 die on one roll later this round to carry out the order.
            </Box>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Close combat attack (Adjacent range, full action)">
              State target, weapons and special attack. Target may Defend (quick action, interrupt): opposed CLOSE
              COMBAT, each defender 6 cancels one attacker 6. Any 6 left = hit. Damage = weapon damage + 1 per extra
              6. Unarmed damage 1.
            </Box>
            <Box title="Special attacks (no damage, no weapon bonus)">
              <Bullets
                items={[
                  <span key="d"><strong>Disarm</strong>: take the item or throw it to an adjacent zone.</span>,
                  <span key="p"><strong>Pass</strong>: move past a blocker.</span>,
                  <span key="s"><strong>Shove</strong>: push target to Short range.</span>,
                  <span key="g"><strong>Grapple</strong>: opposed (MOBILITY for Xenomorphs). Target cannot move or act except to break free. Cannot be defended against.</span>,
                ]}
              />
            </Box>
            <Box title="Modifiers">
              Weak spot on armored target: −2 dice, armor −1 on a hit. Restrained or unaware opponent: cannot defend,
              +2 dice. Firearm in close combat: roll CLOSE COMBAT, usually −2 or more (minimum range).
            </Box>
          </div>
        </Card>

        <Card eyebrow="Violence" id="ranged" title="Ranged Combat">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Modifiers</h3>
              <Table head={['Factor', 'Mod']} rows={rangedMods} />
            </div>
            <div className="space-y-3">
              <Box title="Attack (full action, Short range or more, line of sight)">
                Roll RANGED COMBAT. Target may Dodge (quick action, interrupt): opposed RANGED COMBAT vs MOBILITY,
                each dodge 6 cancels one attacker 6. Hit = weapon damage + 1 per extra 6. Then make an ammo supply
                roll (not for single-shot weapons).
              </Box>
              <Box title="Range">
                Closer than minimum range: −2 dice per band below it. Cannot fire beyond maximum range, except Short-max
                weapons fired into an adjacent zone from right next to a door or hatch.
              </Box>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Cover">
              Only in cluttered zones, except by a door or hatch, which covers you from the adjacent zone.{' '}
              <strong>Partial</strong> (quick action): you can shoot, attackers get −2, you can dodge.{' '}
              <strong>Full</strong> (full action): breaks line of sight, shots still possible at −3 and must
              penetrate the barrier, no dodging. Cover armor applies first, then body armor.
            </Box>
            <Box title="Full auto">
              After a hit without pushing, roll again (max 3 attacks per burst, same or another target). Each attack
              after the first: stress +1. Ammo supply roll after each attack. Aim bonus only on the first attack.
            </Box>
            <Box title="Reload and ammo">
              Reload is a quick action. Track reloads on the sheet. Single-shot weapons: reload after each shot, no
              supply roll. NPCs: no supply rolls, ammo drops one step per attack.
            </Box>
            <Box title="Friendly fire">
              Missing a target Adjacent to another character: roll 2 base dice. One 6 = they take base damage, two 6s =
              +1 damage. Several targets: randomize.
            </Box>
          </div>
        </Card>

        <Card eyebrow="Injury" id="damage" title="Damage, Broken and Critical Injuries">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Damage">
              Damage − armor level = Health lost. Armor piercing: armor counts 1 lower (min 0). Weak spot: armor −1
              more. Barriers (furniture 1, inner bulkhead 2, outer bulkhead 3, armored bulkhead 4+): damage reduced by
              armor, 0 left = no breach. Breach limit: armor higher than the weapon&apos;s base damage cannot be breached.
            </Box>
            <Box title="Broken (Health 0)">
              One movement action per round, no other actions, no new stress, no panic rolls. Roll a critical injury
              immediately. More damage while broken = another critical injury.
            </Box>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Critical injury (D6, re-roll one you already have if #3 or higher)</h3>
            <Table head={['D6', 'Injury', 'Lethal', 'Effect', 'Time limit']} rows={critTable} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Death roll (lethal injuries)">
              After the time limit (Round: every turn, right before you act): STAMINA roll, no push, no stress dice.
              Fail = death. Three successes = stop rolling. Some Xenomorph attacks kill outright.
            </Box>
            <Box title="Getting up from broken">
              <Bullets
                items={[
                  <span key="f"><strong>First aid</strong> (Adjacent, full action, MEDICAL AID): stabilizes lethal injuries, +1 Health per 6 if broken. Failure: time limit drops one step (Round fail = death). Self-aid: −2 dice.</span>,
                  <span key="r"><strong>Rally</strong> (same zone, COMMAND, quick action): +1 Health per 6, no longer broken. Does nothing for critical injuries.</span>,
                  <span key="o"><strong>On your own</strong>: broken and alone, you rise after one stretch with 1 Health.</span>,
                ]}
              />
            </Box>
            <Box title="Recovery">
              +1 Health per stretch resting in a safe area if not fatigued. Wounded lasts until healed.
            </Box>
            <Box title="Broken NPCs">
              Same rules, but the GM decides outcomes instead of rolling. Minor NPCs who are broken simply die.
            </Box>
          </div>
        </Card>

        <Card eyebrow="Environment" id="hazards" title="Hazards and Synthetics">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Fatigue">
              No air, water, food or sleep, or exposure to extreme heat or cold: SURVIVAL rolls at regular intervals.
              Fail = fatigued (stress +1). Then: no Health recovery, SURVIVAL rolls continue, each failure = 1 damage
              and stress +1. Broken by fatigue: death rolls, no critical injury, only removing the cause helps.
            </Box>
            <Box title="Falling">
              Damage = height in meters / 2 (round down). Armor does not help. Controlled jump: MOBILITY, each 6
              reduces damage by 1.
            </Box>
            <Box title="Explosions">
              Normal ranged attack. On a hit, everyone else in the zone takes the same damage and may dodge separately.
              Secondary targets in partial cover count as in full cover. Contained space (hatch or door): +2 dice.
            </Box>
            <Box title="Fire">
              Intensity usually 6-9. Entering or starting a round in a burning zone: roll base dice equal to
              intensity, each 6 = 1 damage (armor applies). Broken by fire: death roll every round. Burning: another
              fire attack each round, stopped by an Adjacent friend with MOBILITY (full action).
            </Box>
          </div>

          <Box title="Fire at the start of each round (D6)">
            <strong>1-2</strong> goes out. <strong>3-4</strong> continues. <strong>5-6</strong> spreads to a random
            adjacent zone if the border is open and something there can burn.
          </Box>

          <div>
            <h3 className="mb-2 font-semibold">Synthetics (androids, e.g. Holroyd)</h3>
            <p className="mb-2 text-muted-foreground">
              Act like humans, roll normally, higher attributes. They cannot push, have no stress and no panic. At 0
              Health they roll on this table instead of a critical injury.
            </p>
            <Table head={['D6', 'Damage', 'Effect']} rows={androidTable} />
          </div>
        </Card>

        <Card eyebrow="Equipment" id="gear" title="Gear, Supply and Encumbrance">
          <div className="grid gap-3 md:grid-cols-2">
            <Box title="Encumbrance">
              Carry Strength × 2 weight without problems. One regular item = weight 1 = one sheet row. Light items
              count ½ or ¼. Tiny items do not count. Over-encumbered: up to Strength × 4, stress +1 per step moved in
              stealth (stretch) or combat (round).
            </Box>
            <Box title="Supply roll (ammo, power, air)">
              Roll stress dice equal to the current rating (max 6). Each 1 lowers the rating by one. At 0 it is empty.
              Air is not tracked in this set. NPC ratings simply drop one step per roll.
            </Box>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Weapons</h3>
            <Table head={['Weapon', 'Mod', 'Dmg', 'Range', 'Ammo', 'Wt', 'Special']} rows={weapons} />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Equipment</h3>
            <Table head={['Item', 'Wt', 'Effect']} rows={equipment} />
          </div>
        </Card>
      </div>
    </main>
  )
}
