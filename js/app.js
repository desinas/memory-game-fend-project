/**
* @description Game state mechanism initialization
*/
    //card array of elements to store the game cards
let card = document.getElementsByClassName("card");
const cards = [...card]; //console.log(cards);
        //deck contains all the cards
const deck = document.getElementById("card-deck");
    //counter of game moves for player's performance
let moves = 0;
let counter = document.querySelector(".moves");
    //stars and starsList to store the player's stars
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
    //variable matchedCards for game cards been matched
let matchedCards = document.getElementsByClassName("match");
let closeIcon = document.querySelector(".close");
let modal = document.getElementById("popup")
  //chosen cards array to store the game chosen cards by the player
var chosenCards = [];

/**
* Shuffle function from http://stackoverflow.com/a/2450976
* It takes an array of elements and it randomly shuffles them
* giving back a new array with the same lenght of elements
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
* @description Start game function is activated when browser window is loaded
* and a new game is initialized on the deck
*/
window.onload = startGame();
function startGame() {
        //a new deck of cards is shuffled for every game
    var shuffleCards = shuffle(cards);
    for (var i = 0; i < shuffleCards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item){
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
        // moves is set to 0
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "FFD700";
        stars[i].style.visibility = "visible";
    }
        //timer is set to 0
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

/**
* @description Counter of moves function counts the number of moves the player took
* Star rating changes depending on the number of moves
* it took to complete the game
*/
function movesCounter() {
moves++;
counter.innerHTML = moves;
if (moves == 1) {
      second = 0;
      minute = 0;
      hour = 0;
      startTimer();
}
    // star rating changes as the game continue
    if (moves > 8 && moves < 16) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 18) {
    for (var i = 0; i < 3; i++) {
        if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

/**
* @description Timer function initialization and definition
* The time parameters are set for the game
*/
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
interval = setInterval(function() {
  timer.innerHTML = minute + " mins " + second + " secs";
  second++;
  if (second == 60) {
      minute++;
      second = 0;
  }
  if (minute == 60) {
      hour++;
      minute = 0;
  }
}, 1000);
}

/**
* Toggle between opened and showed cards to display open Cards
*/
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/**
* Flipped cards function adds the selected cards to open cards array
* and checks if the cards are matched
*/
function cardFlipped() {
    chosenCards.push(this);
    var flips = chosenCards.length;
    if(flips === 2 ) {
      movesCounter();
        if(chosenCards[0].type === chosenCards[1].type){
          matched();
        } else {
            unmatched();
        }
    }
}

/**
* Matched function created when 2 cards are a match
* Unmatched function created when 2 cards don't match
*/
function matched() {
    chosenCards[0].classList.add("match", "disabled");
    chosenCards[1].classList.add("match", "disabled");
    chosenCards[0].classList.remove("show", "open", "no-event");
    chosenCards[1].classList.remove("show", "open", "no-event");
    chosenCards = [];
}

function unmatched() {
    chosenCards[0].classList.add("unmatched");
    chosenCards[1].classList.add("unmatched");
    disabled();
    setTimeout(function() {
    chosenCards[0].classList.remove("show", "open", "no-event", "unmatched");
    chosenCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    chosenCards = [];
    }, 1100);
}
    //cards are disabled temporarily
function disabled() {
      Array.prototype.filter.call(cards, function(card){
        card.classList.add("disabled");
    });
}
    //cards are enabled and matched cards are disabled
function enable() {
    Array.prototype.filter.call(cards, function(card) {
      card.classList.remove("disabled");
      for (var i = 0; i < matchedCards.length; i++) {
          matchedCards[i].classList.add("disabled");
        }
    });
}
  //close modal function, so the modal can be closed and the game reset
function closeModal() {
    closeIcon.addEventListener("click", function(){
        modal.classList.remove("show");
        startGame();
    });
}

/**
* @description Congratulations function is created
* when all the deck have flipped paired cards
*/
function congrats() {
    if(matchedCards.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
  // a well done modal is shown
  modal.classList.add("show");
    // a varible star rating is created
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("star-rating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
      closeModal();
    };
}
  // play again function
function playAgain() {
    modal.classList.remove("show");
    startGame();
}
  /**
  * Event listener is atached to cards to each card
  * to interact with the player, the game rules
  */
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardFlipped);
    card.addEventListener("click", congrats);
};
