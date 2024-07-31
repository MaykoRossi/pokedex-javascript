# Pokédex

Bem-vindo ao projeto Pokédex! Este projeto é uma aplicação web interativa que exibe informações sobre os 151 Pokémon da primeira geração. O objetivo principal é permitir que os usuários visualizem detalhes dos Pokémon, como suas habilidades, movimentos, fraquezas e vantagens, de maneira fácil e atraente.

## Funcionalidades

- **Exibição de Pokémon**: Lista os 151 Pokémon da primeira geração com seus nomes e imagens.
- **Detalhes do Pokémon**: Ao clicar em um Pokémon, uma lightbox é exibida com informações detalhadas, incluindo:
  - Nome
  - Número da Pokédex
  - Tipos
  - Foto
  - Habilidades
  - Movimentos
  - Fraquezas
  - Vantagens
  - Estatísticas (com barras de progresso representando os valores)
- **Lightbox**: Exibe detalhes em uma janela modal com fundo colorido baseado nos tipos do Pokémon.
- **Fechamento da Lightbox**: A lightbox pode ser fechada clicando no botão de fechar ou clicando fora do conteúdo da lightbox. Também é possível fechá-la pressionando a tecla 'ESC'.

## Tecnologias Utilizadas

- **HTML5**: Estrutura básica da página.
- **CSS3**: Estilização da interface, incluindo layout da lightbox e barras de progresso.
- **JavaScript**: Lógica para carregamento dinâmico de dados dos Pokémon e interatividade da lightbox.
- **PokeAPI**: API externa utilizada para obter informações detalhadas sobre os Pokémon.

## Estrutura do Projeto

- `index.html`: Página principal com a estrutura do projeto e elementos da Pokédex.
- `styles.css`: Arquivo de estilos para a interface do usuário.
- `lightbox.js`: Script para controlar a exibição e o fechamento da lightbox, bem como o carregamento dos dados dos Pokémon.
- `app.js`: Script para carregar a lista de Pokémon e lidar com eventos de clique.
