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

// Declare variables for sounds
var matchCue = document.getElementById("audioMatch");
var mismatchCue = document.getElementById("audioMismatch");
var winner = document.getElementById("audioWinner");
let bgm = new Audio("../sounds/TranquilityLane.ogx");
let bgmToggle = 1;

// Declare popup close icon
let closeicon = document.querySelector(".close");

// Declare popup
let popup = document.getElementById("gameover");

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

  // Play background music
  initBG();

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

// Initialize background music. Will loop when the music ends
function initBG() {
  bgm.addEventListener("ended", function() {
    this.currentTime = 0;
    this.play();
  }, false);
  bgm.play();
}

// Toggles the background music on/off
function toggleBGM() {
  if(bgmToggle){
    bgm.pause();
    bgmToggle = 0;
  }else{
    bgm.play();
    bgmToggle = 1;
  }
}

// Toggles open show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  // This disables the card making it unclickable until it's closed
  this.classList.toggle("disabled");
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
      setTimeout(match(), 5000);
    } else {
      console.log("Tiles didn't match");
      unmatched();
    }
  }
};

// Function for when cards match
function match() {
  matchCue.play();
  opened[0].classList.add("match");
  opened[1].classList.add("match");
  opened = [];
}

// Function for when cards don't match
function unmatched() {
  mismatchCue.play();
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
    timer.innerHTML = minute + " mins " + second + " secs";
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
    winner.play();
    clearInterval(interval);
    finalTime = timer.innerHTML;

    popup.classList.add("show");

    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;

    console.log("It took you: " + finalTime + " to finish");
    console.log("It took you " + moves + " moves");

    closePopup();
  };
}

// Function to close the end game display popup
function closePopup() {
  closeicon.addEventListener("click", function(e) {
    popup.classList.remove("show");
    startGame();
  });
}

// Function for the play again button
function playAgain() {
  popup.classList.remove("show");
  startGame();
}

// Add event handler for each card element
for(var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
