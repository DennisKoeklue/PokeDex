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
            <a class="nav-link active" id="item1-tab" href="#item1">Main</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="item2-tab" href="#item2">Stats</a>
        </li>
        <li class="nav-item" role="presentation">
            <a class="nav-link" id="item3-tab" href="#item3">Evo Chain</a>
        </li>
    </ul>

    <!-- Tab Content (card-body) -->
    <div class="tab-content" id="pokemonTabsContent">
        <div class="tab-pane fade show active" id="item1">
            <p>Content for An item</p>
        </div>
        <div class="tab-pane fade" id="item2">
            <p>Content for A second item</p>
        </div>
        <div class="tab-pane fade" id="item3">
            <p>Content for A third item</p>
        </div>
    </div>
</div>`
}