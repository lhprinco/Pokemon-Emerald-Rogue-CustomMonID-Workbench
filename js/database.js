```javascript
/*
==========================================================
 Emerald Rogue CustomMonID Workbench
 database.js
==========================================================
*/

const Database = {

    /*
    ------------------------------------------------------
    Types
    variantA and variantB correspond to the two type moves
    currently known from rogue_gifts.c.
    ------------------------------------------------------
    */

    types: [

        { id: 0,  name: "Normal",   variantA: "Extreme Speed", variantB: "Boomburst" },
        { id: 1,  name: "Fighting", variantA: "Close Combat",  variantB: "Focus Blast" },
        { id: 2,  name: "Flying",   variantA: "Brave Bird",    variantB: "Hurricane" },
        { id: 3,  name: "Poison",   variantA: "Gunk Shot",     variantB: "Sludge Bomb" },
        { id: 4,  name: "Ground",   variantA: "Earth Power",   variantB: "Earthquake" },
        { id: 5,  name: "Rock",     variantA: "Ancient Power", variantB: "Rock Slide" },
        { id: 6,  name: "Bug",      variantA: "Megahorn",      variantB: "Lunge" },
        { id: 7,  name: "Ghost",    variantA: "Shadow Sneak",  variantB: "Shadow Ball" },
        { id: 8,  name: "Steel",    variantA: "Magnet Bomb",   variantB: "Iron Head" },
        { id: 9,  name: "Fire",     variantA: "Sacred Fire",   variantB: "Overheat" },
        { id:10,  name: "Water",    variantA: "Surf",          variantB: "Liquidation" },
        { id:11,  name: "Grass",    variantA: "Leaf Blade",    variantB: "Giga Drain" },
        { id:12,  name: "Electric", variantA: "Thunder",       variantB: "Thunderclap" },
        { id:13,  name: "Psychic",  variantA: "Psyshock",      variantB: "Psychic" },
        { id:14,  name: "Ice",      variantA: "Triple Axel",   variantB: "Ice Beam" },
        { id:15,  name: "Dragon",   variantA: "Dragon Rush",   variantB: "Draco Meteor" },
        { id:16,  name: "Dark",     variantA: "Night Slash",   variantB: "Dark Pulse" },
        { id:17,  name: "Fairy",    variantA: "Play Rough",    variantB: "Moonblast" },
        { id:18,  name: "Stellar",  variantA: "Return",        variantB: "Return" }

    ],

    /*
    ------------------------------------------------------
    Confirmed abilities.
    This is currently a subset for testing.
    We will expand it to all 64 confirmed abilities.
    ------------------------------------------------------
    */

    abilities: [

        "None",

        "Water Absorb",
        "Flash Fire",
        "Adaptability",
        "Drizzle",
        "Snow Warning",
        "Quick Draw",
        "Electric Surge",
        "Misty Surge",
        "Protean",
        "Moxie",
        "Regenerator",
        "Contrary",
        "Skill Link",
        "Guts",
        "Huge Power",
        "Battle Armor",
        "Toxic Debris",
        "Gorilla Tactics",
        "Full Metal Body",
        "Emergency Exit",
        "Power of Alchemy",
        "Levitate",
        "Costar",
        "Neuroforce",
        "Hospitality",
        "Berserk",
        "Unaware",
        "Mold Breaker",
        "Overcoat",
        "Defiant",
        "Sniper"

    ],

    /*
    ------------------------------------------------------
    Extra Moves
    Representative subset.
    ------------------------------------------------------
    */

    moves: [

        "None",

        "Hydro Steam",
        "Chilling Water",
        "Torch Song",
        "Jet Punch",
        "Stone Axe",
        "Thunderous Kick",
        "Scorching Sands",
        "Surging Strikes",
        "Parting Shot",
        "Grassy Glide",
        "Dynamax Cannon",
        "Stomping Tantrum",
        "Baneful Bunker",
        "Diamond Storm",
        "Play Rough",
        "Freeze-Dry",
        "Phantom Force",
        "V-Create",
        "Secret Sword",
        "Trick Room",
        "Spore",
        "Gunk Shot",
        "Nasty Plot",
        "Close Combat",
        "U-turn",
        "Dragon Dance",
        "Calm Mind",
        "Leaf Blade",
        "Meteor Mash",
        "Knock Off",
        "Skill Swap",
        "Fake Out",
        "Extreme Speed"

    ],

    /*
    ------------------------------------------------------
    Species

    Small starter dataset.
    This will later be generated from the Bulbapedia dump.
    ------------------------------------------------------
    */

    species: [

        {
            dex:355,
            name:"Duskull",
            primary:"Ghost",
            secondary:null
        },

        {
            dex:564,
            name:"Tirtouga",
            primary:"Water",
            secondary:"Rock"
        },

        {
            dex:425,
            name:"Drifloon",
            primary:"Ghost",
            secondary:"Flying"
        },

        {
            dex:443,
            name:"Gible",
            primary:"Dragon",
            secondary:"Ground"
        },

        {
            dex:778,
            name:"Mimikyu",
            primary:"Ghost",
            secondary:"Fairy"
        },

        {
            dex:722,
            name:"Rowlet",
            primary:"Grass",
            secondary:"Flying"
        }

    ]

};

/*
==========================================================

Helper functions

==========================================================
*/

function getType(name){

    return Database.types.find(t=>t.name===name);

}

function getSpecies(name){

    return Database.species.find(s=>s.name===name);

}
```
