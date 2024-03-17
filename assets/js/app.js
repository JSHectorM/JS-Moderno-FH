// * Funcion anonima autoinvocada
// * - Patron modulo
(() => {

  // ? modo estricto de javascript
  'use strict'

  /*
   * 2C = Two of Clubs (Treboles)
   * 2D = Two of Diamonds (Diammantes)
   * 2H = Two of Hearts (Corazones)
   * 2S = Two of Spades (Espadas)
   */

  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];
//   let puntosJugador = 0;
//   let puntosComputadora = 0;

  // * Referencias al DOM
  const btnPedir = document.querySelector("#btnPedir");
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnDetener = document.querySelector("#btnDetener");
  const btnAceptar = document.querySelector("#btnAceptar");

  const tagPuntos = document.querySelectorAll("small");
  const divCartasJugador = document.querySelector("#jugadorCartas");
  const divCartasComputadora = document.querySelector("#computadoraCartas");
  const dialog = document.querySelector("#dialog");
  const dialogTitulo = document.querySelector("#dialogTitulo");
  const dialogInstrucciones = document.querySelector("#dialogInstrucciones");

  // * Crea una nueva baraja barajeada
  const crearDeck = () => {
    for (const tipo of tipos) {
      for (let i = 2; i <= 10; i++) {
        deck.push(i + tipo);
      }
      for (const esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    deck = _.shuffle(deck);
    return deck;
  };

  // * Esta funcion regresa una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    const carta = deck.pop();
    return carta;
  };

  // * Esta funcion regresa el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
  };

  const generaCarta = (puntosPersonaje, tipoTag) => {
    const carta = pedirCarta();

    puntosPersonaje = puntosPersonaje + valorCarta(carta);
    tagPuntos[tipoTag].innerText = puntosPersonaje;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = "md:max-w-40 max-w-20";
    imgCarta.alt = `Carta-${carta}`;
    return imgCarta;
  };

  // * funcion para aparecer el dialog con elementos que se le manden
  const initDialog = (titulo, instr) => {
    dialog.className = "";
    dialogTitulo.innerText = titulo;
    dialogInstrucciones.innerText = instr;
  };

  // * Turno computadora
  const turnoComputadora = (puntosMinimo) => {
    do {
      const carta = pedirCarta();

      puntosComputadora = puntosComputadora + valorCarta(carta);
      tagPuntos[1].innerText = puntosComputadora;

      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.className = "md:max-w-40 max-w-20";
      imgCarta.alt = `Carta-${carta}`;
      // const imgCarta = generaCarta( puntosComputadora, 1 ); // TODO
      divCartasComputadora.append(imgCarta);

      if (puntosMinimo > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimo && puntosMinimo <= 21);

    if (puntosComputadora > puntosMinimo && puntosComputadora <= 21) {
      initDialog("Perdiste !!!", " 😖😖😖😖😖😖😖 ");
    } else if (puntosComputadora === puntosMinimo) {
      initDialog("Empate !!!", " 🥪🥪🥪🥪🥪🥪🥪🥪 ");
    } else {
      initDialog("Ganaste !!!", " 🥳🥳🥳🥳🥳🥳🥳 ");
    }
  };

  crearDeck();

  // * Eventos
  btnAceptar.addEventListener("click", () => {
    dialog.className = "hidden";
  });

  btnNuevo.addEventListener("click", () => {
    puntosJugador = 0;
    puntosComputadora = 0;
    deck = [];
    crearDeck();
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerHTML = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    tagPuntos[0].innerText = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = "md:max-w-40 max-w-20";
    imgCarta.alt = `Carta-${carta}`;
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
      dialog.className = "";
      initDialog("¡ Perdiste !", "Pero puedes iniciar un nuevo juego");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  });
})();
