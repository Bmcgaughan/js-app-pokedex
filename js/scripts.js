//setting empty array
let pokemonList = [];

pokemonList.push({
  name: "Bulbasaur",
  height: 7,
  types: ["grass", "poison"],
});

pokemonList.push({
  name: "Psyduck",
  height: 0.8,
  types: ["water"],
});

pokemonList.push({
  name: "Charmander",
  height: 0.6,
  types: ["fire"],
});

//for loop 1.3
for (i = 0; i < pokemonList.length; i++) {
    //set pokemonHeight
  let pokemonHeight = pokemonList[i].height;

  //check pokemon size and print if over 1
  if (pokemonHeight > 1) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonHeight}) - wow that is big!</p>`);
  } else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonHeight}) </p>`);
  }
}
