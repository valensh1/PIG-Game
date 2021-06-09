'use strict';

//-------------------------------------DOM VARIABLES-------------------------------------------
const score0DOM = document.querySelector('#score--0'); // Place in DOM that displays Player 1 score
const score1DOM = document.querySelector('#score--1'); // Place in DOM that displays Player 2 score
const currentScore0DOM = document.querySelector('#current--0'); // Place in DOM that displays Player 1 score
const currentScore1DOM = document.querySelector('#current--1'); // Place in DOM that displays Player 2 score
const diceDOM = document.querySelector('.dice'); // Place in DOM that displays the dice
const player1DOM = document.querySelector('.player--0'); // Place in DOM which grabs the entire player1 section so we can change background color when player wins.
const player2DOM = document.querySelector('.player--1'); // Place in DOM which grabs the entire player1 section so we can change background color when player wins.
const btnNewDOM = document.querySelector('.btn--new'); // New Game Button; Place in DOM that displays button for player to select a new game
const btnRollDOM = document.querySelector('.btn--roll'); // Roll Dice Button; Place in DOM that displays button for player to select to roll dice
const btnHoldDOM = document.querySelector('.btn--hold'); // Hold Button; Place in DOM that displays button for player to select to hold their position and then turn goes to other player
const messageDOM = document.querySelector('.message'); // Place in DOM that displays message to user.


//-------------------------------------GLOBAL VARIABLES-------------------------------------------
let scorePlayer1 = 0; // Create variable to hold player 1 score
let scorePlayer2 = 0; // Create variable to hold player 2 score
let activeRollerScore = 0; // Creation of variable for active roller to calculate their points
let playerTurn = 'player1'; // Creation of variable to determine which players turn. Default is player1.
let gameOver = false; // Creation of gameOver which will be used to run a lot of code if gameOver is NOT EQUAL to true
const winningScore = 100; // Creation of variable to which players win the game if they achieve this amount of points

//-------------------------------------INITIAL SET-UP OF GAME------------------------------------
score0DOM.textContent = 0; // Settting initial score of game to 0
score1DOM.textContent = 0; // Settting initial score of game to 0


//---------------------------------------------FUNCTIONS-----------------------------------------
const diceRoll = () => {
    if (gameOver !== true) { // Run code below as long as gameOver is NOT true
    let dice = (Math.floor(Math.random() * 6) + 1); // Generates a random number from 1-6 for dice roll
    console.log(dice); // Print roll of dice to console
    dicePicture(dice); // Pass dice roll to function dicePicture to determine what dice picture to display which matches the number of the dice roll
    activePoints(dice); // Pass dice to points function to calculate the points.
    message(dice); // Pass dice roll to message function to display message to player if they rolled a 1
    }
};

const dicePicture = (dice) => { // Dice from diceRoll function gets passed in as argument
   diceDOM.src = `dice-${dice}.png`; // Take dice and use that as template literal to display correct dice image.
};

const activePoints = (dice) => { // Function to display points of player currently rolling the dice. Dice passed in as argument from diceRoll function.
    if (dice !== 1) {
    activeRollerScore += dice; // If dice is not equal to 1 then total up current points of dice rolls
    playerTurn === 'player1' ? currentScore0DOM.textContent = activeRollerScore : currentScore1DOM.textContent = activeRollerScore; // Update the DOM for active points of person rolling the dice
  } else { // If player rolls a 1 then reset all active points along with the DOM
      activeRollerScore = 0; // Reset active points to 0 since a 1 was rolled
      playerTurn === 'player1' ? currentScore0DOM.textContent = 0 : currentScore1DOM.textContent = 0; // Reset DOM which displays current active points to 0 for the player whose turn just concluded.
      playerTurnFunction(); // Runs this function to determine which players turn it is
    }
};

const addPointsToScoreboard = (activeRollerScore) => { // Function to add current points to player's scoreboard depending on what player chose hold
    playerTurn === 'player1' ? scorePlayer1 += activeRollerScore : scorePlayer2 += activeRollerScore; // Add player choosing to hold current points to player score variable.
    playerTurn === 'player1' ? score0DOM.textContent = scorePlayer1 : score1DOM.textContent = scorePlayer2; // Add player choosing to hold current points to player scoreboard in the DOM
};

const winCheck = () => { // Function to check winner and add class player--winner to the winning player so the player that won gets a dark black background and change gameOver variable to true
    scorePlayer1 >= winningScore ? player1DOM.classList.add('player--winner') : scorePlayer2 >=100 ? player2DOM.classList.add('player--winner') : '';
    scorePlayer1 >= winningScore || scorePlayer2 >=100 ? gameOver = true : ''; // If there is a winner change the gameOver variable to true
}

const playerTurnFunction = () => { // Function to change player turn when player clicks on hold button or when they roll a 1
    if (playerTurn === 'player1') {
        playerTurn = 'player2';
        player1DOM.classList.remove('player--active');
        player2DOM.classList.add('player--active');
    } else if (playerTurn === 'player2') {
        playerTurn = 'player1';
        player2DOM.classList.remove('player--active');
        player1DOM.classList.add('player--active');
    }
};

const diceVisibility = (roll) => { // Function to toggle between showing dice image and not showing dice image
    if (gameOver !== true) {
    roll ? diceDOM.classList.remove('hidden') : diceDOM.classList.toggle('hidden'); // If it receives an argument of roll then it always makes sure dice is visible otherwise it will be toggled and it either adds or removes the hidden class.
    }
};

const gameReset = () => {
    messageDOM.classList.remove('winner'); // Removes winner class so no animations of winning message upon game being reset
    messageDOM.style.display = 'none'; // Removes any messages upon resetting of the game
    player1DOM.classList.remove('player--winner'); // Removes black background from winning player upon game reset
    player2DOM.classList.remove('player--winner'); // Removes black background from winning player upon game reset
    player1DOM.classList.add('player--active'); // Show active player background for player1 on game reset as they will be the first player to roll dice
    player2DOM.classList.remove('player--active'); // Remove any active player background from player2 upon game reset as player 1 will be the one who rolls dice first
    diceDOM.classList.add('hidden'); // Makes dice hidden again
    score0DOM.textContent = 0; // Resets scores displayed in DOM to 0
    score1DOM.textContent = 0; // Resets scores displayed in DOM to 0
    currentScore0DOM.textContent = 0; // Resets scores displayed in DOM to 0
    currentScore1DOM.textContent = 0; // Resets scores displayed in DOM to 0
    playerTurn = 'player1'; // Resets player turn back to player1 to start game
    scorePlayer1 = 0; // Resets all score variables to 0
    scorePlayer2 = 0; // Resets all score variables to 0
    activeRollerScore = 0; // Resets all score variables to 0
    gameOver = false; // Change gameOver variable to false when game is being reset for new game.
};

const message = (dice, hold) => { // Function which delivers message to players such as which player won, which player is holding, if you rolled a 1 and lost all your points.
    if (dice ===1) {
        messageDOM.style.display = 'block'; // Change display to inline-block which shows our message in the DOM to the player 
        messageDOM.textContent = `You lost all your points!!!`; // Message when player rolls a 1
    } else if (hold && scorePlayer1 < winningScore && scorePlayer2 < winningScore) { // Run this line of code when a player chooses hold and they DO NOT have a winning score
        messageDOM.style.display = 'block'; // Change display to inline-block which shows our message in the DOM to the player 
        playerTurn === 'player1' ? messageDOM.textContent = `Player 1 holding` : messageDOM.textContent = 'Player 2 holding'; // Displays message to players to let them know who is holding
    } else if (hold && (scorePlayer1 >= winningScore || scorePlayer2 >= winningScore)) { // Run this line of code when a player chooses hold and they DO have a winning score
        console.log('Wining Message');
        messageDOM.style.display = 'block'; // Change to 'inline-block so message is displayed on screen
        messageDOM.classList.add('winner'); // Add winning class so winning message is animated
        scorePlayer1 >= winningScore ? messageDOM.textContent = `Player 1 Wins!!!` : messageDOM.textContent = `Player 2 Wins!!!`;
    }
};


//----------------------------------------EVENT LISTENERS----------------------------------------
// Rolling Dice Functionality
btnRollDOM.addEventListener('click', () => {
    messageDOM.style.display = 'none';
    diceVisibility('roll'); // Unhide the dice picture because when we first start the game the dice is hidden.
    diceRoll(); // Roll dice 
});

// Hold Button Functionality
btnHoldDOM.addEventListener('click', () => {
    currentScore0DOM.textContent = 0; // Resets scores displayed in DOM to 0
    currentScore1DOM.textContent = 0; // Resets scores displayed in DOM to 0
    diceVisibility(); // Function which determines whether to hide dice image. Run here this will hide dice image
    addPointsToScoreboard(activeRollerScore); // When a player hits hold button this line of code will run which will pass activeRollerScore to function that will then update the DOM for the players score along with the players cumulative score. 
    winCheck(); // Check to see if there is a winner when a player decides to hold
    message(0, 'hold'); // Invoke message function to send message when player is holding; 0 is just a dummy argument passed in since mesage function takes in 2 parameters
    playerTurnFunction(); // This function will run which will change the playersTurn variable to whatever player's turn it is
    activeRollerScore = 0; // Resets active roller score to 0.
});

// New Game Functionality
btnNewDOM.addEventListener('click', () => {
    gameReset();
});