let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;
let numeroPermitido = calcularNumeroPermitido(numeroMaximo);

function calcularNumeroPermitido(numeroMaximo) {
    if (numeroMaximo <= 10) {
        return 3;
    } else if (numeroMaximo <= 30) {
        return 4;
    } else if (numeroMaximo <= 60) {
        return 5;
    } else if (numeroMaximo <= 80) {
        return 6;
    } else if (numeroMaximo <= 90) {
        return 7;
    } else {
        return 8;
    }
}

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos==1) ? "intento":"intentos"} ¿Crees que puedes escapar otra vez? Presiona 'Renacer' para desafiar tu destino`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(intentos == numeroPermitido){
            asignarTextoElemento('p', 'Fin del juego. Tus esperanzas se desvanecen en la oscuridad de este retorcido laberinto.');
            document.getElementById('reiniciar').removeAttribute('disabled');
            return;
        }
        else{
            if(numeroDeUsuario > numeroSecreto){
                asignarTextoElemento('p',`Tu elección  fue muy alta... la oscuridad se cierne más cerca. <br>Aún te quedan ${numeroPermitido-intentos} ${((numeroPermitido-intentos)==1)? 'intento':'intentos'} antes de que el terror se desate`);
            }
            else{
                asignarTextoElemento('p',`Tu elección  fue muy baja... la oscuridad se cierne más cerca. <br>Aún te quedan ${numeroPermitido-intentos} ${((numeroPermitido-intentos)==1)? 'intento':'intentos'} antes de que el terror se desate`);
            }
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','El destino se ha sellado, todos los números han sido marcados por la sombra. Recarga la página para desafiar nuevamente al abismo.');
    } else {
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Sean bienvenidos al juego del número macabro'); 
    asignarTextoElemento('p',`Elige sabiamente un número entre 1 y ${numeroMaximo} tu destino depende de ello`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalo de numero
    condicionesIniciales();
    //Generar el numero aleatorio
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();