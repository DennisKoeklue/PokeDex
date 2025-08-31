function templateRender(pokemon) {
  let pokemonNamelowcase = pokemon.name;
  let pokemonNameuppercase = pokemonNamelowcase.charAt(0).toUpperCase() + pokemonNamelowcase.slice(1).toLowerCase();
  let typ = pokemon.types.map(t => t.type.name).join(', ');
  let maintype = pokemon.types[0].type.name;


    return`
    <div class="card" onclick="overlayRender(${pokemon.id})" id ="${pokemon.id}">
    <div class="card-text-1">
    <h5 class="card-title">#${pokemon.id}</h5>
    <h5 class="card-title">${pokemonNameuppercase}</h5>
    </div>
    <div class="selector"></div>
    <div class="poke-img-container bg_${maintype}">
  <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
    </div>
    <div class="selector"></div>
  <div class="type-pokemon">
  <span>${typ} </span>
  </div>
</div>
    
    `
}

function templateOverlay(pokemon) {
  let pokemonNamelowcase = pokemon.name;
  let pokemonNameuppercase = pokemonNamelowcase.charAt(0).toUpperCase() + pokemonNamelowcase.slice(1).toLowerCase();
  let typ = pokemon.types.map(t => t.type.name).join(', ');
  let maintype = pokemon.types[0].type.name;
  return`
   <div class="card card2" onclick="event.stopPropagation()">
    <div class="card-text-1 card-overly-text">
        <h5 class="card-title">#${pokemon.id}</h5>
        <h5 class="card-title">${pokemonNameuppercase}</h5>
        <button type="button" class="btn-close" aria-label="Close" onclick="closeOverlay()"></button>
    </div>
    <div class="selector"></div>
    <div class="poke-img-container-overlay bg_${maintype}">
        <img src="${pokemon.sprites.front_default}" class="card-img-top-overlay" alt="${pokemonNameuppercase}">
    </div>
    <div class="selector"></div>
    <div class="type-div">
        <Span>${typ}</Span>
    </div>
    <div class="selector"></div>


    <ul class="nav nav-pills" id="pokemonTabs" role="tablist">
        <li class="nav-item" role="presentation">
            <a class="nav-link active id="item1-tab" onclick ="showDetail('Main'); setAktiv(this)">Main</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="item2-tab" onclick ="showDetail('Stats'); setAktiv(this)">Stats</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="item3-tab" onclick ="showDetail('abilities_names'); setAktiv(this)">Abilities</a>
        </li>
    </ul>

    <!-- Tab Content (card-body) -->
    <div class="tab-content" id="pokemonTabsContent">
        <div class="tab-pane fade show active" id="Main">
            <div class = "main_stats" id = "main_stats">
            <span>Name :</span>
            <span>Height :</span>
            <span>Weight :</span>
            </div>
             <div class = "main_number" id = "main_number">
            <span>${pokemonNameuppercase}</span>
            <span>${pokemon.height}</span>
            <span>${pokemon.weight}</span>

            </div>
        </div>
        <div class="tab-pane fade" id="Stats">
            <div class = "stats" id = "stats">
            <span>HP :</span>
            <span>Attack :</span>
            <span>Defense :</span>
            <span>Special-Attack :</span>
            <span>Special-Defends :</span>
            <span>Speed :</span>
            <span>Base experience :</span>
            </div>
             <div class = "stats_number" id = "stats_number">
            <span>${pokemon.stats[0].base_stat}</span>
            <span>${pokemon.stats[1].base_stat}</span>
            <span>${pokemon.stats[2].base_stat}</span>
            <span>${pokemon.stats[3].base_stat}</span>
            <span>${pokemon.stats[4].base_stat}</span>
            <span>${pokemon.stats[5].base_stat}</span>
            <span>${pokemon.base_experience}</span>
            </div>
        </div>
        <div class="tab-pane fade" id="abilities_names">
             <div class = "abilities_infos" id = "abilities_infos">
            
            </div>
        </div>
    </div>
</div>`
}

function templateAbilities(abilities, i) {
    let abilitiesLower = abilities[i]
    let abilitiesUpper = abilitiesLower.charAt(0).toUpperCase() + abilitiesLower.slice(1).toLowerCase();
    return`
    <span>${abilitiesUpper}</span>
    `
}

function randomFunFakts(randomFact) {
    return`
    ${randomFact}
    `
}