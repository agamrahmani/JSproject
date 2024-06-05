import Deck from "./deck.js";

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.textWin');


let playerDeck;
let computerDeck;
let inRound;
let isFirstGame = true;
let stop;
let winPlayerDeck = [];
let winComputerDeck = [];
let playerCard;
let computerCard;

// if (isFirstGame) {
//     firstGame;
// }

firstGame();

document.addEventListener('click', () => {
    // if (stop) {
    //     startGame();
    //     return;
    // }
    if (inRound) {
        cleanBeforeRound();
    }
    else {
        flipCard();
    }
});

function firstGame() {
    const deck = new Deck();
    deck.shuffle();

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
    stop = false;
    isFirstGame = false;

    cleanBeforeRound();
}

function cleanBeforeRound() {
    inRound = false;
    computerCardSlot.innerHTML = '';
    playerCardSlot.innerHTML = '';
    text.innerText = '';

    updateDeckCount()
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards;
    playerDeckElement.innerText = playerDeck.numberOfCards;
}

function flipCard() {
    inRound = true;
    playerCard = playerDeck.pop();
    computerCard = computerDeck.pop();

    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());

    updateDeckCount();

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "אתה המנצח";
        winPlayerDeck.push(playerCard);
        winPlayerDeck.push(computerCard);
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "אתה המפסיד";
        winComputerDeck.push(playerCard);
        winComputerDeck.push(computerCard);
    } else {
        text.innerText = "הקלפים זהים";
        winPlayerDeck.push(playerCard);
        winComputerDeck.push(computerCard);
    }

    if (isRoundGameOver(playerDeck)) {
        if (winPlayerDeck.length == 0) {
            alert("אתה המפסיד של המשחק!");
            gameOver();
        }
    } else if (isRoundGameOver(computerDeck)) {
        if (winComputerDeck.length == 0) {
            alert("אתה המנצח של המשחק!");
            gameOver();
        }
    }

    if (isRoundGameOver(playerDeck) || isRoundGameOver(computerDeck)) {
        // לולאה שמכניסה מהמערך ניצחונות למערך הרגיל של הקלפים
        for (let i = 0; i < winPlayerDeck.length; i++) {
            playerDeck.push(winPlayerDeck[i]);
        }
        winPlayerDeck = cleanWinArray(winPlayerDeck);
        // לולאה שמרוקנת את המערך ניצחונות
        // while (winPlayerDeck.length > 0) {
        //     winPlayerDeck.pop();
        // }
        for (let i = 0; i < winComputerDeck.length; i++) {
            computerDeck.push(winComputerDeck[i]);
        }
        winComputerDeck = cleanWinArray(winComputerDeck);
        startGame();
    }
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isRoundGameOver(deck) {
    return deck.numberOfCards === 0;
}

function cleanWinArray(winArray) {
    while (winArray.length > 0) {
        winArray.pop();
    }
    return winArray;
}

function startGame() {
    //     console.log(playerDeck);
    //     playerDeck.shuffle();
    //     console.log(playerDeck);
    //     computerDeck.shuffle();
    //     inRound = false;
    //     isFirstGame = false;

    //     cleanBeforeRound();
}

function gameOver() {
    isFirstGame = true;
    firstGame();
}