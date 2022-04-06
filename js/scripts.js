//element selectors

//checks to see if pokemon being added is an object
function validatePokemon(pokemon) {
  return typeof pokemon === "object" ? true : false;
}

//checking to see if object has 3 keys that match pokemon object
function validatePokemonKeys(pokemon) {
  const validKeys = ["name", "height", "types"];
  //confirming correct number of keys if not 3 end
  if (Object.keys(pokemon).length !== 3) {
    return false;
  }
  //confirming keys are in validKeys if any are not present return false
  const containsAllKeys = Object.keys(pokemon).every(function (k) {
    return validKeys.includes(k);
  });

  return containsAllKeys;
}

  //attach click event to passed button
function addClickEvent(button, pokeName) {
  button.addEventListener("click", (event) => {
    pokemonRepository.showDetails(pokeName);
  });
}

//IIFE for getting and setting pokemonList 1.5 part 2
let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if (validatePokemon(pokemon) && validatePokemonKeys(pokemon)) {
      pokemonList.push(pokemon);
    } else {
      return;
    }
  }
  function getAll() {
    return pokemonList;
  }

  function getByName(name) {
    //trying to filter the list of objects into an array where the name matches
    let result = pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
    //returning the object if the array has values
    return result.length > 0 ? result : "This Pokemon does not exist";
  }

  //creates button for pokemon that is provided
  function addListItem(pokemonName) {
    //select ul of pokemon
    const pokemonPageList = document.querySelector(".pokemon-list");

    let listItem = document.createElement("li");
    let listButton = document.createElement("button");

    listButton.innerText = pokemonName;
    listButton.classList.add("button-pokemon");
    //add button to li element
    listItem.appendChild(listButton);
    //add li elements into ul parent
    pokemonPageList.appendChild(listItem);

    addClickEvent(listButton, pokemonName)
  }

  //display details for provided pokemon
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    getByName: getByName,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.add({
  name: "Bulbasaur",
  height: 7,
  types: ["grass", "poison"],
});

pokemonRepository.add({
  name: "Psyduck",
  height: 0.8,
  types: ["water"],
});

pokemonRepository.add({
  name: "Charmander",
  height: 0.6,
  types: ["fire"],
});

//1.5 part 2 ForEach using IIFE
pokemonRepository.getAll().forEach(function (item) {
  pokemonRepository.addListItem(item.name);
});



//trying to get pokemon by name as a test
//console.log(pokemonRepository.getByName("Psyduck"));
//console.log(pokemonRepository.getByName("Pikachu"));
