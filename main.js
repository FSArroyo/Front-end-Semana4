const Btn = document.querySelector("button");

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url).then((res) => {
      if (res.status != "200") {
          console.log(res);
          pokeImage("Assets/sad-pokemon.gif")
      }
      else {
          return res.json();
      }
  }).then((data) => {
      if (data) {
          let pokeImg = data.sprites.front_default;
          let pokenombre=data.name;
          let pokeTipo=data.types[0].type.name;
          let ps=data.stats[0].base_stat;
          let atk=data.stats[1].base_stat;
          let def=data.stats[2].base_stat;
          let Moves=data.moves;
          pokeImage(pokeImg);
          setNombre(pokenombre,pokeTipo);
          setStats(ps,atk,def);
          setMoves(Moves);
      }
  });
}

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeimg");
  pokePhoto.src = url;
}
const setNombre=(nombre,tipo)=>{
  document.getElementById("pokename").innerHTML=nombre;
  document.getElementById("poketipo").innerHTML=`Tipo: ${tipo}`;
}
const setStats=(Ps,Atk,Def)=>{
  document.getElementById("PS").innerHTML=`PS: ${Ps}`;
  document.getElementById("Atk").innerHTML=`Atk: ${Atk}`;
  document.getElementById("Def").innerHTML=`Def: ${Def}`;
}
const setMoves=(moves)=>{
  let num=Object.values(moves);
  let nums=num.length;

  
  for (var i=0;i<nums;i++){
    var newDiv = document.createElement("ul");
    var newContent = document.createTextNode(num[i].move.name);
    newDiv.appendChild(newContent); //añade texto al div creado.

  // añade el elemento creado y su contenido al DOM
    var currentDiv = document.getElementById("lista");
    document.getElementById("moves").insertBefore(newDiv, currentDiv);
  }
  
}

Btn.addEventListener('click',(e)=>{
  e.preventDefault();
  fetchPokemon();
})

