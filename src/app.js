/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
import { start } from "@popperjs/core";

window.onload = function() {
  //write your code here
  const numeros = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const palos = ["♦", "♥", "♠", "♣"];
  const baraja = [];

  numeros.forEach(numero => {
    palos.forEach(palo => {
      baraja.push(`${numero}${palo}`);
    });
  });
  console.log("Baraja Inicial", baraja);
  console.log("Cartas de la Baraja", baraja.length);

  function generaCarta() {
    //Genero carta aleatoria y separa el numero del palo en un objeto
    let cartaAleatoria = baraja[Math.floor(Math.random() * baraja.length)];
    let numeroAleatorio = cartaAleatoria.slice(0, -1);
    let paloAleatorio = cartaAleatoria.slice(-1);
    console.log("Carta seleccionada:", cartaAleatoria);
    console.log("Número seleccionado:", numeroAleatorio);
    console.log("Palo seleccionado:", paloAleatorio);
    return { numero: numeroAleatorio, palo: paloAleatorio };
  }

  // document.getElementById("boton1").addEventListener("click", generaCarta);

  function mostrarCarta(carta) {
    //si carta.palo es = a corazon o diamante => color rojo y si no negro.
    let colorCarta =
      carta.palo === "♥" || carta.palo === "♦" ? "text-danger" : "text-dark";
    //Pinto la carta con el palo y numero.
    document.getElementById("palo1").textContent = carta.palo;
    document.getElementById("numero").textContent = carta.numero;
    document.getElementById("palo2").textContent = carta.palo;
    //Pinto la carta con el color del palo
    document.getElementById("palo1").className = `${colorCarta}`;
    document.getElementById(
      "numero"
    ).className = `user-card-number text-danger text-center ${colorCarta}`;
    document.getElementById("palo2").className = `${colorCarta}`;
  }
  document.getElementById("boton1").addEventListener("click", function() {
    const carta = generaCarta(); // Llamamos a generaCarta para obtener una carta aleatoria
    mostrarCarta(carta); // Usamos esa carta en otra función
  });

  /*****************************************************************************
   * T E M P O R I Z A D O R
   ****************************************************************************/

  let contador = 0;
  let timer = null;
  const timerDisplay = document.getElementById("timer");

  //Inicia el reloj, calcula minutos y segundos y los pinta en el html
  function startTimer() {
    timer = setInterval(() => {
      contador++;
      let minutos = Math.floor(contador / 60)
        .toString()
        .padStart(2, "0"); //formula para calcular los minutos y pintarlo "00"
      let segundos = Math.floor(contador % 60)
        .toString()
        .padStart(2, "0"); //Calcula el resto de los minutos(seg) y los pinta "00"
      timerDisplay.textContent = `${minutos}:${segundos}`;
      if (contador % 10 === 0) {
        //Verifico que cada 10 segundos ejecute la condición
        const carta = generaCarta(); // Obtiene una carta aleatoria
        mostrarCarta(carta); //Pinta la carta en el HTML
      }
    }, 1000);
  }

  //Detiene el reloj
  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  //Configuro el switch para activar el timer
  document
    .getElementById("timerControl")
    .addEventListener("change", function() {
      if (this.checked) {
        startTimer();
        console.log("Se inicia el conteo");
      } else {
        stopTimer();
        console.log("Se detiene el conteo");
      }
    });
};

/*****************************************************************************
 * T A M A Ñ O  C A R T A
 ****************************************************************************/

//Creo un evento para escuchar el cambio en el checkbox "Aspect Ratio"

let anchoInput = document.getElementById("anchoCarta");
let altoInput = document.getElementById("altoCarta");
let checkAspectRatio = document.getElementById("checkAspectRatio");
const aspectRatio = 250 / 350;

checkAspectRatio.addEventListener("change", () => {
  //Si está activo, genero un evento para escuchar lo que ingresa en los inputs
  if (checkAspectRatio.checked) {
    anchoInput.addEventListener("input", ajustarAltoCarta);
    altoInput.addEventListener("input", ajustarAnchoCarta);
  } else {
    // Activo ambos campos para que el usuario pueda ingresar valores
    anchoInput.removeEventListener("input", ajustarAltoCarta);
    altoInput.removeEventListener("input", ajustarAnchoCarta);
    anchoInput.disabled = false;
    altoInput.disabled = false;
  }
});

// Funcion para modificar el ancho de la Carta
function ajustarAltoCarta() {
  if (checkAspectRatio.checked && anchoInput.value) {
    altoInput.disabled = true; //bloqueo el input "alto" al usuario
    let nuevoAltoCarta = anchoInput.value / aspectRatio; // defino el nuevo alto con el valor de Aspect Ratio
    altoInput.value = Math.round(nuevoAltoCarta); //Redondeo el valor y lo pinto en el html
  }
}

// Funcion para modificar el alto de la Carta
function ajustarAnchoCarta() {
  if (checkAspectRatio.checked && altoInput.value) {
    anchoInput.disabled = true;
    let nuevoAnchoCarta = anchoInput.value / aspectRatio;
    anchoInput.value = Math.round(nuevoAnchoCarta);
  }
}

// Evento para traer los datos
document.getElementById("btnConfig").addEventListener("click", () => {
  let anchoCartaUser = parseInt(anchoInput.value);
  let altoCartaUser = parseInt(altoInput.value);

  //Limito el ancho y alto de la carta

  if (anchoCartaUser > 386 || altoCartaUser > 840) {
    alert(`El tamaño maximo permitido es 388px de ancho por 840px de alto`);
    return;
  }

  // Aplicamos los cambios de tamaño a la carta
  const carta = document.querySelector(".user-card");
  carta.style.width = `${anchoCartaUser}px`;
  carta.style.height = `${altoCartaUser}px`;

  // Calculamos el nuevo tamaño del texto y símbolos basados en el tamaño de la carta
  let fontSizeBase = Math.min(anchoCartaUser, altoCartaUser) / 3; // Ajusta el valor según el tamaño de la carta
  let paloSize = Math.min(anchoCartaUser, altoCartaUser) / 6; // Tamaño relativo para los palos

  // Aplicamos los tamaños ajustados al contenido de la carta
  document.getElementById("numero").style.fontSize = `${fontSizeBase}px`;
  document.getElementById("palo1").style.fontSize = `${paloSize}px`;
  document.getElementById("palo2").style.fontSize = `${paloSize}px`;

  // Reiniciar el formulario
  document.querySelector("form").reset();
  anchoInput.disabled = false;
  altoInput.disabled = false;
  checkAspectRatio.checked = false;

  // Cerrar el offcanvas (navbar)
  let offcanvasElement = document.getElementById("offcanvasDarkNavbar");
  let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  bsOffcanvas.hide();
});

// Evento para resetear los datos
document.getElementById("btnReset").addEventListener("click", () => {
  // Aplicamos los cambios de tamaño a la carta
  const carta = document.querySelector(".user-card");
  const anchoOriginal = 250;
  const altoOriginal = 360;

  carta.style.width = `${anchoOriginal}px`;
  carta.style.height = `${altoOriginal}px`;

  // Calculamos el nuevo tamaño del texto y símbolos basados en el tamaño de la carta
  let fontSizeBase = Math.min(anchoOriginal, altoOriginal) / 3; // Ajusta el valor según el tamaño de la carta
  let paloSize = Math.min(anchoOriginal, altoOriginal) / 6; // Tamaño relativo para los palos

  // Aplicamos los tamaños ajustados al contenido de la carta
  document.getElementById("numero").style.fontSize = `${fontSizeBase}px`;
  document.getElementById("palo1").style.fontSize = `${paloSize}px`;
  document.getElementById("palo2").style.fontSize = `${paloSize}px`;

  // Reiniciar el formulario
  document.querySelector("form").reset();
  anchoInput.disabled = false;
  altoInput.disabled = false;
  checkAspectRatio.checked = false;

  // Cerrar el offcanvas (navbar)
  let offcanvasElement = document.getElementById("offcanvasDarkNavbar");
  let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  bsOffcanvas.hide();
});
