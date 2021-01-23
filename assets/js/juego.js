/*
** 2C = Two of Clubs
** 2D = Two of Diamonds 
** 2H = Two of Hearts
** 2S = Two of Spades
*/

let deck = [];

const createDeck = () =>{
    
    for(let i=2; i<=10; i++){
        deck.push(i+'C')
    }
    console.log(deck)

}

createDeck()