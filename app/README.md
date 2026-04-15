• Here is how the implementation is meant to be used.

  CMS Sections

  In Payload admin at /admin, you now get an Alien RPG group with these collections:

  - Players: table participants. A player has a name and one linked avatar.
  - Avatars: live character sheets used during play.
  - Avatar Presets: reusable character templates. These are copied when you assign one to a player.
  - Stress And Panic Responses: named panic/stress outcomes selectable on an avatar.
  - Tiny Items, Armor, Gear, Weapons: item collections that can be attached to avatars.

  All of these require an authenticated Payload user.

  Recommended Workflow

  1. Go to /admin.
  2. Add reusable entries first:
      - Create Stress And Panic Responses.
      - Create common Weapons, Armor, Gear, and Tiny Items if you want a reusable library.
      - Upload avatar pictures to Media if needed.
  3. Create Avatar Presets for archetypes or pre-generated characters.
      - Fill in name, class, picture, career, personality, background, talents, stats, stress, health, gear, weapons, etc.
      - preset_notes are GM notes for when to use that preset.
      - Presets are templates only; they are not attached to a player.
  4. During the game, open /narrator.
  5. Create a Player from the left panel.
  6. If the player has no avatar, choose an Avatar Preset and click Create avatar.
      - This copies the preset into a new live Avatar.
      - The new avatar is linked to the player.
      - Later edits affect only that player’s live avatar, not the original preset.

  You can also create players and avatars manually in Payload admin, but if you do that, make sure the Player record has its avatar field set. The dashboard is driven from Player ->
  avatar.

  What The Narrator Dashboard Gives You

  The main page is:

  /narrator

  It is login-protected. If you are not logged in, it redirects to /admin.

  On /narrator, you get a table-facing GM console:

  - Left side: create players and switch between them.
  - If a selected player has no avatar: attach one from an avatar preset.
  - If the player has an avatar: edit the live character sheet.
  - You can update:
      - name, class, career, age
      - mechanic/fatigued/radiated toggles
      - stress level from 0 to 10
      - stress and panic response
      - health, resolve, XP, story points, encumbrance, cash
      - attributes and skills
      - personality, background, talents, injuries, signature item
      - tiny items, armor, gear, weapons

  The item panels on /narrator currently create new item records and attach them immediately. If you want to attach existing library items, do that from the avatar record in Payload
  admin.

  Story Overview Page

  The second page is:

  /narrator/overview

  It is also login-protected.

  This page looks for a normal Payload Page with this slug:

  narrator-overview

  If that page exists, /narrator/overview renders its layout blocks. If it does not exist, it shows a fallback message telling you to create it.

  Use this page for GM-facing campaign material: scenes, clues, secret hints, countdowns, reminders, factions, or session notes. I also adjusted the Content block so its columns can be
  full or half, which makes this overview page more useful for side-by-side clue/reminder layouts.

  What Pages You Now Have

  - /narrator: interactive Alien RPG player/avatar dashboard.
  - /narrator/overview: GM story overview powered by a Payload Page with slug narrator-overview.
  - Existing normal Payload pages still work as before.
  - There are no public individual player/avatar pages yet; this implementation is a private narrator console plus CMS collections.
