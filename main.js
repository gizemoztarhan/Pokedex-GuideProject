
const searchInput = document.querySelector('.search-input');
const card_container = document.querySelector('#card-container');
const searchBtn = document.querySelector('#search-btn');
const pokedex_search = document.querySelector('.pokedex-search');

const pokemon_count = 151; 

const bg_color = {
    fire: "#FF7043",  
    grass: "#66BB6A", 
    electric: "#FFEB3B",  
    water: "#4FC3F7",  
    ground: "#A1887F",  
    rock: "#BDBDBD", 
    fairy: "#F48FB1",  
    poison: "#9C27B0",  
    bug: "#8BC34A",  
    dragon: "#AB47BC",  
    psychic: "#BA68C8",  
    flying: "#81D4FA", 
    fighting: "#FF5722",
    normal: "#DCE775" ,
}


searchBtn.addEventListener('click', () => {
  pokedex_search.classList.toggle('active');
});


searchInput.addEventListener('input', (e) => {
  const searchValue = searchInput.value.toLowerCase();
  const pokemonNames = document.querySelectorAll('.card-body-name');

  pokemonNames.forEach((pokemonNames) => {
    if(pokemonNames.innerHTML.toLowerCase().includes(searchValue)) {
     pokemonNames.parentElement.parentElement.style.display = "block"
    } else {
     pokemonNames.parentElement.parentElement.style.display = "none"
    }
   })

});


const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card-box');

  const pokemonId = pokemon.id.toString().padStart(3, '0');

  const pokemonType = pokemon.types[0].type.name;

  const pokemonBg = bg_color[pokemonType];

  cardDiv.style.backgroundColor = `${pokemonBg}`;

  cardDiv.innerHTML = `
    <div class="card-box-image">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
    </div>
    <div class="card-body">
      <span class="card-body-id">#${pokemonId}</span>
      <h3 class="card-body-name">${(pokemon.name)}</h3>
      <div class="card-body-info">
        <small class="card-body-exp">
          <i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp
        </small>
        <small class="card-body-weight">
          <i class="fa-solid fa-weight-scale"></i> ${pokemon.weight} kg
        </small>
      </div>
      <div class="card-body-type">
        <i class="fa-brands fa-uncharted"></i> ${pokemonType}
      </div>
    </div>
  `;

  card_container.appendChild(cardDiv);
};


fetchPokemons();