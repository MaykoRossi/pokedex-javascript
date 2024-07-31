document.addEventListener('DOMContentLoaded', () => {
  const pokemonList = document.getElementById('pokemonList');
  const loadMoreButton = document.getElementById('loadMoreButton');
  const limit = 15;
  let offset = 0;
  const maxRecords = 151;

  // Função para converter Pokémon em HTML
  function convertPokemonToList(pokemon) {
    return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
      </li>
    `;
  }

  // Função para carregar Pokémons
  function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToList).join('');
      pokemonList.innerHTML += newHtml;

      // Verifica se atingiu o limite máximo de Pokémons
      if (offset + limit >= maxRecords) {
        loadMoreButton.style.display = 'none'; // Oculta o botão 'load more'
      }
    });
  }

  // Carrega os primeiros Pokémons
  loadPokemonItems(offset, limit);

  // Adiciona evento de click ao botão 'load more'
  loadMoreButton.addEventListener('click', () => {
    offset += limit;

    // Verifica se há mais Pokémons para carregar
    if (offset < maxRecords) {
      loadPokemonItems(offset, limit);
    } else {
      loadMoreButton.style.display = 'none'; // Oculta o botão 'load more' se todos os Pokémons foram carregados
    }
  });

  // Adiciona evento de clique ao listar de Pokémons
  pokemonList.addEventListener('click', (event) => {
    const target = event.target.closest('.pokemon');
    if (target) {
      event.preventDefault();
      const pokemonNumber = target.querySelector('.number').textContent.slice(1); // Remove o #
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => response.json())
        .then(data => {
          const pokemon = {
            name: data.name,
            number: data.id,
            types: data.types.map(typeInfo => typeInfo.type.name),
            photo: data.sprites.front_default,
          };
          if (window.openLightbox) {
            window.openLightbox(pokemon); // Chama a função global openLightbox
          } else {
            console.error('A função openLightbox não está disponível.');
          }
        })
        .catch(error => {
          console.error('Erro ao carregar os detalhes do Pokémon:', error);
        });
    }
  });

  // Certifique-se de que `openLightbox` e outros métodos estão definidos no escopo global
});
