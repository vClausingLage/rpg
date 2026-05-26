I want a app to help me as narrator for the alien rpg that is a call of cthulhu like action pen and paper rpg. I want to keep track of the players and their avatars. 

I use a payoad cms in the app folder.

BACKEND:

I need a few payload collections from you: 
1) player name has one avatar
2) avatar has one player , name , class , picture (perhaps payload media?) , age varchar 50 , personality , isMechanic bool , story_background text , career varchar , talents text , buddy ?avatar , rival ?avatar , exp int , story points int , stress_level int , has one stress_and_panic_responses , health int , isFatigued bool , resolve int , isRadiated bool , critical_injuries_and_trauma varchar , has many tiny_items , has one armor , encumbrance int , cash int , signature_item varchar , has many gear , has many weapons , strength int , close_combat int , heavy_machinery int , agility int , mobility int , piloting int , ranged_combat int , wits int , comtech int , observation int , survival int , empathy int , command int , manipulation int , medical_aid int
3) stress_and_panic_responses enum jumpy tunnel_vision aggravated shakes frantic deflted paranoid hesitant freeze seek_cover scream flee frenzy catatonic
4) tiny_items name
5) armor name level (int) weight (int)
6) gear name power weight
7) weapon name modifier (int) damage (int) range (varchar) ammo (int) weight (int)

There are some preset avatars with stats and items, how can i have them as presets that i can attach to a player for a session?

FRONTEND:

NEXT JS (version 16.2)

I want it to be a dashboard mostly functional, but can have some subtle "alien" aesthetics from the movies in color etc, be creative here.

The dashboard must be as follows 

I can switch swiftly from one to the next player and be able to see and modify stats etc quickly. I can set the stress level, stress and panic response etc. IT IS ABSOLUTELY MANDATORY that all the has many relations are implemented with reusability in mind (a list with mutation action for example with set buttons or add / delete button as necessary).

I need one overview page where i use content blocks for storytelling and hints for me. 

I leave it up to you if it makes more sense to use payload pages with bocks or go a more headless approach and have the logic on one page with a more react centered approach and just fetch the data from payload.
