//removes hidden class for loading message
function showLoadingMessage() {
  const loadingMessage = document.querySelector('.page-loading');
  loadingMessage.classList.remove('hidden');
}

//hides loading message
function hideLoadingMessage() {
  const loadingMessage = document.querySelector('.page-loading');
  loadingMessage.classList.add('hidden');
}

//checks to see if pokemon being added is an object
function validatePokemon(pokemon) {
  return typeof pokemon === 'object' ? true : false;
}

//checking to see if object has 3 keys that match pokemon object
function validatePokemonKeys(pokemon) {
  const validKeys = ['name', 'height', 'types'];
  //confirming correct number of keys if not 3 end
  if (Object.keys(pokemon).length !== 3) {
    return false;
  }
  //confirming keys are in validKeys if any are not present return false - removed for now
  const containsAllKeys = Object.keys(pokemon).every(function (k) {
    return validKeys.includes(k);
  });

  return containsAllKeys;
}

//attach click event to passed button
function addClickEvent(button, pokeObject) {
  button.addEventListener('click', (event) => {
    pokemonRepository.showDetails(pokeObject);
  });
}

//IIFE for getting and setting pokemonList 1.5 part 2
let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (validatePokemon(pokemon)) {
      pokemonList.push(pokemon);
    }
    //removed extra validation for now
    // if (validatePokemon(pokemon) && validatePokemonKeys(pokemon)) {
    //   pokemonList.push(pokemon);
    // } else {
    //   return;
    // }
  }

  function getAll() {
    return pokemonList;
  }

  function getByName(name) {
    //trying to filter the list of objects into an array where the name matches
    const result = pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
    //returning the object if the array has values
    return result.length > 0 ? result : 'This Pokemon does not exist';
  }

  //creates button for pokemon object that is provided
  function addListItem(pokemonObj) {
    //select ul of pokemon
    const pokemonPageList = document.querySelector('.pokemon-list');

    const listItem = document.createElement('li');
    const listButton = document.createElement('button');

    listButton.innerText = pokemonObj.name;
    listButton.classList.add('button-pokemon');
    //add button to li element
    listItem.appendChild(listButton);
    //add li elements into ul parent
    pokemonPageList.appendChild(listItem);

    addClickEvent(listButton, pokemonObj);
  }

  //display details for provided pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          hideLoadingMessage();
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    getByName: getByName,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//get full list of pokemon from API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//pull and display all pokemon in repo
pokemonRepository.getAll().forEach(function (item) {
  pokemonRepository.addListItem(item.name);
});

//trying to get pokemon by name as a test
//console.log(pokemonRepository.getByName("Psyduck"));
//console.log(pokemonRepository.getByName("Pikachu"));
