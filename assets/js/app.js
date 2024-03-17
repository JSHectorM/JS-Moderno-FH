// * Funcion anonima autoinvocada
// * - Patron modulo
const moduloJuego = (() => {

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

  // * Referencias al DOM
  const btnPedir = document.querySelector("#btnPedir");
  const btnNuevo = document.querySelector("#btnNuevo");
  const btnDetener = document.querySelector("#btnDetener");
  const btnAceptar = document.querySelector("#btnAceptar");

  const tagPuntos = document.querySelectorAll("small");
  const divCartasJugadores = document.querySelectorAll(".divCartas");
 
  const dialog = document.querySelector("#dialog");
  const dialogTitulo = document.querySelector("#dialogTitulo");
  const dialogInstrucciones = document.querySelector("#dialogInstrucciones");

  // * Inicializar 
  const inicializarJuego = ( numJugadores = 2 ) => {
    deck = crearDeck();
    puntosJugadores = [];
    // * el ultimo jugador va a ser la computadora

    for (let i = 0; i < numJugadores; i++) {
       puntosJugadores.push(0);
       divCartasJugadores[i].innerHTML = ''
       tagPuntos[i].innerText = puntosJugadores[i];
    }
  }
  
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
    return _.shuffle( deck );
  };

  // * Esta funcion regresa una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return  deck.pop();
  };

  // * Esta funcion regresa el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
  };

  // * funcion para aparecer el dialog con elementos que se le manden
  const initDialog = (titulo, instr) => {
    dialog.className = "";
    dialogTitulo.innerText = titulo;
    dialogInstrucciones.innerText = instr;
  };

  // turno: 0 primer jugador y el ultimo la computadora
  const acumularPuntos = ( carta, turno ) =>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    tagPuntos[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  // * genera la carta en el html
  const crearCarta = ( carta, turno ) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.className = "md:max-w-40 max-w-20";
    imgCarta.alt = `Carta-${carta}`;
    divCartasJugadores[ turno ].append(imgCarta);
  }

  const determinarGanador = () => {

    const [puntosMinimo, puntosComputadora] = puntosJugadores

    if (puntosComputadora > puntosMinimo && puntosComputadora <= 21) {
      initDialog("Perdiste !!!", " 😖😖😖😖😖😖😖 ");
    } else if (puntosComputadora === puntosMinimo) {
      initDialog("Empate !!!", " 🥪🥪🥪🥪🥪🥪🥪🥪 ");
    } else {
      initDialog("Ganaste !!!", " 🥳🥳🥳🥳🥳🥳🥳 ");
    }
  }

  // * Turno computadora
  const turnoComputadora = (puntosMinimo) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimo > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimo && puntosMinimo <= 21);
    determinarGanador();
  };



  // * Eventos
  btnAceptar.addEventListener("click", () => {
    dialog.className = "hidden";
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos( carta, 0 );

    crearCarta( carta, 0 );

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
    turnoComputadora( puntosJugadores[0] );
  });

  return { nuevoJuego : inicializarJuego };
})();
