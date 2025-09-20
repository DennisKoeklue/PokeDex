
  let offset = 0;
  const limit = 20;
  let pokemons = [];
  const funFacts = [
    "Pikachu war ursprünglich nicht der Hauptcharakter, sondern Clefairy.",
    "Pikachu kommt von „Pika“ (Elektrizität) und „Chu“ (Maus).",
    "Charizard ist anfällig für Wasser, aber Torkoal nicht.",
    "Mewtwo ist ein Klon von Mew, aber das wurde später erklärt.",
    "Magikarp kann sich in Gyarados verwandeln, basierend auf einer chinesischen Legende.",
    "MissingNo ist ein Bug-Pokémon, das in der ersten Generation auftauchte.",
    "Mimikyu versteckt sich unter einem Pikachu-Kostüm, weil es es liebt.",
    "Snorlax blockiert oft Wege und muss mit einer Flöte geweckt werden.",
    "Pokémon-Designs basieren oft auf Mythologie oder realen Tieren.",
    "Jynx hatte anfangs ein Design, das wegen rassistischer Assoziationen geändert wurde."
];

let isLoading = false;
let allLoaded = false;
let debounceTimeout;

async function Init() {
   await loadPokemon()
    renderPokemon()
}

  async function loadPokemon() {
    try {
        getRandomFact();
        loadScreen();

        const data = await fetchPokemonList();
        const details = await fetchPokemonDetails(data.results);

        pokemons = pokemons.concat(details);
        offset += limit;
        return pokemons;
    } catch (error) {
        console.error("Fehler beim Laden der Pokémon:", error);
        return [];
    }
}

async function fetchPokemonList() {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
        console.error(`HTTP Fehler: ${res.status} ${res.statusText}`);
        return { results: [] };
    }

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
        console.error("Unerwartete API-Antwort:", data);
        return { results: [] };
    }

    return data;
}

async function fetchPokemonDetails(results) {
    const details = await Promise.all(
        results.map(p =>
            fetch(p.url)
                .then(r => r.json())
                .catch(err => {
                    console.error(`Fehler beim Laden von ${p.name}:`, err);
                    return null;
                })
        )
    );
    return details.filter(Boolean);
}

function renderPokemon(pokemonList = pokemons) {
   const renderContain = document.getElementById('render-container');

  if (!renderContain) {
    console.error('Element #render-container nicht gefunden!');
    return;
  }
  const html = pokemonList.map(templateRender).join('');
  renderContain.innerHTML = html;

  setTimeout(() => {
    document.getElementById("load-screen").style.display = "none";
    renderContain.style.display = "flex";
    if (document.getElementById('search-input').value.trim() === '') {
      document.querySelector(".load-more").style.display = "flex";
    }
  }, 1);
 }

document.getElementById('load-more-btn').addEventListener('click', async () =>{
if (isLoading) return;
  isLoading = true;
  await loadPokemon();
  renderPokemon();
  isLoading = false;
})

document.getElementById('search-input').addEventListener('input', function(event) {
  clearTimeout(debounceTimeout);
  const searchTerm = event.target.value.trim().toLowerCase();
  
  if (searchTerm.length < 3) {
    renderPokemon();
    document.querySelector(".load-more").style.display = "flex";
    noResultsDiv.style.display = "none";
    return;
  }

  debounceTimeout = setTimeout(() => {
    searchPokemon(searchTerm);

  }, 150);
})

function searchPokemon(searchTerm) {
  const noResultsDiv = document.getElementById("noResultsDiv");
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  if (filteredPokemons.length === 0) {
    renderPokemon([]);
    noResultsDiv.style.display = "flex";
  } else {
    renderPokemon(filteredPokemons);
    noResultsDiv.style.display = "none";
  }

  document.querySelector(".load-more").style.display = "none";
}

function closeOverlay(event) {
  const overlay = document.getElementById('overlay-div');
  overlay.style.display = 'none';
}

document.getElementById('overlay-div').addEventListener('click', closeOverlay);

function overlayRender(pokemonID) {
  const Overlay = document.getElementById(`overlay-div`)
  
  const pokemon = pokemons.find(p => p.id === pokemonID)
  let abilities = pokemon.abilities.map(a => a.ability.name)

  if (!pokemon) {
    console.error("Pokémon mit ID " + pokemonID + " nicht gefunden.");
    return;
  }
  
  Overlay.innerHTML = templateOverlay(pokemon)
  Overlay.style.display = "flex"

  const abilities_div = document.getElementById(`abilities_infos`)
  for (let index = 0; index < abilities.length; index++) {
    
    abilities_div.innerHTML += templateAbilities(abilities, index)
  }
}

function getRandomFact() {
    const FunFakts_div = document.getElementById('funfakts-input')
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    FunFakts_div.innerHTML = randomFunFakts(randomFact)
}
 
function setAktiv(element) {
    let allLinks = document.querySelectorAll('.nav a');
    
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active');
        }

    element.classList.add('active')
}

function showDetail(id) {
  let alldivs = document.querySelectorAll(`.tab-pane`);

  for (let i = 0; i < alldivs.length; i++) {
        alldivs[i].classList.remove('show');
        alldivs[i].classList.remove('active');
        }
        document.getElementById(id).classList.add('show');
        document.getElementById(id).classList.add('active')
}

function arrowRight(i) {
    if (i < pokemons.length) {
        i++;
    }
    else{
        i=1;
    }
    overlayRender(i);
}

function arrowLeft(i) {
    if (i > 1) {
        i--;
    }
    else{
        
        i = pokemons.length
    }
    overlayRender(i);
}

function loadScreen() {
  document.getElementById("load-screen").style.display = "flex";
    document.getElementById("render-container").style.display = "none";
    document.querySelector(".load-more").style.display = "none"; 
}
