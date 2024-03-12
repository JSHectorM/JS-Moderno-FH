/*
* 2C = Two of Clubs (Treboles)
* 2D = Two of Diamonds (Diammantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Espadas)
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// * Referencias al DOM
const btnPedir = document.querySelector('#btnPedir');
const tagPuntos = document.querySelectorAll('small');

// * Crea una nueva baraja barajeada
const crearDeck = () => {
    for (const tipo of tipos) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + tipo);
        }
        for (const esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    deck = _.shuffle( deck );
    return deck;
}


// * Esta funcion regresa una carta
const pedirCarta = ( ) => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck'
    }
    
    const carta = deck.pop();
    return carta;
}

// * Esta funcion regresa el valor de la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    
    return  ( isNaN( valor )   ? 
            ( valor === 'A') ? 11 : 10
            : parseInt( valor ) )
}
 
crearDeck();
console.log(deck);

// valorCarta(pedirCarta());
// console.log( valorCarta( pedirCarta() ) );


// * Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    tagPuntos[0].innerText = puntosJugador;


});


// (()=>{
    
// })