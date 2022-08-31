//verificar si el localstorage tiene datos
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || [];
let padre = document.querySelector("#grillaSPeliculas");

//chequear si el arreglo listaPeliculas tiene algo
if(listaPeliculas.length > 0){
    //entonces dibujo las cards
    listaPeliculas.map((pelicula)=>{
        crearColumna(pelicula)
    })
}else{
    //mostrar un mensaje intuitivo para el usuario
}

function crearColumna(pelicula){
//traer el elemento padre de las columnas
// dibujar una columna con su respectiva card
padre.innerHTML += `
    <aside class="col-12 col-md-4 col-lg-3 my-3">
     <div class="card">
       <img src="${pelicula.imagen}" class="card-img-top w-100"  alt="img">
       <div class="card-body">
         <h5 class="card-title">${pelicula.titulo}<br><span class="badge text-bg-danger rounded-pill mx-2">Nuevo</span></h5>
         <button class="btn btn-primary" type="button" onclick="verDetalle('${pelicula.codigo}')">Ver mas</button>
       </div>
     </div>
   </aside>`;

}

function verDetalle(codigo){
    console.log(codigo);
}