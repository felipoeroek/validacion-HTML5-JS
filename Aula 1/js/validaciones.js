export function validar(input){

    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){

        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){

        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else{

        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"]

const mensajesDeError = {

    nombre: {

        valueMissing: "Este campo de texto no puede estar vacio",
    },
    email: {

        valueMissing: "Este campo de email no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {

        valueMissing: "Este campo de contraseña no puede estar vacio",
        patternMismatch: "al menos 6 caracteres, maximo 12, al menos una letra y un numero"
    },
    nacimiento: {

        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {

        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "el formato requerido es XXXXXXXXXX 10 numeros"
    },

    direccion: {

        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 caracteres y maximo 40 caracteres"
    },
    ciudad: {

        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "la ciudad debe contener entre 4 caracteres y maximo 30 caracteres"
    },
    estado: {

        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "el estado debe contener entre 4 caracteres y maximo 30 caracteres"
    }
}

const validadores = {

    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        
        if(input.validity[error]){

            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){

    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){

        mensaje = "Debes tener al menos 18 años de edad";
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){

    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}