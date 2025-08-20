const TYPE_COLORS = {
      grass: "#78C850", fire: "#F08030", water: "#6890F0", bug: "#A8B820", normal: "#A8A878",
      poison: "#A040A0", electric: "#F8D030", ground: "#E0C068", fairy: "#EE99AC", fighting: "#C03028",
      psychic: "#F85888", rock: "#B8A038", ghost: "#705898", ice: "#98D8D8", dragon: "#7038F8",
      dark: "#705848", steel: "#B8B8D0", flying: "#A890F0"
    };


    let offset = 0;
  const limit = 20;
  let pokemons = [];


async function Init() {
   await loadPokemon()
    renderTest()
}

  async function loadPokemon() {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    const details = await Promise.all(
      data.results.map(p => fetch(p.url).then(r => r.json()))
    );
    pokemons = pokemons.concat(details);
    offset += limit;
    return pokemons
  }

function renderTest() {
  let renderContain = document.getElementById('render-container');
  if (renderContain) {
    renderContain.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
      renderContain.innerHTML += templateRender(i);
    }
  } else {
    console.error('Element #render-container nicht gefunden!');
  }
 }

