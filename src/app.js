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

let anchoCarta = null;
let altoCarta = null;

document.getElementById("btnConfig").addEventListener("click", () => {});
