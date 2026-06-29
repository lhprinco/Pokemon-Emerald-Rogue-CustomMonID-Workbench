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

        this.render();
        
    },

    all() {

        return this.observations;

    },

    clear() {

        this.observations = [];

        this.render();
        
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

        this.render();
        
    }

    render(){

    const container =
        document.getElementById(
            "observationHistory"
        );

    const count =
        document.getElementById(
            "observationCount"
        );

    if(!container)
        return;

    container.innerHTML="";

    count.textContent =
        this.observations.length;

    this.observations.forEach(
        (obs,index)=>{

            const card =
                document.createElement("div");

            card.className=
                "observationCard";

            card.innerHTML=`

<h3>REC ${index+1}</h3>

<p><strong>ID:</strong> ${obs.customMonID}</p>

<p><strong>Species:</strong> ${obs.species}</p>

<p><strong>Ability:</strong> ${obs.ability}</p>

<p><strong>Original:</strong>
${obs.originalType.join(" / ")}</p>

<p><strong>Result:</strong>
${obs.resultType.join(" / ")}</p>

<p><strong>Moves:</strong></p>

<ol>

${obs.moves.map(
m=>`<li>${m}</li>`
).join("")}

</ol>

<button
class="deleteObservation"

data-index="${index}">

Delete

</button>

`;

            container.appendChild(card);

        });

}
    
};
