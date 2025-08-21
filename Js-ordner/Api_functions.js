
    let offset = 0;
  const limit = 20;
  let pokemons = [];


async function Init() {
   await loadPokemon()
    renderPokemon()
}

  async function loadPokemon() {
    try {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(apiUrl);

      if (!res.ok) {
      console.error(`HTTP Fehler: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data.results)) {
  console.error("Unerwartete API-Antwort:", data);
  return [];
}

    const details = await Promise.all(
      data.results.map(p =>
        fetch(p.url)
          .then(r => r.json())
          .catch(err => {
            console.error(`Fehler beim Laden von ${p.name}:`, err);
            return null;
          })
      )
    );

    pokemons = pokemons.concat(details.filter(Boolean));
    offset += limit;
    return pokemons;

  } catch (error) {
    console.error("Fehler beim Laden der Pokémon:", error);
    return [];
  }
  }

function renderPokemon() {
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

document.getElementById('load-more-btn').addEventListener('click', async () =>{
  await loadPokemon()
  renderPokemon()
})
 
