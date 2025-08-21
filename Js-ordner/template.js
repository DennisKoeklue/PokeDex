function templateRender(i) {
  let pokemonNamelowcase = pokemons[i].name
  let pokemonNameuppercase = pokemonNamelowcase.charAt(0).toUpperCase() + pokemonNamelowcase.slice(1).toLowerCase();
  let typ = pokemons[i].types.map(t => t.type.name).join(', ')
  let maintype = pokemons[i].types[0].type.name;


    return`
    <div class="card">
    <div class="card-text-1">
    <h5 class="card-title">#${pokemons[i].id}</h5>
    <h5 class="card-title">${pokemonNameuppercase}</h5>
    </div>
    <div class="selector"></div>
    <div class="poke-img-container bg_${maintype}">
  <img src="${pokemons[i].sprites.front_default}" class="card-img-top" alt="${pokemons[i].name}">
    </div>
    <div class="selector"></div>
  <div class="type-pokemon">
  <span>${typ} </span>
  </div>
</div>
    
    `
}

function templateOverlay(i) {
  return`
    <div class="card">
    <div class="card-text-1">
    <h5 class="card-title">#${pokemons[i].id}</h5>
    <h5 class="card-title">${pokemons[i].name}</h5>
    </div>
    <div class="selector"></div>
    <div class="poke-img-container">
  <img src="${pokemons[i].sprites.front_default}" class="card-img-top" alt="${pokemons[i].name}">
    </div>
    <div class="selector"></div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
  </ul>
</div>`
}