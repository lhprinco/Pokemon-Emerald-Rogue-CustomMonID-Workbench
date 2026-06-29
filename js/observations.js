/*
==========================================================

Observation Database

Stores all experimentally verified observations.

==========================================================
*/

const ObservationDatabase = {

    observations: [],

    add(observation) {

        if (!(observation instanceof Observation))
            return;

        if (!observation.validate())
            return;

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

    },

    download() {

        const blob =
            new Blob(
                [this.export()],
                {
                    type:
                    "application/json"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "observations.json";

        a.click();

        URL.revokeObjectURL(url);

    },

    import(jsonText) {

        const data =
            JSON.parse(jsonText);

        this.clear();

        data.forEach(entry => {

            const obs =
                new Observation();

            Object.assign(
                obs,
                entry
            );

            this.add(obs);

        });

    }

};
