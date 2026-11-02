import type { Ship } from '../types'

/**
 * USCSS Kestrel – Lockmart CM-88G "Bison" Frachter (Schwesterschiff von Nostromo/Montero, Klasse M).
 * Drei Decks wie bei der Nostromo: A (Brücke/Wohndeck), B (Technik/Fracht), C (Maschinendeck).
 * Der Fracht-Anhänger ist abgekoppelt (siehe Ship "kestrel-cargo").
 */
export const kestrel: Ship = {
  id: 'kestrel',
  name: 'USCSS Kestrel',
  type: 'Lockmart CM-88G „Bison“ – Frachter, Klasse M',
  summary:
    'Der Heimatfrachter der Crew. Drei Decks. Aufzug nur zwischen Deck A und B; Deck C nur über Leiter, Treppe/Schächte. Rollstuhl-tauglich sind Deck A und B (Aufzug), nicht Deck C und nicht die Schächte.',
  decks: [
    { id: 'A', name: 'Deck A – Brücke & Wohnbereich', width: 26, height: 11 },
    { id: 'B', name: 'Deck B – Technik & Laderaumzugang', width: 26, height: 11 },
    { id: 'C', name: 'Deck C – Maschinendeck', width: 26, height: 11 },
  ],
  rooms: [
    // ---------- DECK A ----------
    {
      id: 'bridge', name: 'Brücke / Cockpit', deck: 'A', kind: 'bridge', zones: 2, step: 3,
      rect: { x: 7, y: 0, w: 8, h: 4 }, exits: ['hall_a', 'muthur', 'captain'],
      players: 'Drei Pilotensitze, Navigationskonsole, Sternenkarte. Der Autopilot ist aktiv, das Display zeigt einen Kurs auf „WP-1 / Treffpunkt“. Elenas Pilotenplatz ist rollstuhlgerecht ausgespart.',
      gm: 'Navigation: Kurs vom Autopiloten gesetzt, vor Reiseantritt mit Priorität „WY-Direktive“ eingegeben (Merle). Captain kann Abbruch nur mit Autorisierungscode (hat Merle) oder per manuellem Override (COMTECH-Wurf, schwer −2; PILOT hilft). Positionssignal des Ziels: Standard-Transponder „WY-SALV-0417 GANNET“, keine Kommunikation. Hier startet der Countdown: Ankunft in ca. 9 Stunden.',
    },
    {
      id: 'muthur', name: 'MU/TH/UR-Kernraum', deck: 'A', kind: 'core', zones: 1, step: 2,
      rect: { x: 15, y: 0, w: 5, h: 4 }, exits: ['hall_a', 'bridge'],
      players: 'Kalt und still. Terminal mit grünem Phosphorschirm. „MU/TH/UR 6000 bereit. Bitte Eingabe.“',
      gm: 'MU/TH/UR bestätigt: Zwischenziel eingetragen vor Abflug, Quelle „Passagier-Agent M. – Firmenvorrang“. Details zur Mission sind für Rang < Agent gesperrt („ZUGRIFF VERWEIGERT“). Merle kann Teile freischalten, die Crew kann es mit COMTECH (−2) knacken. Ein Mitschnitt des Logs liefert die Position, aber keine Ladungsangabe.',
    },
    {
      id: 'captain', name: 'Kapitänskajüte', deck: 'A', kind: 'quarters', zones: 1, step: 6,
      rect: { x: 3, y: 0, w: 4, h: 4 }, exits: ['hall_a', 'bridge'],
      players: 'Eine enge Kabine, Bett, Spind, kleiner Safe.',
      gm: 'Im Safe: Autorisierungscode-Chip für Notfall-Override (Captain kennt die Kombination). Alte Frachtpapiere: Kestrel hat zwei Wartungsrückstände auf dem Maschinendeck.',
    },
    {
      id: 'hall_a', name: 'Hauptgang A', deck: 'A', kind: 'corridor', zones: 3, step: 1,
      rect: { x: 2, y: 4, w: 18, h: 2 }, exits: ['bridge', 'muthur', 'captain', 'cryo', 'quarters', 'galley', 'medbay', 'lift_a', 'ladder_a'],
      players: 'Gedämpftes Licht, Tropfen im Lüftungssystem, dumpfe Schritte.',
      gm: 'Der Gang verbindet alles auf Deck A. Gitterroste, Schwelle an Leiter und Brücke: Rollstuhl kommt durch (Schwellen sind Rampen).',
    },
    {
      id: 'ladder_a', name: 'Leiter / Treppe Deck A', deck: 'A', kind: 'ladder', zones: 1, step: 4, noWheelchair: true,
      rect: { x: 0, y: 4, w: 2, h: 2 }, exits: ['hall_a'],
      players: 'Eine steile Leiter in den Schacht nach unten.',
      gm: 'Elena kann nur ohne Rollstuhl (kriechen, ziehen: Mobility). Sie muss den Rollstuhl zurücklassen.',
    },
    {
      id: 'lift_a', name: 'Aufzug A', deck: 'A', kind: 'lift', zones: 1, step: 4,
      rect: { x: 20, y: 4, w: 2, h: 2 }, exits: ['hall_a'],
      players: 'Der Frachtaufzug fährt nur zwischen Deck A und B.',
      gm: 'Stromabhängig. Bei Stromausfall: Notkurbel (Stärke-Wurf) oder Schacht. Elena nutzt ihn – ein Alarm/Stromausfall nimmt ihr diese Option.',
    },
    {
      id: 'airlock', name: 'Hauptluftschleuse / Andockschlauch', deck: 'A', kind: 'airlock', zones: 1, step: 5,
      rect: { x: 22, y: 3, w: 4, h: 4 }, exits: ['hall_a', 'lift_a'],
      players: 'Schleuse mit Anzugspinden. Ein 10 m langer Andock-Durchgangsschlauch kann ausgefahren werden.',
      gm: 'PILOT-Wurf zum Andocken (siehe Skript): Erfolg = sauberer Schlauch. Misserfolg = Andockmodul des Fremdschiffs beschädigt → Zugang nur per EVA.',
    },
    {
      id: 'cryo', name: 'Kryokammer', deck: 'A', kind: 'quarters', zones: 2, step: 0,
      rect: { x: 2, y: 6, w: 6, h: 5 }, exits: ['hall_a', 'quarters'],
      players: 'Fünf Hyperschlafkapseln. Eis taut von den Deckeln, Pumpen zischen. Ihr erwacht.',
      gm: 'Start der Szene. Alle wachen gleichzeitig auf; Schlaf war kürzer als vorgesehen („Vorzeitiges Wecken durch Schiffssystem“, keine Notfall-Meldung). Aufwach-Stress +0, erste Würfe auf Stärke zum Aufstehen. Elena sitzt noch nicht im Rollstuhl – der steht neben ihrer Kapsel.',
    },
    {
      id: 'quarters', name: 'Mannschaftsquartiere', deck: 'A', kind: 'quarters', zones: 2, step: 7,
      rect: { x: 8, y: 6, w: 5, h: 5 }, exits: ['hall_a', 'cryo'],
      players: 'Fünf Kojen, persönliche Gegenstände, Poster.',
      gm: 'Hier lässt sich Persönliches/Hinweise zu Rivalitäten platzieren (z. B. Brief, Chip).',
    },
    {
      id: 'galley', name: 'Kombüse / Messe', deck: 'A', kind: 'quarters', zones: 2, step: 3,
      rect: { x: 13, y: 6, w: 5, h: 5 }, exits: ['hall_a', 'medbay'],
      players: 'Tisch, Kaffeemaschine, Notrationen.',
      gm: 'Gute Stelle für das erste Crew-Gespräch („Warum sind wir wach?“).',
    },
    {
      id: 'medbay', name: 'Krankenstation', deck: 'A', kind: 'medical', zones: 1, step: 6,
      rect: { x: 18, y: 6, w: 4, h: 5 }, exits: ['hall_a', 'galley'],
      players: 'Medkit, Operationsliege, Diagnosescanner.',
      gm: 'Kein Arzt an Bord – MEDIZIN nur mit Medkit-Bonus. Der Scanner kann später Eier/Infektionen nachweisen.',
    },
    // ---------- DECK B ----------
    {
      id: 'hall_b', name: 'Hauptgang B', deck: 'B', kind: 'corridor', zones: 3, step: 8,
      rect: { x: 2, y: 4, w: 18, h: 2 }, exits: ['workshop', 'suits', 'armory', 'spares', 'comtech', 'loadbay', 'lift_b', 'ladder_b'],
      players: 'Industrie-Gang mit Laufrosten, Druckluftrohren und Pumpengeräuschen.',
      gm: 'Rollstuhl-tauglich bis zum Aufzug.',
    },
    {
      id: 'workshop', name: 'Werkstatt', deck: 'B', kind: 'tech', zones: 2, step: 8,
      rect: { x: 2, y: 0, w: 6, h: 4 }, exits: ['hall_b', 'suits'],
      players: 'Werkbänke, Schweißgerät, Ersatzteile. Lea kennt jeden Handgriff.',
      gm: 'Mechanikerin kann hier Sachen improvisieren (+1 auf HEAVY MACHINERY bei Reparaturen).',
    },
    {
      id: 'suits', name: 'Druckanzug-Lager', deck: 'B', kind: 'storage', zones: 1, step: 9,
      rect: { x: 8, y: 0, w: 4, h: 4 }, exits: ['hall_b', 'workshop', 'armory'],
      players: 'Fünf IRC Mk. 50 Kompressionsanzüge (Luft 5).',
      gm: 'Essenziell, wenn das Andocken scheitert. Anzug für Elena ohne Rollstuhl möglich, aber mit Rollstuhl-Anbau schwer.',
    },
    {
      id: 'armory', name: 'Waffenkammer', deck: 'B', kind: 'storage', zones: 1, step: 10,
      rect: { x: 12, y: 0, w: 3, h: 4 }, exits: ['hall_b', 'suits', 'spares'],
      players: 'Verschlossener Schrank: Pistole, Bolzenschussgerät, Taschenlampen.',
      gm: 'Schlüssel hat der Captain. Hier wird die Rivalität sichtbar: Wer bekommt was?',
    },
    {
      id: 'spares', name: 'Ersatzteillager', deck: 'B', kind: 'storage', zones: 2, step: 11,
      rect: { x: 15, y: 0, w: 5, h: 4 }, exits: ['hall_b', 'armory'],
      players: 'Regale mit Kisten, Kabeln, Dichtungen. Ein Laderoboter („Daisy“) steht abgeschaltet in einer Ecke.',
      gm: 'Der Laderoboter ist schwach bewaffnet nützlich (Rammbock, Last). Eine Dichtung für das Andockmodul liegt hier.',
    },
    {
      id: 'comtech', name: 'Comtech-Raum', deck: 'B', kind: 'tech', zones: 2, step: 5,
      rect: { x: 2, y: 6, w: 6, h: 5 }, exits: ['hall_b'],
      players: 'Elektronikracks, Funkpult, Reparaturtische.',
      gm: 'Hier kann die Crew die Sensoren erweitern (Wurf auf COMTECH) oder das Zielschiff genauer scannen (Signal ohne Funk).',
    },
    {
      id: 'loadbay', name: 'Laderaum-Zugang / Laderoboter-Halle', deck: 'B', kind: 'cargo', zones: 3, step: 12,
      rect: { x: 8, y: 6, w: 14, h: 5 }, exits: ['hall_b', 'coupling'],
      players: 'Große Halle mit Schienen. Durch die Panzerfenster sieht man leer, wo der Anhänger war.',
      gm: 'Der Fracht-Anhänger wurde zur Reise abgekoppelt (leere Kupplung). Spielt keine große Rolle – kann als Rückzugsort/Hinweis dienen (Containerliste).',
    },
    {
      id: 'lift_b', name: 'Aufzug B', deck: 'B', kind: 'lift', zones: 1, step: 8,
      rect: { x: 20, y: 4, w: 2, h: 2 }, exits: ['hall_b'],
      players: 'Der Lift hält hier.', gm: 'Endstation nach unten: Deck C nur über Leiter oder Schacht.',
    },
    {
      id: 'ladder_b', name: 'Leiter Deck B', deck: 'B', kind: 'ladder', zones: 1, step: 8, noWheelchair: true,
      rect: { x: 0, y: 4, w: 2, h: 2 }, exits: ['hall_b'],
      players: 'Leiter nach oben/unten.', gm: 'Rollstuhl nicht möglich.',
    },
    {
      id: 'coupling', name: 'Frachtkupplung', deck: 'B', kind: 'airlock', zones: 1, step: 13,
      rect: { x: 22, y: 3, w: 4, h: 8 }, exits: ['loadbay'],
      players: 'Schwere Klemmen und ein verschlossenes Schott.', gm: 'Anhänger abgekoppelt – Schleuse ins Vakuum (Vorsicht).',
    },
    // ---------- DECK C ----------
    {
      id: 'hall_c', name: 'Maschinengang C', deck: 'C', kind: 'corridor', zones: 3, step: 14,
      rect: { x: 2, y: 4, w: 18, h: 2 }, exits: ['tanks', 'lifesupport', 'reactor', 'engine', 'ladder_c'],
      players: 'Wärmer, lauter, Dampf, Gitterroste.', gm: 'Keine Aufzüge – Rollstuhl unmöglich. Perfekt für Spannungsszenen.',
    },
    {
      id: 'ladder_c', name: 'Leiter Deck C', deck: 'C', kind: 'ladder', zones: 1, step: 14, noWheelchair: true,
      rect: { x: 0, y: 4, w: 2, h: 2 }, exits: ['hall_c'], players: 'Leiter nach oben.', gm: '—',
    },
    {
      id: 'tanks', name: 'Treibstoff-/Kühlmitteltanks', deck: 'C', kind: 'engine', zones: 2, step: 15,
      rect: { x: 2, y: 0, w: 8, h: 4 }, exits: ['hall_c', 'lifesupport'], players: 'Rohre, Druckventile, Warnschilder.', gm: 'Brandgefahr (Treibstoff).',
    },
    {
      id: 'lifesupport', name: 'Lebenserhaltung', deck: 'C', kind: 'tech', zones: 2, step: 16,
      rect: { x: 10, y: 0, w: 6, h: 4 }, exits: ['hall_c', 'tanks'], players: 'Luftaufbereiter, Wasserrecycler.', gm: 'Sabotage hier ist tödlich – Druckverlust-Szenen.',
    },
    {
      id: 'o2filter', name: 'Sauerstofffilter (nur Schacht)', deck: 'C', kind: 'tech', zones: 1, step: 17, noWheelchair: true,
      rect: { x: 16, y: 0, w: 4, h: 4 }, exits: [], players: 'Eine Röhre im Schacht – laut und feucht.',
      gm: 'Nur über Lüftungs- und Wartungsschächte erreichbar. Wahrnehmung −2 (wie bei der Cronus).',
    },
    {
      id: 'reactor', name: 'Reaktorkern & Kontrollraum', deck: 'C', kind: 'engine', zones: 3, step: 18,
      rect: { x: 2, y: 6, w: 8, h: 5 }, exits: ['hall_c', 'engine'], players: 'Warnlichter, strahlende Hitze.', gm: 'Strahlung bei Fehlern (RADIOACTIVE).',
    },
    {
      id: 'engine', name: 'Triebwerksraum', deck: 'C', kind: 'engine', zones: 3, step: 19,
      rect: { x: 10, y: 6, w: 10, h: 5 }, exits: ['hall_c', 'reactor', 'pod'], players: 'Massive Triebwerksverkleidung, Wartungsplattformen.', gm: 'Zugang zur Rettungskapsel.',
    },
    {
      id: 'pod', name: 'Rettungskapsel', deck: 'C', kind: 'airlock', zones: 1, step: 20,
      rect: { x: 22, y: 3, w: 4, h: 4 }, exits: ['engine'], players: 'Eine winzige Kapsel für zwei Personen.', gm: 'Nur 2 Plätze (Rollstuhl nicht ladbar). Zündung nur durch Captain-Code.',
    },
  ],
  vents: [
    { id: 'va1', deck: 'A', points: [[5, 3], [11, 3], [17, 3]], connects: ['captain', 'bridge', 'muthur'], note: 'Deckenkanal über den Kajüten: 0,8 m hoch. Kriechen.' },
    { id: 'va2', deck: 'A', points: [[5, 6.5], [10, 6.5], [15, 6.5], [20, 6.5]], connects: ['cryo', 'quarters', 'galley', 'medbay'], note: 'Südliche Schachtlinie: verbindet vier Räume.' },
    { id: 'va3', deck: 'A', points: [[1, 5], [1, 3], [5, 3]], connects: ['captain'], note: 'Von der Leiterschacht zum Nordkanal.' },
    { id: 'va4', deck: 'A', points: [[1, 5], [1, 6.5], [5, 6.5]], connects: ['cryo'], note: 'Von der Leiterschacht zum Südkanal.' },
    { id: 'vb1', deck: 'B', points: [[5, 3], [10, 3], [13.5, 3], [17.5, 3]], connects: ['workshop', 'suits', 'armory', 'spares'], note: 'Nordschacht, wird für Wartungsrobo benutzt.' },
    { id: 'vb2', deck: 'B', points: [[5, 6.5], [15, 6.5], [20, 6.5]], connects: ['comtech', 'loadbay'], note: 'Südschacht, führt zu Lüftungsstrang S2.' },
    { id: 'vb3', deck: 'B', points: [[1, 5], [1, 3], [5, 3]], connects: ['workshop'], note: 'Leiterschacht → Nordschacht.' },
    { id: 'vc1', deck: 'C', points: [[6, 3], [13, 3], [18, 2]], connects: ['tanks', 'lifesupport', 'o2filter'], note: 'Nur hier erreichbar: Sauerstofffilter.' },
    { id: 'vc2', deck: 'C', points: [[6, 6.5], [15, 6.5], [20, 6.5]], connects: ['reactor', 'engine'], note: 'Heiß, Strahlung möglich.' },
  ],
  shafts: [
    { id: 'S1', name: 'Leiterschacht (Süd-West)', deck: 'A', x: 1, y: 5, decks: ['A', 'B', 'C'], note: 'Steile Leiter durch alle Decks. Nicht rollstuhlgeeignet.' },
    { id: 'S2', name: 'Hauptlüftungsschacht (Ost)', deck: 'A', x: 20.5, y: 6.5, decks: ['A', 'B', 'C'], note: 'Durchgehend 0,8 m. Kriechen, Sauerstofffilter an Deck C.' },
  ],
}
