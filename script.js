let originalData;
let houseData;
let modifiableData;
let sortOption;
let sort = document.querySelector(".sort");
let search = document.querySelector(".search");
let reversedSort = document.querySelector("#reversed");
sort.addEventListener("change", (event) => SortByType(event.target.value));
reversedSort.addEventListener("change", (event) => SortByType());
search.addEventListener("input", (event) => SortByName(event.target.value));

function Filter(array, request, type) {
    if(type == "name"){
        return array.filter(function (element) {
            return element.name.toLowerCase().indexOf(request.toLowerCase()) != -1;
        });
    }
    else if(type == "house"){
        return array.filter(function (element) {
            return element.house.toLowerCase().indexOf(request.toLowerCase()) != -1;
        });
    }
    else if(type == "Ihouse"){
        return array.filter(function (element) {
            if(element.house == request)
            return element;
        });
    }
}

async function GetMyId() {
    const token = localStorage.getItem("token");
  
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.status == 200) {
      const data = await response.json();
      return data.id;
    }
    else{
        return 4;
    }
  }
  
  function UpdateLastHouse(id) {
    let baseUrl = "http://localhost:3000/users/" + id;
    return fetch(baseUrl, {
      method: "PUT",
      body: JSON.stringify({
        house: "stop",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  DisplayCharacters();
  

function GetCharacters(){
    return fetch("https://hp-api.lainocs.fr/characters")
    .then((reponse) => reponse.json())
}

async function DisplayCharacters(){
    originalData = await GetCharacters()
    modifiableData, houseData = originalData;
    SortByType("name");
    UpdateLastHouse(await GetMyId());
}

function SortByName(value){
    modifiableData = Filter(houseData, value, "name");
    Update(modifiableData);
}

function SortByType(value){
    switch(value){
        case "name":
            houseData = originalData;
            sortOption = "name";
            break;
        case "age":
            houseData = originalData;
            sortOption = "birthday";
            break;
        case "house":
            houseData = originalData;
            sortOption = "house";
            break;      
        case "Gryffindor":
        case "Hufflepuff":
        case "Ravenclaw":
        case "Slytherin":
            houseData = Filter(originalData, value, "house");
            break;
        case "houseless":
            houseData = Filter(originalData, "", "Ihouse");
            break; 
    }
    modifiableData = houseData.sort(DynamicSort(sortOption));
    Update(modifiableData);
    search.value = null; //Reset search
}

function Update(newArray){
    let cartes = document.querySelector('.cards');
    cartes.innerHTML = ``; //Reset card
    newArray.forEach(character => {
        cartes.innerHTML += `
        <a href="single-hp.html?slug=${character.slug}">
            <div class="card ${character.house != "" ? character.house.toLowerCase() : "neutral"}">
                <img src="${character.image}" class="imageCard">
                <div class="textCard">
                    <p>${character.name}</p>
                </div>
            </div>
        </a>
        `
    });
}

function DynamicSort(property) {
    if(reversedSort.checked == false){
        sortOrder = 1;
    }
    else{
        sortOrder = -1
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

DisplayCharacters();