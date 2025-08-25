
  let offset = 0;
  const limit = 20;
  let pokemons = [];


async function Init() {
   await loadPokemon()
    renderPokemon()
}

  async function loadPokemon() {
  try {
    document.getElementById("load-screen").style.display = "flex";
    document.getElementById("render-container").style.display = "none";
    document.querySelector(".load-more").style.display = "none"; 

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

function renderPokemon(pokemonList = pokemons) {
  let renderContain = document.getElementById('render-container');
  if (renderContain) {
    renderContain.innerHTML = "";
    for (let i = 0; i < pokemonList.length; i++) {
      renderContain.innerHTML += templateRender(pokemonList[i]);
    }

    setTimeout(() => {
      document.getElementById("load-screen").style.display = "none";
      renderContain.style.display = "flex";
      if (document.getElementById('search-input').value.trim() === '') {
        document.querySelector(".load-more").style.display = "flex";
      }
    }, 3000);
  } else {
    console.error('Element #render-container nicht gefunden!');
  }
 }

document.getElementById('load-more-btn').addEventListener('click', async () =>{
  await loadPokemon()
  renderPokemon()
})

document.getElementById('search-input').addEventListener('input', function(event) {
  searchPokemon(event.target.value);
})

function searchPokemon(searchTerm) {
  const trimmedTerm = searchTerm.trim().toLowerCase();

  if (trimmedTerm.length === 0) {
  renderPokemon();
  document.querySelector(".load-more").style.display = "flex"
  return;
}

if (trimmedTerm.length < 3) {
  document.querySelector(".load-more").style.display = "none"
  return;
}

 const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(trimmedTerm)
  );

  renderPokemon(filteredPokemons);

}

//Erstmal als test da lassen 
// Funktion zum Schließen des Overlays
function closeOverlay(event) {
  const overlay = document.getElementById('overlay-div');
  overlay.style.display = 'none';
}

// Wenn auf das Overlay außerhalb der Karte geklickt wird, Overlay schließen
document.getElementById('overlay-div').addEventListener('click', closeOverlay);

// Stoppe das Bubbling nur innerhalb der Karte
document.querySelector('.card2').addEventListener('click', function(event) {
  event.stopPropagation(); // Verhindert das Schließen des Overlays
});

function overlayRender(pokemonID) {
  const Overlay = document.getElementById(`overlay-div`)

  const pokemon = pokemons.find(p => p.id === pokemonID)

  if (!pokemon) {
    console.error("Pokémon mit ID " + pokemonID + " nicht gefunden.");
    return;
  }
   
  Overlay.innerHTML = templateOverlay(pokemon)
  Overlay.style.display = "flex"
}
 
