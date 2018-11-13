// Initialize cards array to hold all the cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Initialize deck of all cards in game
const deck = document.getElementById("card-deck");

// Declare matched cards
let matchedCard = document.getElementsByClassName("match");

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

// Toggles open show class to display cards
var displayCard = function() {
  // console.log("Card Pressed");
  this.classList.toggle("open");
  this.classList.toggle("show");
  // This disables the card making it unclickable until it's closed
  this.classList.toggle("disabled");
  console.log("Card flipped, successfully disabled");
};

// Add opened cards to the opened list and check whether there's a match
function cardOpen() {
  opened.push(this);
  console.log(this);
  var len = opened.length;
  var type = opened[len-1].type;
  // console.log("opened has " + len + " cards inside");
  console.log("Object " + len + " has type of " + type);
  if(len === 2){
    console.log("Second card clicked, checking for match");
    if(opened[0].type === opened[1].type){
      console.log("Tiles Matched");
      // matched();
    } else {
      console.log("Tiles didn't match");
      // unmatched();
    }
  }
};

// Function for when cards match
function matched() {
  opened[0].classList.add("match", "disabled");
  opened[1].classList.add("match", "disabled");
  opened[0].classList.remove("show", "open", "no-event");
  opened[1].classList.remove("show", "open", "no-event");
  opened = [];
}

// Function for when cards don't match
function unmatched() {
  opened[0].classList.add("unmatched");
  opened[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    opened[0].classList.remove("show", "open", "no-event", "unmatched");
    opened[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    opened = [];
  }, 1100);
}

// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Add event handler for each card element
for(var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
};
