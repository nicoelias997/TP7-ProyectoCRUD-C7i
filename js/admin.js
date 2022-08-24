import { Pelicula } from "./classPelicula.js";
import {validarTitulo, validarDescription, validarImagen, validarGenero} from "./helpers.js"

let listaPeliculas = [];
 //aqui voy a guardar todas las peliculas
//AGregamos una funcion que nos muestre las pelis cuando se cargue la pagina 

const cargaInicial = () => {
    listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];
    if(listaPeliculas.length > 0){
        listaPeliculas.forEach(listaPelicula => {
            crearLista(listaPelicula)
        })
    }
}
function crearLista(pelicula){
    //esta funcion dibuja un tr
    let tablaPeliculas = document.querySelector('#tablaPeliculas');
    //creamos el tr con document.createElement o innerHTML del tbody
    tablaPeliculas.innerHTML += `<tr>
    <th scope="row">${pelicula.codigo}</th>
    <td>${pelicula.titulo}</td>
    <td>${pelicula.descripcion}</td>
    <td>${pelicula.imagen}</td>
    <td>${pelicula.genero}</td>
    <td>
      <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" id="ventanaModal">
       <i class="bi bi-pencil-square"></i>
      </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Editar pelicula</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <form>
        <div class="mb-3">
          <label for="tituloNuevo"  class="col-form-label">Titulo:</label>
          <input type="text" class="form-control" id="tituloNuevo">
        </div>
        <div class="mb-3">
          <label for="descripcionNueva"  class="col-form-label">Descripcion:</label>
          <input type="text" class="form-control" id="descripcionNueva">
        </div>
        <div class="mb-3">
          <label for="imagenNueva"  class="col-form-label">Imagen:</label>
          <input type="text" class="form-control" id="imagenNueva">
        </div>
        <div class="mb-3">
                <label for="generoNuevo">Genero</label>
                <select id="generoNuevo" class="form-control">
                  <option value="">Selecione una opcion</option>
                  <option value="accion">Accion</option>
                  <option value="drama">Drama</option>
                  <option value="comedia">Comedia</option>
                  <option value="aventura">Aventura</option>
                </select>
              </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button type="submit" class="btn btn-primary" onclick='editarPelicula("${pelicula.codigo}")'>Editar</button>
    </div>
  </div>
</div>
</div>


      <button class="btn btn-danger" onclick='borrarPelicula("${pelicula.codigo}")'>
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`
}


//traer los input
let codigo = document.querySelector('#codigo');
let titulo = document.querySelector('#titulo');
let descripcion = document.querySelector('#descripcion');
let imagen = document.querySelector('#imagen');
let genero = document.querySelector('#genero');

let formPelicula = document.querySelector('#formPelicula');
let btnCrearPelicula = document.querySelector('#btnCrearPelicula');
// crear una instancia de la ventana modal
const modalAdminPelicula = new bootstrap.Modal(document.querySelector('#modalPelicula'));

//agregar el evento
titulo.addEventListener('blur',()=>{validarTitulo(titulo)});
descripcion.addEventListener('blur',()=>{validarDescription(descripcion)});
imagen.addEventListener('blur',()=>{validarImagen(imagen)})
genero.addEventListener('blur',()=>{validarGenero(genero)})


btnCrearPelicula.addEventListener('click', crearPelicula);
formPelicula.addEventListener('submit', guardarPelicula);

function crearPelicula(){
    //mostrar ventana modal
    modalAdminPelicula.show();
    //generar el identificador unico y asignarlo al campo del codigo
    codigo.value = uuidv4();
    // console.log( uuidv4()); esta libreria genera identificadores unicos
}   

function guardarPelicula(e){
    e.preventDefault();
   //volver a validar todos los campos
    if(validarTitulo(titulo) && validarDescription(descripcion) && validarImagen(imagen) && validarGenero(genero)){
   //si los datos son correctos
   let nuevaPelicula =  new Pelicula(codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
   listaPeliculas.push(nuevaPelicula);
   //Ahora guardaremos las pelis en el navegador (Local storage)
    guardarPeliculasEnLocalStorage();
    crearLista(nuevaPelicula)
   //limpiar formulario
   //cerrar la ventana modal
   modalAdminPelicula.hide();
   limpiarFormulario();

    }
}

function limpiarFormulario(){
    formPelicula.reset()
    titulo.className = "form-control"
    descripcion.className = "form-control"
    imagen.className = "form-control"
    genero.className = "form-control"

    // modificar las clases de bootstrap si es necesario
}

function guardarPeliculasEnLocalStorage(){
    localStorage.setItem('listaPeliculasKey', JSON.stringify(listaPeliculas));
}

window.borrarPelicula = function (codigo){
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro que deseas eliminar ?',
        text: "No podras revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        //buscar la pelicula en el arreglo y borrarla
        let copiaListaPeliculas = listaPeliculas.filter((itemPelicula)=> itemPelicula.codigo != codigo);
        listaPeliculas = copiaListaPeliculas;
        //actualizar el localstorage
        guardarPeliculasEnLocalStorage();
        //actualizar la tabla
        borrarTabla();
        cargaInicial();

          swalWithBootstrapButtons.fire(
            'Eliminado!'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Ahora podras ver tu pelicula nuevamente!"
          )
        }
      })
}

function borrarTabla(){
    let tablaPeliculas = document.querySelector('#tablaPeliculas');
    tablaPeliculas.innerHTML = '';

}


window.editarPelicula = function(codigo){

    let peliculaAEditar = listaPeliculas.filter((pelicula)=> pelicula.codigo == codigo);

    let tituloNuevo = document.getElementById("tituloNuevo")
    tituloNuevo.addEventListener('blur',()=>{validarTitulo(tituloNuevo)});

    let descripcionNueva = document.getElementById("descripcionNueva")
    descripcionNueva.addEventListener('blur',()=>{validarTitulo(descripcionNueva)});

    let imagenNueva = document.getElementById("imagenNueva")
    imagenNueva.addEventListener('blur',()=>{validarTitulo(imagenNueva)});

    let generoNuevo = document.getElementById("generoNuevo")
    generoNuevo.addEventListener('blur',()=>{validarTitulo(generoNuevo)});

    let ventanaModal = new bootstrap.Modal(document.getElementById("exampleModal"))

    if(validarTitulo(tituloNuevo) && validarDescription(descripcionNueva) && validarImagen(imagenNueva) &&validarGenero(generoNuevo)){

    peliculaAEditar.titulo = tituloNuevo.value;
    peliculaAEditar.descripcion = descripcionNueva.value;
    peliculaAEditar.imagen = imagenNueva.value;
    peliculaAEditar.genero = generoNuevo.value;
    
    tituloNuevo.className = "form-control"
    descripcionNueva.className = "form-control"
    imagenNueva.className = "form-control"
    generoNuevo.className = "form-control"


    guardarPeliculasEnLocalStorage()   
    ventanaModal.hide()
    cargaInicial()

    }

}

cargaInicial();
