import { Pelicula } from "./classPelicula.js";
import {validarTitulo, validarDescription, validarImagen, validarGenero} from "./helpers.js"

let listaPeliculas = []; //aqui voy a guardar todas las peliculas
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
      <button class="btn btn-warning" >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" onclick='borrarPelicula("${pelicula.codigo}")'>
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>`
    console.log(tablaPeliculas)
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
genero.addEventListener('blur',()=>{validarImagen(genero)})


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
   console.log(nuevaPelicula)
   listaPeliculas.push(nuevaPelicula);
   //Ahora guardaremos las pelis en el navegador (Local storage)
    guardarPeliculasEnLocalStorage();
    crearLista(nuevaPelicula)
   //limpiar formulario
   limpiarFormulario();
   console.log(listaPeliculas);
   //cerrar la ventana modal
   modalAdminPelicula.hide();
    }
}

function limpiarFormulario(){
    formPelicula.reset()
    // modificar las clases de bootstrap si es necesario
}

function guardarPeliculasEnLocalStorage(){
    localStorage.setItem('listaPeliculasKey', JSON.stringify(listaPeliculas));
}

window.borrarPelicula = function (codigo){
    console.log(codigo)
    //buscar la pelicula en el arreglo y borrarla
    let copiaListaPeliculas = listaPeliculas.filter((itemPelicula)=> itemPelicula.codigo != codigo);
    listaPeliculas = copiaListaPeliculas;
    //actualizar el localstorage
    guardarPeliculasEnLocalStorage();
    //actualizar la tabla
    borrarTabla();
    cargarInicial();
}

function borrarTabla(){
    let tablaPeliculas = document.querySelector('#tablaPeliculas');
    tablaPeliculas.innerHTML = '';
    cargaInicial();

}

cargaInicial();