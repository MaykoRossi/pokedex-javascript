const pokeApi = {};

// Função para converter os detalhes da API para o formato da classe Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  pokemon.types = types;
  pokemon.type = types[0];

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

// Função para obter detalhes de um Pokémon
pokeApi.getPokemonDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon);
};

// Função para obter uma lista de Pokémons
pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => Promise.all(pokemons.map(pokeApi.getPokemonDetail)));
};

// Função para procurar um Pokémon pelo nome
pokeApi.getPokemonByName = name => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon);
};
