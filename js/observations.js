/*
==========================================================

Observation Database

Stores all experimentally verified observations.

==========================================================
*/

const ObservationDatabase = {

    observations: [],

    add(observation) {

        if (!(observation instanceof Observation)) {

            console.error(
                "Only Observation objects can be added."
            );

            return;

        }

            if (!observation.validate()) {

            console.error(
                "Observation failed validation."
            );

            return;

        }

        observation.timestamp =
            new Date().toISOString();

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
