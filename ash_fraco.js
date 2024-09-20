let currentPokemonId = 1;

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

document.getElementById('search-btn').addEventListener('click', () => {
    const inputId = document.getElementById('pokemon-id-input').value;
    if (inputId) {
        currentPokemonId = parseInt(inputId);
        fetchPokemon(currentPokemonId);
    }
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            updatePokemonData(data);
        })
        .catch(error => {
            console.error("Erro ao buscar o Pokémon:", error);
            alert("Pokémon não encontrado. Tente outro ID.");
        });
}

function updatePokemonData(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
    const pokemonType = pokemon.types[0].type.name;
    document.getElementById('pokemon-type').textContent = `Type: ${pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}`;
    updateBackground(pokemonType);
}

function updateBackground(type) {
    let color;
    switch (type) {
        case 'fire':
            color = 'red';
            break;
        case 'water':
            color = 'blue';
            break;
        case 'grass':
            color = 'green';
            break;
        case 'electric':
            color = 'yellow';
            break;
        case 'psychic':
            color = 'purple';
            break;
        case 'ice':
            color = 'lightblue';
            break;
        case 'rock':
            color = 'gray';
            break;
        case 'ground':
            color = 'brown';
            break;
        case 'poison':
            color = 'violet';
            break;
        default:
            color = 'white';
    }
    document.body.style.backgroundColor = color;
}
fetchPokemon(currentPokemonId);
