# Quest 64 Glitch FAQ:

## Initiative Glitch
You can get into combat whenever you are moving, but when you are moving you can open up the spell menu and Brian slides a little bit. That is still considered movement and you can get into an encounter with the spell menu already open.

## Agility Glitches 
There are two different ways to achieve this. What happens in both cases is the game keeps track of your last encounters coordinates (even over loading zones) so that when you do the glitch, the game thinks you move IN AN ENCOUNTER from your previous coordinates to your current ones. This gives a whole heck of a lot of AGI exp. NOTE: If you do this from the first encounter on the full arena doesn't load in, however once you take an encounter without skipping your turn it loads in from there on out.

	Initiative version: Do the initiative glitch and then cast the spell quickly
	US only: If you have higher Agi then the enemies in the encounter you can skip you turn before the encounter fully loads.

## Death Dupe
Have enough HP that you can die in 1 hit (let's assume 1 hp). Do the initiative glitch on top of a spirit (so that you could pick the spirit up if you weren't doing this) and the encounter you get into has to be an encounter that has Higher AGI then you. At about 1 second into the encounter cast the spell and run towards the exit, preferably out of the encounter, and then open up the item menu. You should take lethal dmg, when you hear the death audio start to play, heal. If you are out of the encounter, it ends immediately and you can mash to pick up the spirit for about 8 seconds. If you aren't out of the encounter the enemies will attack again and you want to get out ASAP, from the point you healed the 8 second timer starts, so the longer it takes you to get out the less time you have to mash. TAS can get 96 spirits from this.

## Cloning
In a zone where you can cast Exit or Return, stand where you can pick up the spirit and cast whichever you can. Start mashing (you don't want to hit the buttons at the same time). Max is 6 spirits.

## Out of Bounds
2 Different ways to achieve this (BAC is the same as corner clip except we have to create the corner). Should note when oob you cannot activate doors. You can only hit cave exits/entrances. NOTE: For the corner/BAC clips you have to WALK into the corner, if you run it pushes you back out.

### Compression
At 19 fire there is a spell called 'Compression'. If you cast this on an enemy it reduces their attack (meh) and also shrinks their model's size (not meh). Having the enemy stand right up against the wall then wedging yourself in between them, once they go back to normal size (depending on the enemy/area) you will be pushed out of bounds. Unfortunately Compression isn't the most accurate spell, and some enemies AI are garbage for getting them close to walls so this is generally the backup option.

###	Corner Clip
There are as of currently 2 spots in the game where you can WALK into an existing corner and clip OOB, Baragoon Tunnel and Beigis' room (NOTE: If you go oob in Beigis' room after he is dead this is a softlock. You cannot get out).

### Battle Arena Clip (BAC)
Same idea as the corner clip except we use our movement area to create the corner and then WALK into the corner to get oob.

### Victory Animation Cancel
Once an encounter ends there is a couple (iirc 2-3) frames where you can get into your spell menu. If you are fast enough you can cast heal and skip Brian jumping in the air. Also the music doesn't load in if you do this until the next encounter or you go through a loading zone.

## Crash the game
Cast Rock Shower in the Blue Maze portion of Blue cave against 2+ Skelebats. This hard crashes the game. NOTE: Don't do this.

## Chappy Warp (Chexit)
This does lose a smidge of time due to no longer death warping after Nepty but it's a huge safety that means a Pinhead is no longer game over. At the end of Blue Cave there is a house with Epona and Chappy, with Chappy being a save point. This is only important due to how exit 'points' are set. For Blue cave the only spots that set your exit point are the entrance, the shortcut to Glencoe Forest and the warp pedestal in the back of Epona's house. Now we want to save at chappy to set our re-spawn point at Chappy and go anywhere else in the game that sets a new exit point. We can then die, re-spawn at Chappy, and step out the front door of Epona's house into Crystal valley, as it turns out that door doesn't reset our exit point and we are in an area that allows us to cast exit. When we do it will take us to wherever our exit point is, even in Mammon's world!
