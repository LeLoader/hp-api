"use strict"

function GetCharacter(){ //PAS METTRE ASYNC FAIRE COMME COOURS
    let baseUrl = "https://hp-api.lainocs.fr/";
    let slug = new URLSearchParams(window.location.search).get("slug")
    return fetch(baseUrl + "characters/" + slug).
    then((response) => response.json());
}

async function Display(){
    const character = await GetCharacter();
    let div = document.body.querySelector(".cards")
    div.innerHTML = `
    <div class="card ${character.house != "" ? character.house.toLowerCase() : "neutral"}">
        <img src="${character.image}" class="imageCard">
        <div class="textCard">
            <p>${character.name}</p>
        </div>
    </div>
    <div class="description">
        <h3>Name: ${character.name}</h3>
        <h3>Role: ${character.role}</h3>
        <h3>House: ${character.house != "" ? character.house : "Houseless"}</h3>
        <h3>Wand: ${character.wand}</h3>
        <h3>Birthday: ${new Date(character.birthday).getFullYear()} (${1991 - new Date(character.birthday).getFullYear()}yo)</h3>
    </div>
`
}

Display();