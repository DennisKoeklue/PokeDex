function templateRender(i) {
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
</div>
    
    `
}