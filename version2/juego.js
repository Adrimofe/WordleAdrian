// constantes y variables globales
const PALABRA = "jorge";
const regExpPalabra = /^[a-zA-ZñÑ]{5}$/;
const CAJAERRORES = document.getElementById('error');
const INTENTOS = 6;
let intentosDisponibles = INTENTOS;
let palabraFormada = "";
let campo = document.getElementsByClassName('campo');
let btncomprueba = document.getElementById('comprueba');
let teclado = document.getElementById('teclado');
let teclaPulsada = teclado.getElementsByClassName('boton-teclado');
////////////////////////////////////////////////////////////////////////////////////
// añade el botón "ENVIAR" al evento click y comprueba la palabra//////////////////
btncomprueba.addEventListener('click', (e) => {
    compruebaPalabra()
})
////////////////////////////////////////////////////////////////////////////////////
// comprobación al pulsar el botón//////////////////////////////////////////////////
function compruebaPalabra() {
    if (intentosDisponibles == 0) {
        muestraError("La palabra correcta era" + PALABRA);
    }
    let intento1 = document.getElementsByClassName('intento')[INTENTOS - intentosDisponibles];
    let letras1 = intento1.getElementsByClassName('campo');
    let numLinea = INTENTOS - intentosDisponibles;
    Array.from(letras1).forEach(element => {
        palabraFormada += element.value;
    })

    if (!regExpPalabra.test(palabraFormada)) {
        muestraError("Debes rellenar las 5 letras.");
        palabraFormada = "";
    } else {
        if (palabraFormada == PALABRA) {
            muestraError("CAMPEOOOOOOOOOON");
            todosFondosVerdes(numLinea);
            palabraFormada = "";
        } else {
            if (palabraFormada != PALABRA) {
                muestraError("te quedan " + (intentosDisponibles - 1) + " intentos figura.");
                compruebaAciertos(palabraFormada, numLinea);
                bloqueaFila(INTENTOS - intentosDisponibles);
                palabraFormada = "";
                let fila = INTENTOS - (intentosDisponibles - 1);
                habilitaFila(fila)
            }
        }
        intentosDisponibles = intentosDisponibles - 1;

    }

}
////////////////////////////////////////////////////////////////////////////////////
// recibe la palabra y el número de fila y establece los aciertos por colores///////
function compruebaAciertos(palabraFormada, numLinea) {
    let botonTeclado = document.getElementsByClassName('boton-teclado');
    let intento = document.getElementsByClassName('intento')[numLinea];
    for (let i = 0; i < palabraFormada.length; i++) {
        if (palabraFormada.charAt(i) == PALABRA.charAt(i)) {
            let letras = intento.getElementsByClassName('campo')[i];
            letras.classList.add('fondoVerde');
            Array.from(botonTeclado).forEach(element => {
                console.log(element.textContent)
                if(element.textContent == palabraFormada.charAt(i)){
                    element.style.background =  "#6AAA64";
                    element.style.color =  "white";
                }
            })
           
        }
        if (palabraFormada.charAt(i) != PALABRA.charAt(i)) {
            if (PALABRA.search(palabraFormada.charAt(i)) != -1) {
                let letras = intento.getElementsByClassName('campo')[i];
                letras.classList.add('fondoAmarillo');
                Array.from(botonTeclado).forEach(element => {
                    console.log(element.textContent)
                    if(element.textContent == palabraFormada.charAt(i)){
                        element.style.background =  "#e9f356";
                        element.style.color =  "white";
                    }
                })
            } else {
                let letras = intento.getElementsByClassName('campo')[i];
                letras.classList.add('fondoNegro');
                Array.from(botonTeclado).forEach(element => {
                    console.log(element.textContent)
                    if(element.textContent == palabraFormada.charAt(i)){
                        element.style.background =  "#8f8f8f";
                        element.style.color =  "white";
                    }
                })
            }
        }
    }
}

function bloqueaFila(fila) {
    let intento = document.getElementsByClassName('intento')[fila];
    let letras = intento.getElementsByClassName('campo');
    Array.from(letras).forEach(element => {
        element.setAttribute('dissabled', 'true');
    })

}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////FUNCIONES //////// ////////////////////////////////////////
// muestra el error durante 4 segundos/////////////////////////////////////////////
function muestraError(frase) {
    CAJAERRORES.textContent = frase;
    setTimeout(() => {
        CAJAERRORES.textContent = ""
    }, 5000);

}
//////////////////////////////////////////////////////////////////////////////////
// establece todos los campos input text a verde si acierta todo//////////////////
function todosFondosVerdes(numLinea) {
    let intento1 = document.getElementsByClassName('intento')[numLinea];
    let letras1 = intento1.getElementsByClassName('campo');
    Array.from(letras1).forEach(element => {
        element.setAttribute('class', 'fondoVerde');
    })
}
///////////////////////////////////////////////////////////////////////////////////////
// establezco longitud máxima por input text=1.Además añade botón intro al evento/////
function longitudMaxima() {
    Array.from(campo).forEach(element => {
        element.setAttribute('maxlength', '1');
        element.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                compruebaPalabra()
            }
        })

    })
}
///////////////////////////////////////////////////////////////////////////////////////
///////////////añade las teclas pulsadas a la tabla //////////////////////////////////
function addTeclaPulsada() {
    const numFila = {
        6: 0,
        5: 1,
        4: 2,
        3: 3,
        2: 4,
        1: 5,
    };
    Array.from(teclaPulsada).forEach(element => {
        element.addEventListener('click', (e) => {
            let intento = document.getElementsByClassName('intento')[numFila[intentosDisponibles]];
            let letras = intento.getElementsByClassName('campo');
            if (e.target.dataset.id == "borrar") {
                letras[0].value = null;
                letras[1].value = null;
                letras[2].value = null;
                letras[3].value = null;
                letras[4].value = null;
            }
            if (e.target.textContent != "Enviar" && e.target.id != "borrar") {
                if (letras[0].value.length == 0) {
                    letras[0].value = e.target.textContent;
                } else if (letras[1].value.length == 0 && letras[0].value.length != 0) {
                    letras[1].value = e.target.textContent;
                } else if (letras[2].value.length == 0 && letras[1].value.length != 0) {
                    letras[2].value = e.target.textContent;
                } else if (letras[3].value.length == 0 && letras[2].value.length != 0) {
                    letras[3].value = e.target.textContent;
                } else if (letras[4].value.length == 0 && letras[3].value.length != 0) {
                    letras[4].value = e.target.textContent;
                }
            }
        })
    })
}

function habilitaFila(numFila) {
    let intento = document.getElementsByClassName('intento')[numFila];
    let letras = intento.getElementsByClassName('campo');
    Array.from(letras).forEach(element => {
        element.disabled = false;
    })
}
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////COMIENZA EL JUEGO///////////////////////////////////////////
function juego() {

    longitudMaxima();
    addTeclaPulsada();

}
juego();

/**   let campo = document.getElementsByClassName('campo');
    Array.from(campo).forEach(element => {
        element.addEventListener('keypress', (e)=>{
          e.preventDefault();
            return false;
        })
    }) */