/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

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
    let cartaAleatoria = baraja[Math.floor(Math.random() * baraja.length)];
    let numeroAleatorio = cartaAleatoria.slice(0, -1);
    let paloAleatorio = cartaAleatoria.slice(-1);
    console.log("Carta seleccionada:", cartaAleatoria);
    console.log("Número seleccionado:", numeroAleatorio);
    console.log("Palo seleccionado:", paloAleatorio);
  }

  document.getElementById("boton1").addEventListener("click", generaCarta);

  /*
  1) Array de 10 números + array de 3 letras + array de 4 figuras

  */
};
