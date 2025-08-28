
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


async function Init() {
   await loadPokemon()
    renderPokemon()
}

  async function loadPokemon() {
  try {
    getRandomFact()
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
    }, 3500);
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
    // Schritt 1: Hol alle <a>-Tags in der Sidebar
    let allLinks = document.querySelectorAll('.nav a');
    

    // Schritt 2: Entferne bei allen Links die "active"-Klasse. mit for geht er alle links durch.
    for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active');
        }

        
    // Schritt 3: Füge dem aktuell geklickten Link die "active"-Klasse hinzu
    element.classList.add('active')
    //showDetail()

}

function showDetail(id) {
  let alldivs = document.querySelectorAll(`.tab-pane`);

  for (let i = 0; i < alldivs.length; i++) {
        alldivs[i].classList.remove('show');
        alldivs[i].classList.remove('active');
        
        }

        document.getElementById(id).classList.add('show'); //ds : Main , Stats , Evo_Chain
        document.getElementById(id).classList.add('active')
}
