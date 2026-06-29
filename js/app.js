/*
==========================================================
 Emerald Rogue CustomMonID Workbench
 app.js
==========================================================
*/

/*
==========================================================
Reverse Engineering Knowledge Base

These flags describe what has been experimentally verified.
==========================================================
*/

const ReverseEngineeringState = {

    primaryEditMonotype: "confirmed",

    secondaryEditMonotype: "unknown",

    primaryEditDualtype: "confirmed",

    secondaryEditDualtype: "suspected",

    typeMoveVariant: "confirmed",

    independentTypeMove: "partial",

    extraMoveEncoding: "partial"

};

document.addEventListener("DOMContentLoaded", () => {

    FormBinder.populateSpecies("speciesSelect");
    FormBinder.populateSpecies("obsSpecies");

    FormBinder.populateTypes("replacementType");
    FormBinder.populateTypes("obsResultPrimary");
    FormBinder.populateTypes("obsResultSecondary");

    FormBinder.populateAbilities("ability");
    FormBinder.populateAbilities("obsAbility");

    FormBinder.populateMoves("typeMove");
    FormBinder.populateMoves("extraMove1");
    FormBinder.populateMoves("extraMove2");

    FormBinder.populateMoves("obsMove1");
    FormBinder.populateMoves("obsMove2");
    FormBinder.populateMoves("obsMove3");

    registerEvents();

    if (Database.species.length > 0) {

        
       document.getElementById("speciesSelect").selectedIndex = 0;

       selectSpecies(
       Database.species[0].name
);



    }

});

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

    const species = getSpecies(
        document.getElementById("speciesSelect").value
    );

    if (!species)
        return;

    const editedSlot =
        document.querySelector(
            "input[name='editedSlot']:checked"
        ).value;

    const replacement =
        document.getElementById("replacementType").value;

    let primary = species.primary;
    let secondary = species.secondary;

    let status = "Confirmed";

    /*
    ----------------------------------------------------------
    Primary edit
    ----------------------------------------------------------
    */

    if (editedSlot === "primary") {

        primary = replacement;

        if (!species.secondary) {

            secondary = species.primary;

        }

    }

    /*
    ----------------------------------------------------------
    Secondary edit
    ----------------------------------------------------------
    */

    else {

        if (species.secondary) {

            secondary = replacement;

        }

        else {

            secondary = replacement;

            status =
                "Experimental (not yet verified)";

        }

    }

    document.getElementById(
        "previewOriginalPrimary"
    ).textContent = species.primary;

    document.getElementById(
        "previewOriginalSecondary"
    ).textContent =
        species.secondary ?? "—";

    document.getElementById(
        "previewResultPrimary"
    ).textContent = primary;

    document.getElementById(
        "previewResultSecondary"
    ).textContent =
        secondary ?? "—";

    updateMovePreview();
    updateAbilityPreview();
    updatePrediction(status);

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
 Encoder v0.2
=========================================================*/

function updatePrediction(status = "Confirmed") {

    const selection = {

        species:
            document.getElementById("speciesSelect").value,

        type:
            document.getElementById("replacementType").value,

        ability:
            document.getElementById("ability").value,

        typeMove:
            document.getElementById("typeMove").value,

        move1:
            document.getElementById("extraMove1").value,

        move2:
            document.getElementById("extraMove2").value,

        editedSlot:
            document.querySelector(
                "input[name='editedSlot']:checked"
            ).value

    };

    const encoder =
        new CustomMonEncoder(selection);

    const result =
        encoder.encode();

    let confidence = 5;

    let bar =
        "█".repeat(confidence) +
        "░".repeat(10 - confidence);

    document.getElementById("prediction").textContent =

`Encoder v0.3

Estimated CustomMonID

${result.estimate}

Prediction Status

${status}

Knowledge

${bar}

${confidence}/10

Solved
✓ Type encoding
✓ Ability encoding

Partial
◐ Type move selection

Unknown
✗ Extra move bit layout
✗ Final bit packing`;
}

document
    .querySelectorAll(".tabButton")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".tabButton")
                .forEach(b =>
                    b.classList.remove("active")
                );

            document
                .querySelectorAll(".tabPage")
                .forEach(p =>
                    p.classList.remove("active")
                );

            button.classList.add("active");

            document
                .getElementById(
                    button.dataset.tab + "Tab"
                )
                .classList.add("active");

        });

    });

document
    .getElementById("obsSpecies")
    .addEventListener("change", e => {

        const species =
            getSpecies(e.target.value);

        if (!species)
            return;

        document
            .getElementById("obsOriginalType")
            .textContent =
                species.secondary
                    ? `${species.primary} / ${species.secondary}`
                    : species.primary;

    });

/*=========================================================
 Research
=========================================================*/

function saveObservation() {

    const observation = new Observation();

    observation.customMonID =
        document.getElementById("obsCustomMonID")
            .value
            .trim()
            .toUpperCase();

    observation.species =
        document.getElementById("obsSpecies")
            .value;

    const species =
        getSpecies(observation.species);

    if (species) {

        observation.originalType =
            species.secondary
                ? [species.primary, species.secondary]
                : [species.primary];

    }

    const primary =
        document.getElementById("obsResultPrimary")
            .value;

    const secondary =
        document.getElementById("obsResultSecondary")
            .value;

    observation.resultType = [];

    if (primary !== "")
        observation.resultType.push(primary);

    if (secondary !== "")
        observation.resultType.push(secondary);

    observation.ability =
        document.getElementById("obsAbility")
            .value;

    observation.moves = [];

    [
        "obsMove1",
        "obsMove2",
        "obsMove3"
    ].forEach(id => {

        const move =
            document.getElementById(id).value;

        if (move !== "")
            observation.moves.push(move);

    });

    observation.notes =
        document.getElementById("obsNotes")
            .value;

    ObservationDatabase.add(observation);

    console.log(
        "Observation saved:",
        observation
    );

}
document
    .getElementById("saveObservation")
    .addEventListener(
        "click",
        saveObservation
    );

/*
==========================================================
Observation Export
==========================================================
*/

document
    .getElementById("exportObservations")
    .addEventListener(
        "click",
        () => {

            ObservationDatabase.download();

        }
    );

/*
==========================================================
Observation Import
==========================================================
*/

document
    .getElementById("importObservations")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("importFile")
                .click();

        }
    );

document
    .getElementById("importFile")
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file)
                return;

            const reader =
                new FileReader();

            reader.onload =
                e => {

                    ObservationDatabase.import(
                        e.target.result
                    );

                    console.log(

                        "Imported",

                        ObservationDatabase
                            .all()
                            .length,

                        "observations."

                    );

                };

            reader.readAsText(file);

        }
    );
