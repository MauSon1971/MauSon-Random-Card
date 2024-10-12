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
    document.getElementById("palo1").className = `display-6 ${colorCarta}`;
    document.getElementById(
      "numero"
    ).className = `display-1 fw-bold ${colorCarta}`;
    document.getElementById("palo2").className = `display-6 ${colorCarta}`;
  }
  document.getElementById("boton1").addEventListener("click", function() {
    const carta = generaCarta(); // Llamamos a generaCarta para obtener una carta aleatoria
    mostrarCarta(carta); // Usamos esa carta en otra función
  });

  /*
  1) Array de 10 números + array de 3 letras + array de 4 figuras

  */
};
