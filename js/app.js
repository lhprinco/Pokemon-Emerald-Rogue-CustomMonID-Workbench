function fillDropdown(id,list){

    const select=document.getElementById(id);

    list.forEach(item=>{

        const option=document.createElement("option");

        option.text=item;

        option.value=item;

        select.appendChild(option);

    });

}

function updatePreview(){

    const original1=document.getElementById("originalType1").value;

    const original2=document.getElementById("originalType2").value;

    const newType=document.getElementById("newType").value;

    const ability=document.getElementById("ability").value;

    const move1=document.getElementById("move1").value;

    const move2=document.getElementById("move2").value;

    document.getElementById("previewType").textContent=

        newType+" / "+original2;

    document.getElementById("previewAbility").textContent=

        ability;

    const list=document.getElementById("previewMoves");

    list.innerHTML="";

    [move1,move2].forEach(move=>{

        if(move!="None"){

            const li=document.createElement("li");

            li.textContent=move;

            list.appendChild(li);

        }

    });

}

window.onload=()=>{

    fillDropdown("originalType1",TYPES);

    fillDropdown("originalType2",TYPES);

    fillDropdown("newType",TYPES);

    fillDropdown("ability",ABILITIES);

    fillDropdown("move1",MOVES);

    fillDropdown("move2",MOVES);

    document.querySelectorAll("select").forEach(s=>{

        s.onchange=updatePreview;

    });

    updatePreview();

}
