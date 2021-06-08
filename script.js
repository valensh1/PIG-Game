'use strict';

//-------------------------------------DOM VARIABLES-------------------------------------------
const score0DOM = document.querySelector('#score--0'); // Place in DOM that displays Player 1 score
const score1DOM = document.querySelector('#score--1'); // Place in DOM that displays Player 2 score
const currentScore0DOM = document.querySelector('#current--0'); // Place in DOM that displays Player 1 score
const currentScore1DOM = document.querySelector('#current--1'); // Place in DOM that displays Player 2 score
const diceDOM = document.querySelector('.dice'); // Place in DOM that displays the dice
const btnNewDOM = document.querySelector('.btn--new'); // New Game Button; Place in DOM that displays button for player to select a new game
const btnRollDOM = document.querySelector('.btn--roll'); // Roll Dice Button; Place in DOM that displays button for player to select to roll dice
const btnHoldDOM = document.querySelector('.btn--hold'); // Hold Button; Place in DOM that displays button for player to select to hold their position and then turn goes to other player


//-------------------------------------GLOBAL VARIABLES-------------------------------------------
let scorePlayer1 = 0; // Create variable to hold player 1 score
let scorePlayer2 = 0; // Create variable to hold player 2 score
let activeRollerScore = 0; // Creation of variable for active roller to calculate their points
let playerTurn = 'player1'; // Creation of variable to determine which players turn. Default is player1.


//-------------------------------------INITIAL SET-UP OF GAME------------------------------------
score0DOM.textContent = 0; // Settting initial score of game to 0
score1DOM.textContent = 0; // Settting initial score of game to 0
diceDOM.classList.add('hidden'); // Used to hide dice such as at beginning of game; CSS for .hidden class shows display:none


//---------------------------------------------FUNCTIONS-----------------------------------------
const diceRoll = () => {
    let dice = (Math.floor(Math.random() * 6) + 1); // Generates a random number from 1-6 for dice roll
    console.log(dice); // Print roll of dice to console
    dicePicture(dice); // Pass dice roll to function dicePicture to determine what dice picture to display which matches the number of the dice roll
    activePoints(dice); // Pass dice to points function to calculate the points.
};

const dicePicture = (dice) => { // Dice from diceRoll function gets passed in as argument
   diceDOM.src = `dice-${dice}.png`; // Take dice and use that as template literal to display correct dice image.
}

const activePoints = (dice) => { // Function to display points of player currently rolling the dice. Dice passed in as argument from diceRoll function.
    if (dice !== 1) {
    activeRollerScore += dice; // If dice is not equal to 1 then total up current points of dice rolls
    playerTurn === 'player1' ? currentScore0DOM.textContent = activeRollerScore : currentScore1DOM.textContent = activeRollerScore; // Update the DOM for active points of person rolling the dice
  } else { // If player rolls a 1 then reset all active points along with the DOM
      activeRollerScore = 0; // Reset active points to 0 since a 1 was rolled
      playerTurn === 'player1' ? currentScore0DOM.textContent = 0 : currentScore1DOM.textContent = 0; // Reset DOM which displays current active points to 0 for the player whose turn just concluded.
  
    }
}

const addPointsToScoreboard = (activeRollerScore) => {
    playerTurn === 'player1' ? scorePlayer1 += activeRollerScore : scorePlayer2 += activeRollerScore;
    playerTurn === 'player1' ? score0DOM.textContent = scorePlayer1 : score1DOM.textContent = scorePlayer2;
}

const playerTurnFunction = () => { // Function to change player turn when player clicks on hold button or when they roll a 1
    if (playerTurn === 'player1') {
        playerTurn = 'player2';
    } else if (playerTurn === 'player2') {
        playerTurn = 'player1';
    }
}



//----------------------------------------EVENT LISTENERS----------------------------------------
// Rolling Dice Functionality
btnRollDOM.addEventListener('click', () => {
    diceDOM.classList.remove('hidden'); // Unhide the dice picture because when we first start the game the dice is hidden.
    diceRoll(); // Roll dice 
});

// Hold Button Functionality
btnHoldDOM.addEventListener('click', () => {
    addPointsToScoreboard(activeRollerScore); // When a player hits hold button this line of code will run which will pass activeRollerScore to function that will then update the DOM for the players score along with the players cumulative score. 
    playerTurnFunction(); // This function will run which will change the playersTurn variable to whatever player's turn it is
    activeRollerScore = 0; // Resets active roller score to 0.
});