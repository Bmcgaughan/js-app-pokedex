//checks to see if pokemon being added is an object
function validatePokemon(pokemon) {
  return typeof pokemon === "object" ? true : false;
}

//checking to see if object has 3 keys that match pokemon object
function validatePokemonKeys(pokemon) {
  let validKeys = ["name", "height", "types"];
  //confirming correct number of keys if not 3 end
  if (Object.keys(pokemon).length !== 3) {
    return false;
  }
  //confirming keys are in validKeys if any are not present return false
  let containsAllKeys = Object.keys(pokemon).every(function (k) {
    return validKeys.includes(k);
  });

  return containsAllKeys;
}

//IIFE for getting and setting pokemonList 1.5 part 2
let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if (validatePokemon(pokemon) && validatePokemonKeys(pokemon)) {
      console.log(pokemon);
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
      let result = pokemonList.filter(function(pokemon){
          return pokemon.name === name
      })
      //returning the object if the array has values
      return (result.length > 0) ? result : 'This Pokemon does not exist'
  }

  return {
    add: add,
    getAll: getAll,
    getByName: getByName,
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
  let pokemonHeight = item.height;

  if (pokemonHeight > 1) {
    document.write(
      `<p>${item.name} (height: ${pokemonHeight}) - wow that is big!</p>`
    );
  } else {
    document.write(`<p>${item.name} (height: ${pokemonHeight}) </p>`);
  }
});

//trying to get pokemon by name
console.log(pokemonRepository.getByName("Psyduck"));
console.log(pokemonRepository.getByName("Pikachu"));

///previous excercize code:

// let pokemonList = [];

// pokemonList.push({
//   name: "Bulbasaur",
//   height: 7,
//   types: ["grass", "poison"],
// });

// pokemonList.push({
//   name: "Psyduck",
//   height: 0.8,
//   types: ["water"],
// });

// pokemonList.push({
//   name: "Charmander",
//   height: 0.6,
//   types: ["fire"],
// });

//forEach loop 1.5
// pokemonList.forEach(function (item) {
//   let pokemonHeight = item.height;

//   if (pokemonHeight > 1) {
//     document.write(
//       `<p>${item.name} (height: ${pokemonHeight}) - wow that is big!</p>`
//     );
//   } else {
//     document.write(`<p>${item.name} (height: ${pokemonHeight}) </p>`);
//   }
// });

//for loop 1.3
// for (i = 0; i < pokemonList.length; i++) {
//     //set pokemonHeight
//   let pokemonHeight = pokemonList[i].height;

//   //check pokemon size and print if over 1
//   if (pokemonHeight > 1) {
//     document.write(`<p>${pokemonList[i].name} (height: ${pokemonHeight}) - wow that is big!</p>`);
//   } else {
//     document.write(`<p>${pokemonList[i].name} (height: ${pokemonHeight}) </p>`);
//   }
// }
