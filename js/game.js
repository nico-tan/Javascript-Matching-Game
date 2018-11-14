// Initialize cards array to hold all the cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Initialize deck of all cards in game
const deck = document.getElementById("card-deck");

// Declare matched cards
let matchedCard = document.getElementsByClassName("match");

// Declare variable for moves made
let moves = 0;
let counter = document.querySelector(".moves");

// Declare variables for endgame stats


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

  // Reset moves
  moves = 0;
  counter.innerHTML = moves;

  // Reset counter
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

// Toggles open show class to display cards
var displayCard = function() {
  // console.log("Card Pressed");
  this.classList.toggle("open");
  // this.classList.toggle("show");
  // This disables the card making it unclickable until it's closed
  this.classList.toggle("disabled");
  // console.log("Card flipped, successfully disabled");
};

// Add opened cards to the opened list and check whether there's a match
function cardOpen() {
  opened.push(this);
  console.log(this.dataset.name);
  var len = opened.length;
  if(len === 2){
    moveCounter();
    console.log("Second card clicked, checking for match");
    if(opened[0].dataset.name === opened[1].dataset.name){
      console.log("Tiles Matched");
      // setTimeout(matched(), 6200);
      // matched();
      setTimeout(match(), 5000);
      // match();
    } else {
      console.log("Tiles didn't match");
      unmatched();
    }
  }
};

// Function for when cards match
function matched() {
  opened[0].classList.add("match", "disabled");
  opened[1].classList.add("match", "disabled");
  disable();
  setTimeout(function() {
    opened[0].classList.remove("show", "open", "no-event");
    opened[1].classList.remove("show", "open", "no-event");
    enable();
    opened = [];
  }, 1100

);
  // opened[0].classList.remove("show", "open", "no-event");
  // opened[1].classList.remove("show", "open", "no-event");
  // opened = [];
}

function match() {
  opened[0].classList.add("match");
  opened[1].classList.add("match");
  opened = [];
}

function resetMatch() {

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

// function to count player's moves
function moveCounter() {
  moves++;
  console.log("Move #" + moves);
  counter.innerHTML = moves;

  // Once the first move is made, start the clock
  if(moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

// function to keep track of game time
var second = 0, minute = 0, hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if(second == 60) {
      minute++;
      second = 0;
    }

    if(minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// function to determine whether the win condition is met or not
function congratulations() {
  if(matchedCard.length == 16){
    clearInterval(interval);
    finalTime = timer.innerHTML;

    console.log("It took you: " + finalTime + " to finish");
    console.log("It took you " + moves + " moves");
  };
}

// Add event handler for each card element
for(var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
