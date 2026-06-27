/*
==========================================================

Form Binder

Shared helper functions used by every UI.

==========================================================
*/

const FormBinder = {

    populateTypes(selectId) {

        const select =
            document.getElementById(selectId);

        if (!select)
            return;

        select.innerHTML = "";

        Database.types.forEach(type => {

            const option =
                document.createElement("option");

            option.value = type.name;
            option.textContent = type.name;

            select.appendChild(option);

        });

    },

    populateAbilities(selectId) {

        const select =
            document.getElementById(selectId);

        if (!select)
            return;

        select.innerHTML = "";

        Database.abilities.forEach(ability => {

            const option =
                document.createElement("option");

            option.value = ability;
            option.textContent = ability;

            select.appendChild(option);

        });

    },

    populateMoves(selectId) {

        const select =
            document.getElementById(selectId);

        if (!select)
            return;

        select.innerHTML = "";

        const blank =
            document.createElement("option");

        blank.value = "";
        blank.textContent = "—";

        select.appendChild(blank);

        Database.moves.forEach(move => {

            const option =
                document.createElement("option");

            option.value = move;
            option.textContent = move;

            select.appendChild(option);

        });

    },

    populateSpecies(selectId) {

        const select =
            document.getElementById(selectId);

        if (!select)
            return;

        select.innerHTML = "";

        [...Database.species]
            .sort((a,b)=>a.name.localeCompare(b.name))
            .forEach(species => {

                const option =
                    document.createElement("option");

                option.value = species.name;

                option.textContent =
                    `#${species.dex} ${species.name}`;

                select.appendChild(option);

            });

    }

};
