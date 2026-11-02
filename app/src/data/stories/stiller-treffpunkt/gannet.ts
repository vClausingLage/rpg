import type { Ship } from '../types'

/**
 * WY-Bergungsschiff "Gannet" (WY-SALV-0417): kleines Bergungs-/Bergbauschiff, 2 Decks.
 * Die Crew (6: Kapitän, Pilotin, Ingenieur, 2 Roughnecks, Wissenschaftler) ist bereits im Hive.
 * Unbekannt für die Spieler -> alle Räume beginnen verborgen und werden Schritt für Schritt aufgedeckt.
 */
export const gannet: Ship = {
  id: 'gannet',
  name: 'WY-Bergungsschiff „Gannet“ (WY-SALV-0417)',
  type: 'Kleines Bergungsschiff, Klasse S-Salvage',
  unknown: true,
  summary:
    'Zwei Decks, vollgepackt mit Bergungsausrüstung. Die Crew ist tot oder im Hive. Fracht: ein Fund von der Wüstenwelt – ein Ovomorph-Nest samt Brut, eingefroren im Frachtraum und seit dem Ausfall der Kühlung aktiv. Entfaltung des Plans: Raum für Raum, von der Andockschleuse aus.',
  decks: [
    { id: '1', name: 'Deck 1 – Wohn- & Kommandodeck', width: 24, height: 11 },
    { id: '2', name: 'Deck 2 – Fracht & Technik (Hive)', width: 24, height: 11 },
  ],
  rooms: [
    // ---------- DECK 1 ----------
    {
      id: 'dock', name: 'Andockschleuse', deck: '1', kind: 'airlock', zones: 1, step: 1,
      rect: { x: 0, y: 4, w: 4, h: 4 }, exits: ['hall1'],
      players: 'Kleine Doppelschleuse. Das Andockmodul zeigt an: „Verbindung bereit.“ Hinter dem inneren Schott ist nur das Brummen der Umwälzpumpen zu hören.',
      gm: 'Wenn der PILOT-Wurf misslang: Modul beschädigt, Schleuse ohne Druck → EVA-Zugang nötig. Verschmutzung: Säure-Fleck am Boden (Hinweis!). Wärmesensor am Schott zeigt 2 °C über Umgebung – Lebenszeichen? Nein, Kühlung ausgefallen.',
    },
    {
      id: 'hall1', name: 'Hauptgang 1', deck: '1', kind: 'corridor', zones: 3, step: 2,
      rect: { x: 4, y: 5, w: 12, h: 2 }, exits: ['dock', 'mess', 'quarters', 'med', 'lab', 'ladder1', 'bridge'],
      players: 'Notbeleuchtung, flackerndes Rot. Handabdrücke an der Wand, Kratzspuren am Boden.',
      gm: 'Die Crew war hier in Panik: Tür zum Gang notdürftig mit Möbeln verbarrikadiert. Bewegungsmelder hat Bewegung in den Schächten (Bewegungsmelder-Hinweis).',
    },
    {
      id: 'mess', name: 'Messe', deck: '1', kind: 'quarters', zones: 2, step: 3,
      rect: { x: 4, y: 7, w: 6, h: 4 }, exits: ['hall1'],
      players: 'Umgekippte Stühle, verschüttetes Essen. Auf dem Tisch ein Tablet mit einem unterbrochenen Videotagebuch.',
      gm: 'Tablet: Logeintrag des Wissenschaftlers: „Die Proben sind nicht tot. Sie reagieren auf Wärme.“ Hinweis auf Ovomorphe.',
    },
    {
      id: 'quarters', name: 'Mannschaftsquartiere', deck: '1', kind: 'quarters', zones: 2, step: 4,
      rect: { x: 10, y: 7, w: 4, h: 4 }, exits: ['hall1'],
      players: 'Sechs Kojen, drei zerwühlt. Ein Spind steht offen.',
      gm: 'Kojen zeigen: 2 Leute schliefen noch, als es anfing. In einem Spind: Notfallchip + Karte mit Markierung „Fundstelle ALPHA“ (Wüstenplanet).',
    },
    {
      id: 'med', name: 'Krankenstation', deck: '1', kind: 'medical', zones: 2, step: 5,
      rect: { x: 4, y: 1, w: 5, h: 4 }, exits: ['hall1', 'lab'],
      players: 'Operationsliege mit Schnallen, Sauerstoffmasken, zersplitterte Fläschchen.',
      gm: 'Auf der Liege: ein toter Roughneck mit einem aufgebrochenen Brustkorb (Chestburster). MEDIZIN-Wurf: Muster erkennbar. Stress +1 bei Anblick. Medikamente: 2 Stimulanzien, 1 Medkit.',
    },
    {
      id: 'lab', name: 'Probenlabor', deck: '1', kind: 'tech', zones: 2, step: 6,
      rect: { x: 9, y: 1, w: 7, h: 4 }, exits: ['hall1', 'med'],
      players: 'Gläserne Kammern, Scanner, eine geöffnete Probenbox.',
      gm: 'Scanner enthält Bilder der Eier und eine Karte, wo im Frachtraum sie liegen. Wichtigster Hinweis für Merle: Hier steht auch, wie sehr WY an der Probe interessiert ist.',
    },
    {
      id: 'bridge', name: 'Brücke', deck: '1', kind: 'bridge', zones: 2, step: 7,
      rect: { x: 16, y: 3, w: 6, h: 6 }, exits: ['hall1', 'pod'],
      players: 'Drei Sitze, ein Hauptschirm, Alarmleuchten. Auf dem Pult klebt getrocknetes Blut.',
      gm: 'Hier ist das Logbuch der Gannet. Es erklärt, wie das Schiff den Eisfund barg, dann der Ausfall der Kühlung. Der Kapitän wurde von einer Drohne durch den Lüftungsschacht gezogen. Autopilot im Standby; Ladungsmanifest gesperrt (WY-Code, Merle kann entsperren).',
    },
    {
      id: 'pod', name: 'Rettungskapsel', deck: '1', kind: 'airlock', zones: 1, step: 8,
      rect: { x: 22, y: 3, w: 2, h: 4 }, exits: ['bridge'],
      players: 'Eine einzelne Kapsel, die Luke steht offen.',
      gm: 'Leer. Kann den Rückweg sichern (Platz für zwei). Der Start schaltet die Gannet in den Notbetrieb.',
    },
    {
      id: 'ladder1', name: 'Leiter nach unten', deck: '1', kind: 'ladder', zones: 1, step: 9, noWheelchair: true,
      rect: { x: 14, y: 7, w: 2, h: 2 }, exits: ['hall1'],
      players: 'Eine Leiter ins Dunkel.',
      gm: 'Elena: Rollstuhl zurücklassen. Unten hängt ein Pfad aus klebrigem Harz an den Wänden.',
    },
    // ---------- DECK 2 ----------
    {
      id: 'hall2', name: 'Gang 2', deck: '2', kind: 'corridor', zones: 3, step: 10,
      rect: { x: 4, y: 5, w: 12, h: 2 }, exits: ['cargo', 'eva', 'workshop', 'ladder2', 'engine'],
      players: 'Der Boden ist klebrig. Die Wände wirken „gewachsen“ – harziger, dunkler Belag zieht sich durch den Gang.',
      gm: 'Hive-Zone. Bewegungsmelder schlägt hier ständig an. Kaltes Licht, Nebel aus verdampfender Kühlflüssigkeit.',
    },
    {
      id: 'cargo', name: 'Frachtraum (Nest)', deck: '2', kind: 'hive', zones: 5, step: 11,
      rect: { x: 2, y: 0, w: 14, h: 5 }, exits: ['hall2'],
      players: 'Ein riesiger, kühler Raum. Zwischen zerfetzten Containern wächst ein organisches Geflecht, in dessen Mitte eine Kammer voller ledriger Eier steht.',
      gm: 'Das Nest. 6–8 Ovomorphe, eine ausgewachsene Königin ist optional (Szenario-Option). Wenn die Spieler Eier mitnehmen wollen (Merle!): Facehugger-Attacke. Brutstätte = Ziel der WY-Direktive („Probe sichern um jeden Preis“).',
    },
    {
      id: 'eva', name: 'EVA- & Bergungsbucht', deck: '2', kind: 'storage', zones: 3, step: 12,
      rect: { x: 4, y: 7, w: 6, h: 4 }, exits: ['hall2'],
      players: 'Sechs Raumanzüge, Greifarme, Harpunen.',
      gm: 'Fundort für Ausrüstung: ASSO-400 Harpunenkanone, Schneidbrenner, 2 Druckanzüge. Gut für Spieler die über EVA zurück zur Kestrel müssen.',
    },
    {
      id: 'workshop', name: 'Werkstatt', deck: '2', kind: 'tech', zones: 2, step: 13,
      rect: { x: 10, y: 7, w: 4, h: 4 }, exits: ['hall2'],
      players: 'Werkbank, Ersatzteile, eine Luke im Boden.',
      gm: 'Lea: Hier kann sie Waffen improvisieren (Flammenwerfer-Umbau) oder die Kühlung reparieren.',
    },
    {
      id: 'engine', name: 'Maschinenraum', deck: '2', kind: 'engine', zones: 3, step: 14,
      rect: { x: 16, y: 0, w: 6, h: 5 }, exits: ['hall2', 'reactor'],
      players: 'Triebwerksgehäuse, Wärmetauscher, brummende Aggregate.',
      gm: 'Kühlung ausgefallen. Reparatur = HEAVY MACHINERY (−2). Zeit: 30 Minuten.',
    },
    {
      id: 'reactor', name: 'Reaktorraum', deck: '2', kind: 'engine', zones: 2, step: 15,
      rect: { x: 16, y: 5, w: 6, h: 5 }, exits: ['engine'],
      players: 'Ein kompakter Reaktor, Warnleuchte „Selbstzerstörung bereit“.',
      gm: 'Selbstzerstörung: Command-Wurf + Autorisierungscode. Bietet Ausweg am Ende („Brennen lassen“). Countdown 10 Minuten.',
    },
    {
      id: 'ladder2', name: 'Leiter nach oben', deck: '2', kind: 'ladder', zones: 1, step: 10, noWheelchair: true,
      rect: { x: 14, y: 7, w: 2, h: 2 }, exits: ['hall2'],
      players: 'Leiter nach oben.', gm: 'Verbindet mit Deck 1.',
    },
  ],
  vents: [
    { id: 'v1a', deck: '1', points: [[6, 3], [12, 3], [18, 3]], connects: ['med', 'lab', 'bridge'], note: 'Nordkanal. Eingang für Drohnen in Brücke und Labor.' },
    { id: 'v1b', deck: '1', points: [[6, 9], [12, 9], [15, 8]], connects: ['mess', 'quarters', 'ladder1'], note: 'Südkanal zum Leiterschacht.' },
    { id: 'v2a', deck: '2', points: [[4, 3], [10, 3], [14, 3], [19, 3]], connects: ['cargo', 'engine'], note: 'Direkter Weg Nest → Maschinenraum.' },
    { id: 'v2b', deck: '2', points: [[7, 9], [12, 9], [15, 8]], connects: ['eva', 'workshop'], note: 'Südkanal zum Leiterschacht.' },
  ],
  shafts: [
    { id: 'S1', name: 'Hauptschacht', deck: '1', x: 15, y: 8, decks: ['1', '2'], note: 'Verbindet Nest und Wohndeck. Nur kriechen.' },
  ],
}
