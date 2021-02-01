## A NBA *Top Trumps* Style Game (Work in Progress)

[Deployed WIP Link](https://top-trumps-nba-game.vercel.app/)

An early stages build of an NBA themed 'Top Trumps' style card game.

The game is fed a (giant) JSON file containing detailed stats of all current NBA players.

When the player clicks 'deal', this data is mapped passed into an array and shuffled into a random order before being split in two halves, one of which is given to the player, the other is held by the computer.

The player is then presented with the first index of their array of cards and chooses an attribute to compare to the computers card of the same index. The card with the winning attribute is passed over to the winning side and added as the last index of their array, the winning players current card is then moved to the end of the array, leaving both with new cards to play with.

This process can be repeated until either side has lost all of their cards (has an empty array).

Currently this process can take a LONG time, as there are roughly 300 players in the NBA... The plan is to either edit down the number of players in the data file, or find a way to filter them, or allow the player to pick a set amount of cards blindly from the deck one by one.

One future hope for the game is to try and utilise web sockets to allow for human vs human play online.

As far as it stands, I'm quite pleased with the logic involved, it was quite complex to figure out, however I do plan on trying to make it a bit more concise and efficient.

The styling is also very basic, this is a WIP and will be made fancier eventually!
