const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let clickedCards = 0;
let unclicked = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  //handle when a card already has 2 classes in the div
  if(event.target.classList.contains('selected')) {
    return;
  }

  //you just clicked, and set the color of the card
  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  //add 'selected' to classes in divs
  if(!firstCard || !secondCard) {
    currentCard.classList.add('selected');
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null: currentCard;
  }

  if(firstCard && secondCard) {
    unclicked = true;

    let temp1 = firstCard.className;
    let temp2 = secondCard.className;

    //there's a match!
    if(temp1 === temp2) {
      clickedCards += 2; //start the counter
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null; //reset
      secondCard = null; //reset
      unclicked = false; //reset
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove('selected');
        secondCard.classList.remove('selected');
        firstCard = null;
        secondCard = null;
        unclicked = false;
      }, 1000);
    }
  }
  if (clickedCards === COLORS.length) {
    alert('game over!');
    
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */