//tomar el parametro de la url
let parametro = window.location.search;//Accedemos a todos los parametros de una url
console.log(parametro)

let urlParametro = new URLSearchParams(parametro)
console.log(urlParametro.get("codigo"))//dentro de aqui, hay un parametro que nos interesa(GET, que es una funcion)
//este get nos dira el valor del parametro que sea codigo! nos dara el dato que nos interesa para trabajar
//cuando tenga el codigo, buscar en localstorage, la peli que tiene el mismo codigo

let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

let peliBuscada = listaPeliculas.find(pelicula => pelicula.codigo === urlParametro.get("codigo"))
console.log(peliBuscada)
//cuando la encuentre, dibujo la card con los datos de la pelicula

let seccionDetalle = document.querySelector("#seccionDetalle")
seccionDetalle.innerHTML =`
<div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${peliBuscada.imagen}" class="img-fluid rounded-start" alt="Thor: Love and Thunder" alt="${peliBuscada.titulo}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${peliBuscada.titulo}</h5>
                <p class="card-text">${peliBuscada.descripcion}</p>
                <p class="card-text">Genero: <span class="badge rounded-pill bg-info">${peliBuscada.genero}</span></p>
                <p class="card-text"></small></p>
              </div>
            </div>
          </div>
          </div>
`;