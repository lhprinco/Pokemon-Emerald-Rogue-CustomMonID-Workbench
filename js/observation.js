/*
==========================================================

Observation

Represents one experimentally verified CustomMonID.

==========================================================
*/

class Observation {

    constructor() {

        this.customMonID = "";

        this.species = "";

        this.originalType = [];

        this.resultType = [];

        this.ability = "";

        this.moves = [];

        this.notes = "";

        this.timestamp = "";

    }

    validate() {

        return this.customMonID.length === 8
            && this.species.length > 0;

    }

    toJSON() {

        return {

            customMonID: this.customMonID,

            species: this.species,

            originalType: this.originalType,

            resultType: this.resultType,

            ability: this.ability,

            moves: this.moves,

            notes: this.notes,

            timestamp: this.timestamp

        };

    }

}
