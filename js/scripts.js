
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

//attach click event to the button
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

  //gets pokemon details and returns the object
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function getByName(name) {
    //trying to filter the list of objects into an array where the name matches
    const result = pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
    //returning the object if the array has values
    return result.length > 0 ? result : 'This Pokemon does not exist';
  }

    function addListItem(pokemon){
      const pokemonPageList = $('#pokemon-list');

      $('#pokemon-list').append(
        $('<button></button>').append(pokemon.name).addClass('list-group-item list-group-item-action pokemon-list-item')
      )
   
    }

  // //creates button for pokemon object that is provided
  // function addListItem(pokemonObj) {
  //   //select ul of pokemon
  //   const pokemonPageList = document.querySelector('.pokemon-list');

  //   const listItem = document.createElement('li');
  //   const listButton = document.createElement('button');

  //   listButton.innerText = pokemonObj.name;
  //   listButton.classList.add('button-pokemon');
  //   //add button to li element
  //   listItem.appendChild(listButton);
  //   //add li elements into ul parent
  //   pokemonPageList.appendChild(listItem);

  //   addClickEvent(listButton, pokemonObj);
  // }

  function loadList() {
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
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //adding event handler for clicking outside modal
  const modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //close modal on escape key
  window.addEventListener('keydown', (e) => {
    const modalContainer = document.querySelector('#modal-container');

    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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

//iterates types and makes elements for name and icon
function addTypes(types) {
  let contentTypes = document.createElement('div');
  contentTypes.classList.add('modal-type-wrapper');

  types.forEach((itm) => {
    const indTypeContainer = document.createElement('div');
    indTypeContainer.classList.add('type-container');

    const typeNameElement = document.createElement('p');
    typeNameElement.classList.add('type-name');
    typeNameElement.innerText = itm.type.name;

    //creating a wrapper to scale svg icons
    const typeIconWrapper = document.createElement('div');
    typeIconWrapper.classList.add('icon-wrapper');

    const typeIconElement = document.createElement('img');
    typeIconElement.src = `img/types/${itm.type.name}.svg`;
    typeIconElement.classList.add('type-svg');

    typeIconWrapper.appendChild(typeIconElement);

    indTypeContainer.appendChild(typeIconWrapper);
    indTypeContainer.appendChild(typeNameElement);
    contentTypes.appendChild(indTypeContainer);
  });
  //returns type elements to be added
  return contentTypes;
}

//element generator
function generateElement(type, cls, text) {
  let newElement = document.createElement(type);
  if (cls) {
    newElement.classList.add(cls);
  }
  if (text) {
    newElement.innerHTML = text;
  }
  return newElement;
}

function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');
  //clear current modal and re-create
  modalContainer.innerHTML = '';

  let modal = generateElement('div', 'modal', null);
  let modalHeader = generateElement('div', 'modal-header', null);
  let titleElement = generateElement('h1', null, pokemon.name);

  //set modal title
  modalHeader.appendChild(titleElement);

  let closeButtonWrapper = generateElement('div', 'modal-close', null);
  let closeButtonElement = generateElement(
    'button',
    'modal-close__button',
    'Close'
  );

  closeButtonElement.addEventListener('click', hideModal);
  closeButtonWrapper.appendChild(closeButtonElement);

  //modal body
  let modalBody = generateElement('div', 'modal-body', null);

  let contentImage = generateElement('img', 'modal-pokemon-image', null);
  contentImage.src = pokemon.imageUrl;

  //gathering type information and storing
  let pokemonTypeElements;
  if (pokemon.types) {
    pokemonTypeElements = addTypes(pokemon.types);
  }

  //add to modal-body
  modalBody.appendChild(contentImage);

  //iterating object to grab attributes for display - if there is a need to add more
  for (const key in pokemon) {
    if (key === 'height' || key === 'weight') {
      let attributeAdd = generateElement('p', null, `${key}: ${pokemon[key]}`);
      modalBody.appendChild(attributeAdd);
    }
  }

  //add all modal elements into HTML
  modal.appendChild(closeButtonWrapper);
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);

  if (pokemonTypeElements) {
    modal.appendChild(pokemonTypeElements);
  }
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
}

function hideModal() {
  const modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

//trying to get pokemon by name as a test
//console.log(pokemonRepository.getByName("Psyduck"));
//console.log(pokemonRepository.getByName("Pikachu"));
