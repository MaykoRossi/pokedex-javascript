// lightbox.js

// Função para abrir a lightbox
window.openLightbox = function(pokemon) {
  const pokemonNameElem = document.getElementById('pokemonName');
  const pokemonIdElem = document.getElementById('pokemonId');
  const pokemonTypesElem = document.getElementById('pokemonTypes');
  const pokemonImageElem = document.getElementById('pokemonImage');
  const pokemonAbilitiesElem = document.getElementById('pokemonAbilities');
  const pokemonMovesElem = document.getElementById('pokemonMoves');
  const pokemonWeaknessesElem = document.getElementById('pokemonWeaknesses');
  const pokemonAdvantagesElem = document.getElementById('pokemonAdvantages');
  const pokemonStatsContainer = document.getElementById('pokemonStatsContainer');
  const lightbox = document.getElementById('pokemonLightbox');

  if (!pokemonNameElem || !pokemonIdElem || !pokemonTypesElem || !pokemonImageElem ||
      !pokemonAbilitiesElem || !pokemonMovesElem || !pokemonWeaknessesElem ||
      !pokemonAdvantagesElem || !pokemonStatsContainer || !lightbox) {
      console.error('Um ou mais elementos necessários para a lightbox não foram encontrados.');
      return;
  }

  pokemonNameElem.textContent = pokemon.name.toUpperCase();
  pokemonIdElem.textContent = `#${pokemon.number}`;
  pokemonTypesElem.textContent = `Types: ${pokemon.types.join(', ')}`;
  pokemonImageElem.src = pokemon.photo;
  pokemonImageElem.alt = pokemon.name;
  pokemonImageElem.style.maxWidth = '150px'; // Ajuste do tamanho da imagem
  setLightboxBackground(pokemon.types);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.number}`)
      .then(response => response.json())
      .then(data => {
          const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
          pokemonAbilitiesElem.textContent = `Abilities: ${abilities}`;

          const moves = data.moves.slice(0, 4).map(move => move.move.name).join(', ');
          pokemonMovesElem.textContent = `Moves: ${moves}`;

          const weaknesses = getWeaknesses(data.types.map(typeInfo => typeInfo.type.name));
          pokemonWeaknessesElem.textContent = `Weaknesses: ${weaknesses.join(', ')}`;

          const advantages = getAdvantages(data.types.map(typeInfo => typeInfo.type.name));
          pokemonAdvantagesElem.textContent = `Advantages: ${advantages.join(', ')}`;

          pokemonStatsContainer.innerHTML = data.stats.map(stat => {
              const statName = stat.stat.name.replace('-', ' ');
              const statValue = stat.base_stat;
              const statColor = typeColors[pokemon.types[0]] || '#000'; // Cor do tipo principal
              return `
                  <div class="stat-bar">
                      <span>${statName}</span>
                      <div class="bar-container">
                          <div class="bar ${stat.stat.name}" style="width: ${statValue}%; background-color: ${statColor};">${statValue}</div>
                      </div>
                  </div>
              `;
          }).join('');
      })
      .catch(error => {
          console.error('Erro ao carregar os detalhes do Pokémon:', error);
      });

  lightbox.style.display = 'flex';
  setTimeout(() => {
      lightbox.classList.add('show');
  }, 10);
}

// Função para fechar a lightbox
function closeLightbox() {
  const lightbox = document.getElementById('pokemonLightbox');
  if (lightbox) {
      lightbox.classList.remove('show');
      setTimeout(() => {
          lightbox.style.display = 'none';
      }, 300); // Tempo deve corresponder ao tempo de transição CSS
  }
}

// Função para definir o fundo da lightbox com base nos tipos
function setLightboxBackground(types) {
  const lightboxContent = document.querySelector('.lightbox-content');
  if (lightboxContent) {
      if (types.length === 1) {
          lightboxContent.style.backgroundColor = typeColors[types[0]] || '#FFF';
      } else if (types.length > 1) {
          const gradient = `linear-gradient(${typeColors[types[0]]}, ${typeColors[types[1]]})`;
          lightboxContent.style.background = gradient;
      } else {
          lightboxContent.style.backgroundColor = '#FFF';
      }
  }
}

// Função para obter as fraquezas dos tipos
function getWeaknesses(types) {
  const typeWeaknesses = {
      normal: ['fighting'],
      fire: ['water', 'rock', 'ground'],
      water: ['electric', 'grass'],
      electric: ['ground'],
      grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
      ice: ['fire', 'fighting', 'rock', 'steel'],
      fighting: ['flying', 'psychic', 'fairy'],
      poison: ['ground', 'psychic'],
      ground: ['water', 'grass', 'ice'],
      flying: ['electric', 'ice', 'rock'],
      psychic: ['bug', 'ghost', 'dark'],
      bug: ['fire', 'flying', 'rock'],
      rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
      ghost: ['ghost', 'dark'],
      dragon: ['ice', 'dragon', 'fairy'],
      dark: ['fighting', 'bug', 'fairy'],
      steel: ['fire', 'fighting', 'ground'],
      fairy: ['poison', 'steel'],
  };

  let weaknesses = new Set();
  types.forEach(type => {
      (typeWeaknesses[type] || []).forEach(weakness => weaknesses.add(weakness));
  });
  return Array.from(weaknesses);
}

// Função para obter as vantagens dos tipos
function getAdvantages(types) {
  const typeAdvantages = {
      normal: [],
      fire: ['grass', 'ice', 'bug', 'steel'],
      water: ['fire', 'ground', 'rock'],
      electric: ['water', 'flying'],
      grass: ['water', 'ground', 'rock'],
      ice: ['grass', 'ground', 'flying', 'dragon'],
      fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
      poison: ['grass', 'fairy'],
      ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
      flying: ['grass', 'fighting', 'bug'],
      psychic: ['fighting', 'poison'],
      bug: ['grass', 'psychic', 'dark'],
      rock: ['fire', 'ice', 'flying', 'bug'],
      ghost: ['ghost', 'psychic'],
      dragon: ['dragon'],
      dark: ['ghost', 'psychic'],
      steel: ['ice', 'rock', 'fairy'],
      fairy: ['fighting', 'bug', 'dark'],
  };

  let advantages = new Set();
  types.forEach(type => {
      (typeAdvantages[type] || []).forEach(advantage => advantages.add(advantage));
  });
  return Array.from(advantages);
}

// Cores dos tipos
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Adicionar o evento de clique ao botão de fechar
document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.getElementById('lightboxClose');
  if (closeButton) {
      closeButton.addEventListener('click', () => {
          closeLightbox();
      });
  } else {
      console.error('Botão de fechar não encontrado.');
  }

  // Adicionar evento de teclado para fechar a lightbox
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
  });
});
