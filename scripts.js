const pokedex = document.getElementById('pokedex');

const getPoke = () => {
    const promises = [];
    for (let i = 1; i <= 807; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    };
    //resolve all promises into one object//
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            moves: data.moves.map(move => move.move.name).join(', '),
            type: data.types.map(type => type.type.name).join(', '),
        }));
       getSprite(pokemon);
    });
};

const getSprite = (pokemon) => {
    const pokeHTML = pokemon.map(pokemon => `
    <li class="card">
        <img class="card-image" src="${pokemon.image}" />
        <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
        <p class="card-subtitle">${pokemon.moves}</p>
        <p class="card-subtitle">${pokemon.type}</p>
    </li>
    `)
    pokedex.innerHTML = pokeHTML;
}

getPoke();


