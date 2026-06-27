/*
==========================================================

Observation Database

Stores all experimentally verified observations.

==========================================================
*/

const ObservationDatabase = {

    observations: [],

    add(observation) {

        observation.timestamp =
            new Date().toISOString();

        observation.id =
            this.observations.length + 1;

        this.observations.push(observation);

    },

    all() {

        return this.observations;

    },

    clear() {

        this.observations = [];

    },

    export() {

        return JSON.stringify(
            this.observations,
            null,
            4
        );

    }

};
