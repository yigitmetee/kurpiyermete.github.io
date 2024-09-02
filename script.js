let balance = 1000;
let playerCards = [];
let dealerCards = [];
let deck = [];
let isGameOver = false;
let currentBet = 0;

document.getElementById('hit-button').addEventListener('click', playerHit);
document.getElementById('stand-button').addEventListener('click', playerStand);
document.getElementById('new-game-button').addEventListener('click', startNewGame);
document.getElementById('place-bet-button').addEventListener('click', placeBet);

function initializeGame() {
    deck = createDeck();
    shuffleDeck(deck);
    playerCards = [];
    dealerCards = [];
    playerCards.push(drawCard());
    playerCards.push(drawCard());
    dealerCards.push(drawCard());
    dealerCards.push(drawCard());
    isGameOver = false;
    document.getElementById('result-message').textContent = '';
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
    updateDisplay();
}

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let newDeck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            newDeck.push({ suit, rank });
        }
    }
    return newDeck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    return deck.pop();
}

function calculateHandValue(cards) {
    let value = 0;
    let aceCount = 0;
    for (const card of cards) {
        if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
            value += 10;
        } else if (card.rank === 'A') {
            value += 11;
            aceCount++;
        } else {
            value += parseInt(card.rank);
        }
    }
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function playerHit() {
    if (!isGameOver) {
        playerCards.push(drawCard());
        if (calculateHandValue(playerCards) > 21) {
            endGame('Kaybettiniz! Eliniz 21\'i aştı.');
        }
        updateDisplay();
    }
}

function playerStand() {
    if (!isGameOver) {
        while (calculateHandValue(dealerCards) < 17) {
            dealerCards.push(drawCard());
        }
        determineOutcome();
    }
}

function determineOutcome() {
    const playerValue = calculateHandValue(playerCards);
    const dealerValue = calculateHandValue(dealerCards);
    if (dealerValue > 21 || playerValue > dealerValue) {
        balance += currentBet * 2;
        endGame('Kazandınız!');
    } else if (playerValue < dealerValue) {
        endGame('Kaybettiniz!');
    } else {
        balance += currentBet;
        endGame('Berabere!');
    }
}

function endGame(message) {
    isGameOver = true;
    document.getElementById('result-message').textContent = message;
    document.getElementById('new-game-button').style.display = 'block';
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('place-bet-button').disabled = false;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    playerCards.forEach(card => {
        const cardElement = createCardElement(card);
        document.getElementById('player-cards').appendChild(cardElement);
    });
    dealerCards.forEach((card, index) => {
        const cardElement = createCardElement(card);
        if (index === 1 && !isGameOver) {
            cardElement.textContent = '??';
        }
        document.getElementById('dealer-cards').appendChild(cardElement);
    });
    document.getElementById('balance').textContent = balance;
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.textContent = `${card.rank} ${card.suit}`;
    return cardDiv;
}

function placeBet() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    if (betAmount > 0 && betAmount <= balance) {
        currentBet = betAmount;
        balance -= betAmount;
        document.getElementById('hit-button').disabled = false;
        document.getElementById('stand-button').disabled = false;
        document.getElementById('place-bet-button').disabled = true;
        initializeGame();
    } else {
        alert('Geçersiz bahis miktarı. Lütfen geçerli bir miktar girin.');
    }
}

function startNewGame() {
    document.getElementById('new-game-button').style.display = 'none';
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
    document.getElementById('place-bet-button').disabled = false;
    document.getElementById('result-message').textContent = '';
    currentBet = 0;
}
