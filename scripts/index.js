// Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable essentially
// import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the files data
// console.log({ placeholderQuestions });
// console.log(placeholderQuestions[0]);
// When I need a question/Answer I can iterate over the array

// Start message
const startMessageP1 = document.querySelector(".startMsg");
// setting player turn, score, current question,
let playerTurn = 0;

let player1Score = JSON.parse(localStorage.getItem("p1Score"));
let player2Score = JSON.parse(localStorage.getItem("p2Score"));

let currentQuest = null;

let alreadyPassed = false;

let readyForNewTile = true;

let round = JSON.parse(localStorage.getItem("round"));

// let finalRound = false;

// function to update player score
// ! Added scores to localstorage to pass them between rounds
function changeScore(playerNum, scoreChange) {
  if (playerNum === 1) {
    player1Score += scoreChange;
    document.getElementById("score1").innerText = player1Score;
    localStorage.setItem("p1Score", player1Score);
  } else {
    player2Score += scoreChange;
    document.getElementById("score2").innerText = player2Score;
    localStorage.setItem("p2Score", player2Score);
  }
}

changeScore(1, 0);
changeScore(2, 0);

// function to change turn
function changeTurn() {
  playerTurn = playerTurn === 1 ? 2 : 1;
  // console.log(playerNum);
  startMessageP1.innerText = `Player ${playerTurn}'s Turn!`;
}

// button variables to be disabled upon round one page loading

const guessBtn = document.querySelector(".guessBtn");

const passBtn = document.querySelector(".passBtn");

const roundChgBtn = document.querySelector(".roundChgBtn");

// Game tile global variables

let gameTiles = document.querySelectorAll(".tile");

const tile = document.querySelector(".tile");

let currentTile = null;

// Game tiles separated by column/category

const nature = document.querySelectorAll(".tile.C1");

const animals = document.querySelectorAll(".tile.C2");

const computers = document.querySelectorAll(".tile.C3");

const mythology = document.querySelectorAll(".tile.C4");

const history = document.querySelectorAll(".tile.C5");

const general = document.querySelectorAll(".tile.C6");

let finalCat = document.querySelectorAll(".finalcat");

// upon loading round 1 page, buttons are disabled
window.addEventListener("load", (e) => {
  guessBtn.disabled = true;
  passBtn.disabled = true;
  readyForNextRound();

  setTimeout(() => {
    changeTurn();
  }, 1000);
});

// deactivate round 2 button anchor tag
roundChgBtn.style.pointerEvents = "none";

// function fetchPlaceholder() {
fetch("./placeholder-questions.json")
  .then((res) => res.json())
  .then((data) => {
    let PQs = data.placeholderQuestions;

    let finalQuest = PQs[60].question;
    console.log(finalQuest);

    console.log(round);

    // ---------------------- Round 1 Questions -------------------------------------------
    // Filtering by each category and passing into displayQuestion func
    // ! Altered logic in fetch to pass in item.round in order for round 1 cards to be displayed on round 1 only and round 2 cards to be displayed on round 2 only.
    let naturePqs = PQs.filter((item) => {
      return item.category == "Nature" && item.round == round;
    });

    for (let index = 0; index < nature.length; index++) {
      displayQuestion(naturePqs[index], nature, index);
    }

    let animalsPqs = PQs.filter((item) => {
      return item.category == "Animals" && item.round == round;
    });

    for (let index = 0; index < animals.length; index++) {
      displayQuestion(animalsPqs[index], animals, index);
    }

    let computersPqs = PQs.filter((item) => {
      return item.category == "Computers" && item.round == round;
    });

    for (let index = 0; index < computers.length; index++) {
      displayQuestion(computersPqs[index], computers, index);
    }

    let mythologyPqs = PQs.filter((item) => {
      return item.category == "Mythology" && item.round == round;
    });

    for (let index = 0; index < mythology.length; index++) {
      displayQuestion(mythologyPqs[index], mythology, index);
    }

    let historyPqs = PQs.filter((item) => {
      return item.category == "History" && item.round == round;
    });

    for (let index = 0; index < history.length; index++) {
      displayQuestion(historyPqs[index], history, index);
    }

    let generalPqs = PQs.filter((item) => {
      return item.category == "General" && item.round == round;
    });

    for (let index = 0; index < general.length; index++) {
      displayQuestion(generalPqs[index], general, index);
    }

    console.log(round);
  });

// function to display question when game tiles are clicked
// Alerts user if they try to select a new tile when they haven't guessed or passed on the current tile
function displayQuestion(quest, tile, index) {
  const item = tile[index];
  item.addEventListener("click", () => {
    if (readyForNewTile !== true) {
      let guessOrPass = document.querySelector(".guessorpass");
      guessOrPass.innerText = "Please guess or pass!";
      setTimeout(() => {
        guessOrPass.innerText = "";
      }, 2000);
      return;
    }
    item.innerText = quest.question;
    item.style.color = "white";
    item.style["font-size"] = "20px";
    currentQuest = quest;
    currentTile = item;
    // enable guess and pass button when first tile is clicked
    guessBtn.disabled = false;
    passBtn.disabled = false;
    readyForNewTile = false;
  });
}

// pass button event: calls changeTurn and switches to the next players turn
// if both players have passed, tile is closed out
passBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nextPlayer = playerTurn === 1 ? 2 : 1;
  changeTurn(nextPlayer);
  if (alreadyPassed) {
    closeTile(currentTile);
  } else {
    alreadyPassed = true;
  }
});

// on click event for guess
// takes user input value and check for correct answer
guessBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let answerInput = document.getElementById("Answer");
  let userGuess = answerInput.value.toLowerCase();

  // ! Fixed Logic here to check user input vs actual answer. This fixed the scoring to accurately tally score.
  // ! Also fixed logic so that if player gets question correct, it is still the same player's turn.
  let isCorrect = userGuess === currentQuest.answer.toLowerCase();
  console.log(currentQuest.answer);
  console.log(userGuess);
  if (isCorrect == true) {
    changeScore(playerTurn, currentQuest.score);
    closeTile(currentTile);
  } else {
    changeScore(playerTurn, -currentQuest.score);
    changeTurn();
    if (alreadyPassed) {
      closeTile(currentTile);
    } else {
      alreadyPassed = true;
    }
  }
  answerInput.value = "";
});

// makes tile blank after it has been answered or passed by both players
function closeTile(node) {
  node.innerText = "";
  readyForNewTile = true;
  alreadyPassed = false;
  readyForNextRound();
}

// ! Added in function to separate rounds and allow player to move onto round 2 when board is cleared or score reaches 15,000 & 30,000
// function determines which round is active
function readyForNextRound() {
  gameTiles = [...gameTiles];
  let clearBoard = gameTiles.every((tile) => tile.innerText === "");
  if (round != 2 && !clearBoard) {
    round = 1;
    localStorage.setItem("round", round);
  }

  if (
    (round == 1 && clearBoard) ||
    player1Score >= 15000 ||
    player2Score >= 15000
  ) {
    round = 2;
    localStorage.setItem("round", round);
    alert("End of Round 1!");

    roundChgBtn.style.pointerEvents = "auto";
    console.log(round);
  }
  if (
    (round == 2 && clearBoard) ||
    player1Score >= 30000 ||
    player2Score >= 30000
  ) {
    round = 3;
    localStorage.setItem("round", round);
    alert("End of Round 2!");
    roundChgBtn.style.pointerEvents = "auto";
  }
}
