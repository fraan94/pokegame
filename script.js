const pokeName = document.getElementById("name");
const pokeButton = document.getElementById("btn");
const pokeGuess = document.getElementById("guess");
const pokeContainer = document.getElementById("container");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const pokePista = (min, max) => {
    return Math.floor(Math.random() * (max - min )) + min;
};  



pokeButton.addEventListener("click",function(){
        fetch(URL + pokePista(1,152))
        .then(response => response.json())
        .then(json => { pokejson=json;
            console.log(pokejson)
             pokeContainer.innerHTML =
             `
             <p id"tries">Tienes 5 intentos ¡vamos!</p>
             <div><img id="imgblur" src="${pokejson.sprites.front_default}"></div>
             `
            fetch(`https://pokeapi.co/api/v2/type/${pokejson.types[0].type.name}/`)
            .then(response => response.json())
            .then(json => { poketype1=json;
            console.log(poketype1);
            });
            if(pokejson.types.length>1){
                fetch(`https://pokeapi.co/api/v2/type/${pokejson.types[1].type.name}/`)
                .then(response => response.json())
                .then(json => { poketype2=json;
                console.log(poketype2);
                })
            }else{};
            fetch(`https://pokeapi.co/api/v2/move/${pokejson.moves[11].move.name}/`)
            .then(response => response.json())
            .then(json => { pokemove=json;
            console.log(pokemove);
            });
        })
        .catch(error => console.log(error))
        pokeButton.textContent = "Nuevo"
        pokeName.className = "shown"
        pokeGuess.className = "shown"
        pokeButton.className ="hidden"
        pokeName.focus()
        pokeName.value = ""
        setInterval('count()',1000);
});
// pokeGuess.addEventListener("click",function(pepe){
function pepe(){
    let clues = document.getElementsByTagName("p")
    if (pokeName.value.toLowerCase()!=pokejson.name && clues.length===1){
        pokeContainer.innerHTML += `<p>${pokeName.value} ❌</p>
        <p>Nooo BURRO! Es de tipo ${poketype1.names[5].name.toUpperCase()}</p>`
        pokeName.value = "" 
    } else if (pokeName.value.toLowerCase()!=pokejson.name && clues.length===3){
        pokeContainer.innerHTML += `<p>${pokeName.value} ❌</p>`
        if (pokejson.types.length>1){
            pokeContainer.innerHTML += `<p>Otra vez el BURRO! También es tipo ${poketype2.names[5].name.toUpperCase()}</p>`
        } else {pokeContainer.innerHTML += `<p> Pista 2: No tiene otro tipo</p>`}
        pokeName.value = ""
    } else if (pokeName.value.toLowerCase()!=pokejson.name && clues.length===5){
        pokeContainer.innerHTML += `<p>${pokeName.value} ❌</p>
        <p>Dale flaco media pila! Tiene ataque ${pokemove.names[5].name.toUpperCase()}</p>`
        pokeName.value = ""
    } else if (pokeName.value.toLowerCase()!=pokejson.name && clues.length===7){
        pokeContainer.innerHTML += `<p>${pokeName.value} ❌</p>
        <p>No seas malo Es el ${pokejson.id} en la Pokedex</p>`
        pokeName.value = ""
    } else if (pokeName.value.toLowerCase()==pokejson.name){
        pokeContainer.innerHTML += `<br><p>¡Has acertado! El pokemon era ${pokejson.name.toUpperCase()} ✅</p>`
        document.getElementById("imgblur").src=`${pokejson.sprites.versions["generation-v"]["black-white"].animated.front_default}`
        document.getElementById("imgblur").id="img"
        pokeName.className = "hidden"
        pokeGuess.className = "hidden"
        pokeButton.className = "shown"
    } else { 
        pokeContainer.innerHTML += `<br><p>Lo siento, el pokemon era ${pokejson.name.toUpperCase()}</p>`
        document.getElementById("imgblur").id="img"
        pokeName.className = "hidden"
        pokeGuess.className = "hidden"
        pokeButton.className = "shown"
    }
}
// })
pokeName.addEventListener("keydown", function(e){
    if (e.key === "Enter") {
        pepe();
    }
})
pokeGuess.addEventListener("click",pepe)

//let cont1 = "00:"
//let cont2 = 9
//function count(){
//    if (cont2>=0){
//        let cont = cont1+cont2
//       let contador = document.getElementById("contador");
//        contador.value = cont;
//        cont2--;
//    } 
    // else if (cont2<0){
    //     pokeContainer.innerHTML += `<br><p>Lo siento, el pokemon era ${pokejson.name.toUpperCase()}</p>`
    //     document.getElementById("imgblur").id="img"
    //     pokeName.className = "hidden"
    //     pokeGuess.className = "hidden"
    //     pokeButton.className = "shown"
    //     clearInterval(setInterval('count()',1000))
    // }
//}
