let no = 40;

function fetchData() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${no}`)
    .then((response) => response.json())
    .then((pokemons) => func(pokemons));
}
fetchData();

function search(event) {
  if (event.keyCode == 13) {
    fetchData();
  }
}

function inSearch(key, name) {
  let nameArr = Array.from(name);
  console.log(nameArr);
  for (let i = 0; i < nameArr.length; i++) {
    if (key[i] == nameArr[i]) {
      return true;
    }
  }
  return false;
}

function func(pokemons) {
  let container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";

  let flag;

  for (let i = 0; i < no; i++) {
    let name = pokemons["results"][i]["name"];
    let key = document.getElementById("input").value;

    if (key == "" || inSearch(key.toLowerCase(), name)) {
      let url = pokemons["results"][i]["url"];

      fetch(url)
        .then((response) => response.json())
        .then((resp) => {
          let height = resp["height"];
          let weight = resp["weight"];
          let id = resp["id"];
          let char1 = resp["types"][0]["type"]["name"];
          let img = resp["sprites"]["front_default"];

          container.innerHTML += `
                <div class="card">
                <h4 class="id">#${id}</h4>
    
                <img src="${img}" alt="img">
                    <h2 class="name">${name}</h2>
                    <br>
                    <h4 class="desc">Height: ${height}ft</h4>
                    <h4 class="desc">Weight: ${weight}lbs</h4>
                    <br>
                    <h4 class="char">${char1}</h4>
                    <br>
                    <a href="https://www.pokemon.com/us/pokedex/${name}" target="_blank">Know more</a>
                </div>`;
        });
      flag = false;
    }

    if (key != "" && key != name) {
      if (flag != false) {
        flag = true;
      }
    }

  }

  if (flag) {
    container.innerHTML += `<h2 style="background-color: #fdeaee;">No results found!</h2>`;
  }

}