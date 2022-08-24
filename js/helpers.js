export function validarTitulo(titulo){
    if( titulo.value.trim().length >= 1 && titulo.value.trim().length <=50 ){
        titulo.className = 'form-control is-valid';
        return true;
    }else{
        titulo.className = 'form-control is-invalid';
        return false;
    }
}


export function validarImagen(imagen){

   let patron = /([0-9a-zA-Z\._-]+.(png|PNG|gif|GIF|jp[e]?g|JP[E]?G))/g

    if(patron.test(imagen.value)){
        imagen.className = 'form-control is-valid';
        return true;
    }else{
        imagen.className = 'form-control is-invalid';
        return false;
    }
}

export function validarDescription(descripcion){
    let expReg = /^[a-zA-Z0-9][a-zA-Z0-9\s]+$/ig;
    if(expReg.test(descripcion.value)){
        descripcion.className = 'form-control is-valid';
        return true;
    }else{
        descripcion.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGenero(genero){
        if(genero.value !== ""){
        return true
    } else {
        return false
    }
}
