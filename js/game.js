// Initialize cards array to hold all the cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Initialize deck of all cards in game
const deck = document.getElementById("card-deck");

// Declare matched cards
let matched = document.getElementsByClassName("match");

// Declare array for matched cards
var opened = [];

// Function to shuffle deck of cards
function shuffle(array) {
  var currentIndex = array.length, temp, randomIndex;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};

document.body.onload = startGame();

// Function to start game
function startGame() {
  // Shuffle cards
  cards = shuffle(cards);

  for(var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });

    cards[i].classList.remove("show", "open", "match", "disabled");
  }
}
