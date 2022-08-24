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

   let patron = /^(ftp|http|https):\/\/[^ "]+$/

    if(patron.test(imagen.value)){
        imagen.className = 'form-control is-valid text-truncate';        
        return true;
    }else{
        imagen.className = 'form-control is-invalid';
        return false;
    }
}

export function validarDescription(descripcion){
    let expReg = /^[a-zA-Z0-9][a-zA-Z0-9\s]+$/ig;
    if(expReg.test(descripcion.value)){
        descripcion.className = 'form-control is-valid text-truncate';
        return true;
    }else{
        descripcion.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGenero(genero){
        if(genero.value == ""){
            genero.className = "form-control is-invalid"
            return false
    } else {
        genero.className = "form-control is-valid"
        return true
    }
}
