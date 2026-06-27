/*
==========================================================

Emerald Rogue
CustomMonID Encoder

Version 0.3

==========================================================
*/

class CustomMonEncoder {

    constructor(selection) {

        this.selection = selection;

    }

    encode() {

        return {

            typeByte:
                this.encodeType(),

            abilityByte:
                this.encodeAbility(),

            moveBytes:
                this.encodeMoves(),

            estimate:
                this.buildEstimate()

        };

    }

    encodeType() {

        const type =
            Database.types.find(t =>
                t.name === this.selection.type
            );

        if (!type)
            return 0;

        return type.id;

    }

    encodeAbility() {

        return Database.abilities.indexOf(
            this.selection.ability
        );

    }

    encodeMoves() {

        return {

            typeMove:
                this.selection.typeMove,

            move1:
                this.selection.move1,

            move2:
                this.selection.move2

        };

    }

    buildEstimate() {

        const ability =
            this.encodeAbility()
                .toString(16)
                .padStart(2,"0")
                .toUpperCase();

        const type =
            this.encodeType()
                .toString(16)
                .toUpperCase();

        return `C${ability}20000${type}`;

    }

}
