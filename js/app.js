```javascript
/*
==========================================================
 Emerald Rogue CustomMonID Workbench
 app.js
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    populateSpecies();
    populateTypes();
    populateAbilities();
    populateMoves();

    registerEvents();

    if (Database.species.length > 0) {

        
       document.getElementById("speciesSelect").selectedIndex = 0;

       selectSpecies(
       Database.species[0].name
);



    }

});

/*=========================================================
 Populate UI
=========================================================*/

function populateSpecies() {

    const select =
        document.getElementById("speciesSelect");

    select.innerHTML = "";

    Database.species
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

function populateTypes() {

    const replacement = document.getElementById("replacementType");

    replacement.innerHTML = "";

    Database.types.forEach(type => {

        const option = document.createElement("option");

        option.value = type.name;
        option.textContent = type.name;

        replacement.appendChild(option);

    });

    updateTypeMoveList();

}

function populateAbilities() {

    const select = document.getElementById("ability");

    select.innerHTML = "";

    Database.abilities.forEach(ability => {

        const option = document.createElement("option");

        option.value = ability;
        option.textContent = ability;

        select.appendChild(option);

    });

}

function populateMoves() {

    const moveSelectors = [

        document.getElementById("extraMove1"),
        document.getElementById("extraMove2")

    ];

    moveSelectors.forEach(select => {

        select.innerHTML = "";

        Database.moves.forEach(move => {

            const option = document.createElement("option");

            option.value = move;
            option.textContent = move;

            select.appendChild(option);

        });

    });

}

/*=========================================================
 Event Registration
=========================================================*/

function registerEvents() {

    document.getElementById("speciesSearch")
        .addEventListener("input", filterSpecies);

    document.getElementById("speciesSelect")
        .addEventListener("change", event => {

            selectSpecies(event.target.value);

        });

    document.getElementById("replacementType")
        .addEventListener("change", () => {

            updateTypeMoveList();
            updatePreview();

        });

    document.getElementById("typeVariant")
        .addEventListener("change", () => {

            updateTypeMoveList();
            updatePreview();

        });

    document.getElementById("automaticTypeMove")
        .addEventListener("change", () => {

            updateTypeMoveList();

        });

    document.getElementById("typeMove")
        .addEventListener("change", updatePreview);

    document.getElementById("ability")
        .addEventListener("change", updatePreview);

    document.getElementById("extraMove1")
        .addEventListener("change", updatePreview);

    document.getElementById("extraMove2")
        .addEventListener("change", updatePreview);

    document
        .querySelectorAll("input[name='editedSlot']")
        .forEach(radio => {

            radio.addEventListener("change", updatePreview);

        });

}

/*=========================================================
 Species
=========================================================*/

function filterSpecies() {

    const filter =
        document
            .getElementById("speciesSearch")
            .value
            .trim()
            .toLowerCase();

    const select =
        document.getElementById("speciesSelect");

    select.innerHTML = "";

    const matches =
        Database.species.filter(species =>
            species.name
                .toLowerCase()
                .includes(filter)
        );

    matches.forEach(species => {

        const option =
            document.createElement("option");

        option.value = species.name;
        option.textContent =
            `#${species.dex} ${species.name}`;

        select.appendChild(option);

    });

    if (matches.length > 0) {

        select.selectedIndex = 0;

        selectSpecies(matches[0].name);

    }

}

function selectSpecies(name) {

    const species = getSpecies(name);

    if (!species)
        return;

    document.getElementById("originalPrimary").textContent =
        species.primary;

    document.getElementById("originalSecondary").textContent =
        species.secondary ?? "—";

    updatePreview();

}

/*=========================================================
 Type Move
=========================================================*/

function updateTypeMoveList() {

    const typeName =
        document.getElementById("replacementType").value;

    const type = getType(typeName);

    const select =
        document.getElementById("typeMove");

    const automatic =
        document.getElementById("automaticTypeMove").checked;

    const variant =
        document.getElementById("typeVariant").value;

    select.innerHTML = "";

    const option =
        document.createElement("option");

    if (variant === "0")
        option.textContent = type.variantA;
    else
        option.textContent = type.variantB;

    option.value = option.textContent;

    select.appendChild(option);

    select.disabled = automatic;

}

/*=========================================================
 Preview
=========================================================*/

function updatePreview() {

    const speciesName =
        document.getElementById("speciesSelect").value;

    const species =
        getSpecies(speciesName);

    if (!species)
        return;

    let primary = species.primary;
    let secondary = species.secondary;

    const replacement =
        document.getElementById("replacementType").value;

    const editedSlot =
        document.querySelector(
            "input[name='editedSlot']:checked"
        ).value;

    if (editedSlot === "primary")
        primary = replacement;
    else
        secondary = replacement;

    document.getElementById("previewOriginalPrimary").textContent =
        species.primary;

    document.getElementById("previewOriginalSecondary").textContent =
        species.secondary ?? "—";

    document.getElementById("previewResultPrimary").textContent =
        primary;

    document.getElementById("previewResultSecondary").textContent =
        secondary ?? "—";

    updateMovePreview();
    updateAbilityPreview();
    updatePrediction();

}

/*=========================================================
 Move Preview
=========================================================*/

function updateMovePreview() {

    const list =
        document.getElementById("previewMoves");

    list.innerHTML = "";

    const moves = [];

    moves.push(
        document.getElementById("typeMove").value
    );

    const move1 =
        document.getElementById("extraMove1").value;

    const move2 =
        document.getElementById("extraMove2").value;

    if (move1 !== "None")
        moves.push(move1);

    if (move2 !== "None")
        moves.push(move2);

    moves.forEach(move => {

        const li =
            document.createElement("li");

        li.textContent = move;

        list.appendChild(li);

    });

}

/*=========================================================
 Ability Preview
=========================================================*/

function updateAbilityPreview() {

    document.getElementById("previewAbility").textContent =
        document.getElementById("ability").value;

}

/*=========================================================
 Encoder Placeholder
=========================================================*/

function updatePrediction() {

    /*
    This will become the real encoder.

    For now it simply shows that the UI
    has updated.
    */

    document.getElementById("prediction").textContent =
`Encoder v0.1

Species:
${document.getElementById("speciesSelect").value}

Status:
Not implemented`;

}
```
