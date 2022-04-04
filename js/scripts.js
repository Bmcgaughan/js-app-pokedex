

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



//forEach loop 1.5
pokemonList.forEach(function(item){
    let pokemonHeight = item.height;

    if (pokemonHeight > 1){
        document.write(`<p>${item.name} (height: ${pokemonHeight}) - wow that is big!</p>`);
    } else {
        document.write(`<p>${item.name} (height: ${pokemonHeight}) </p>`);
    }
})

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
