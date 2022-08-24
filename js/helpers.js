export function validarTitulo(titulo){
    if( titulo.value.trim().length >= 1 && titulo.value.trim().length <=50 ){
        titulo.className = 'form-control is-valid';
        return true;
    }else{
        console.log('dato invalido');
        titulo.className = 'form-control is-invalid';
        return false;
    }
}


export function validarImagen(imagen){

   let patron = /(?:(?:https?:\/\/))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/=]*(\.jpg|\.png|\.jpeg))/g

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
    if(genero.value !== "Selecione una opcion"){
        genero.className = "form-control is-valid"
        return true
    } else {
        genero.className = "form-control is-invalid"
        return false
    }
}
