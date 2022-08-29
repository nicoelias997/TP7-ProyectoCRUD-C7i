import { Pelicula } from "./classPelicula.js";
import {validarTitulo, validarDescription, validarImagen, validarGenero} from "./helpers.js"

let listaPeliculas = [];
 //aqui voy a guardar todas las peliculas
//AGregamos una funcion que nos muestre las pelis cuando se cargue la pagina 

//variable para ejecutar la funcion que crea peliculas o la que actualiza
let peliculaNueva = true; // si peliculaNueva es true creo una pelicula, caso contrario actualizo

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
    <button class="btn btn-warning" onclick='editarPelicula("${pelicula.codigo}")' >
    <i class="bi bi-pencil-square"></i>
  </button>
  <button class="btn btn-danger" onclick='borrarPelicula("${pelicula.codigo}")'>
    <i class="bi bi-x-square"></i>
  </button>
</td>
</tr>`;
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
  peliculaNueva = true;
  limpiarFormulario();
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


window.editarPelicula = function (codigoBuscado) {
  // console.log(codigoBuscado)
  //cambiar el estado de la variable booleada peliculaNueva
  peliculaNueva = false;
  //buscar dentro del arreglo la pelicula que quiero editar
  // let peliculaBuscada = listaPeliculas.find((pelicula)=> {return pelicula.codigo === codigo})
  let peliculaBuscada = listaPeliculas.find(
    (pelicula) => pelicula.codigo === codigoBuscado
  ); //return implicito
  console.log(peliculaBuscada);
  //mostrar la ventana modal con el formulario cargado con todos los datos de la pelicula que selecciono el usuario
  modalAdminPelicula.show();
  codigo.value = peliculaBuscada.codigo;
  titulo.value = peliculaBuscada.titulo;
  descripcion.value = peliculaBuscada.descripcion;
  imagen.value = peliculaBuscada.imagen;
  genero.value = peliculaBuscada.genero;
};

function actualizarPelicula() {
  console.log("actualizando pelicula...");
  //tomar todos los datos cargados del formulario, buscar el objeto que estoy mostrando en el formulario y actualizar sus valores
  let posicionPeliBuscada= listaPeliculas.findIndex((pelicula)=> codigo.value === pelicula.codigo )
  console.log(posicionPeliBuscada);
  //modificar los valores dentro del arreglo
  listaPeliculas[posicionPeliBuscada].titulo = titulo.value;
  listaPeliculas[posicionPeliBuscada].descripcion = descripcion.value;
  listaPeliculas[posicionPeliBuscada].imagen = imagen.value;
  listaPeliculas[posicionPeliBuscada].genero = genero.value;
  //actualizar el localstorage
  guardarPeliculasEnLocalStorage()
  //actualizar la tabla
  borrarTabla();
  cargarInicial();
  //mostrar un mensaje intuitivo para el usuario
  Swal.fire(
    'Pelicula actualizada',
    'Los datos de la pelicula seleccionada fueron actualizados',
    'success'
  )
  //cerrar la ventana modal
  modalAdminPelicula.hide();
  //limpiar el formulario
  limpiarFormulario();

}
cargaInicial();