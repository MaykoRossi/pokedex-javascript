class Pokemon {
  constructor(number, name, types = [], photo, moves = [], weaknesses = [], region, abilities = []) {
      this.number = number;             // Número de identificação do Pokémon
      this.name = name;                 // Nome do Pokémon
      this.types = Array.isArray(types) ? types : [];           // Garantir que types seja um array
      this.photo = photo;               // URL da imagem do Pokémon
      this.moves = Array.isArray(moves) ? moves : [];           // Garantir que moves seja um array
      this.weaknesses = Array.isArray(weaknesses) ? weaknesses : []; // Garantir que weaknesses seja um array
      this.region = region;             // Região onde o Pokémon pode ser encontrado
      this.abilities = Array.isArray(abilities) ? abilities : [];   // Garantir que abilities seja um array
  }
  
  getPrimaryType() {
      return this.types[0] || null;   // Retorna o tipo principal do Pokémon ou null se não houver tipos
  }

  getTypeColors() {
      return this.types.map(type => typeColors[type] || '#FFF'); // Retorna as cores dos tipos, ou cor padrão se tipo não definido
  }
}
