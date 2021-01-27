/*
** 2C = Two of Clubs
** 2D = Two of Diamonds 
** 2H = Two of Hearts
** 2S = Two of Spades
*/

let deck = [];
const cards = ['C', 'D', 'H', 'S'];
const specialCards = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias de HTML
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')
//console.log(btnPedir)
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const countSmall = document.querySelectorAll('small')



const createDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let card of cards) {
            deck.push(i + card)
        }

    }

    for (let card of cards) {
        for (let special of specialCards) {
            deck.push(special + card)
        }
    }


    // console.log(deck)
    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}

createDeck()

//This functions allows take a card 

const askCard = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el Deck'
    }

    let card = deck.pop()
    return card


}

//askCard()

const cardValue = (card) => {

    const value = card.substring(0, card.length - 1);
    //console.log(value);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : value * 1

    // if (isNaN(value) ) {
    //     points = (value === 'A') ? 11 : 10 ;
    // } else {
    //     console.log('Es un número')
    //     points = value * 1
    // }
    // console.log(points)

}

// const value = cardValue(askCard());
// console.log({value})

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = askCard();
        // console.log(carta)

        puntosComputadora = puntosComputadora + cardValue(carta);

        countSmall[1].innerHTML = puntosComputadora;

        //<!-- <img class="carta" src="assets/cartas/2H.png" alt=""> -->
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png` //3H, JD
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta)

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana')
        } else if (puntosMinimos > 21) {
            alert('Computadora gana')
        } else if (puntosComputadora > 21) {
            alert('Jugador gana')

        } else {
            alert('Computadora gana')
        }
    }, 10 )


}


//EVENTOS

btnPedir.addEventListener('click', () => {

    const carta = askCard();
    // console.log(carta)

    puntosJugador = puntosJugador + cardValue(carta);

    countSmall[0].innerHTML = puntosJugador;

    //<!-- <img class="carta" src="assets/cartas/2H.png" alt=""> -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png` //3H, JD
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta)

    // console.log(puntosJugador)
    if (puntosJugador > 21) {
        console.warn('Perdiste mano')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
        console.warn('21, genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    }




})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador)

})

btnNuevo.addEventListener('click', () => {
    divCartasJugador.innerHTML = ''
    divCartasComputadora.innerHTML = ''
    countSmall[0].innerText = 0
    countSmall[1].innerText = 0
    puntosJugador = 0;
    puntosComputadora = 0;
    btnDetener.disabled = false; 
    btnPedir.disabled = false; 
    deck = []
    createDeck()
    
})