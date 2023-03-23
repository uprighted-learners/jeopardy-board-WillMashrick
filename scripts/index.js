// Do not change the import statement
// This statement imports the exported file so its contents are accessible to us.
// This makes the "placeholderQuestions" act like a variable essentially
// import placeholderQuestions from "./placeholder-questions.js";
// Is an object whose contents are the files data
// console.log({ placeholderQuestions });
// console.log(placeholderQuestions[0]);
// When I need a question/Answer I can iterate over the array

// Start message
const startMessageP1 = document.getElementById("r1-sub");
// setting player turn, score, current question, 
let playerTurn = 0;



let player1Score = 0;
let player2Score = 0;

let currentQuest = null;

let alreadyPassed = false;

let readyForNewTile = true;

// function to update player score
function changeScore (playerNum,scoreChange) {
  if (playerNum === 1) {
    player1Score += scoreChange;
    document.getElementById("score1").innerText = player1Score;
  } else {
    player2Score += scoreChange;
    document.getElementById("score2").innerText = player2Score;
  }
}

changeScore(1, 0);
changeScore(2, 0);

// function to change turn
function changeTurn () {
  playerTurn = playerTurn === 1 ? 2 : 1;
  // console.log(playerNum);
  startMessageP1.innerText = `Player ${playerTurn}'s Turn!`;
};

// button variables to be disabled upon round one page loading

const guessBtn = document.getElementById("guessBtn");

const passBtn = document.getElementById("passBtn");

const r2Btn = document.getElementById("r2Btn");

// Game tile global variables

const gameTiles = document.querySelectorAll(".tile");

const tile = document.querySelector(".tile");

let currentTile = null;

// Game tiles separated by column/category

const nature = document.querySelectorAll(".tile.C1");

const animals = document.querySelectorAll(".tile.C2");

const computers = document.querySelectorAll(".tile.C3");

const mythology = document.querySelectorAll(".tile.C4");

const history = document.querySelectorAll(".tile.C5");

const general = document.querySelectorAll(".tile.C6");

// const nature2 = document.querySelectorAll(".tile.C7");

// const animals2 = document.querySelectorAll(".tile.C8");

// const computers2 = document.querySelectorAll(".tile.C9");

// const mythology2 = document.querySelectorAll(".tile.C10");

// const history2 = document.querySelectorAll(".tile.C11");

// const general2 = document.querySelectorAll(".tile.C12");

// testing:

// nature.forEach((t) => {
//   t.innerText = "N!";
// });

// animals.forEach((t) => {
//   t.innerText = "A!";
// });

// computers.forEach((t) => {
//   t.innerText = "C!";
// });


// console.log(startMessageP1.innerText);

// upon loading round 1 page, buttons are disabled
window.addEventListener("load", (e) => {
  guessBtn.disabled = true;
  passBtn.disabled = true;

  setTimeout(() => {
    changeTurn();
  }, 1000);
});

// deactivate round 2 button anchor tag
r2Btn.style.pointerEvents = "none";
// r2Btn.style.pointerEvents = 'auto';

// function fetchPlaceholder() {
fetch("./placeholder-questions.json")
  .then((res) => res.json())
  .then((data) => {
    let PQs = data.placeholderQuestions;
    // console.log(PQs.question);

// Filtering by each category and passing into displayQuestion func

    const naturePqs = PQs.filter((item) => {
      
      return item.category == "Nature";
    });
        console.log(naturePqs);

    for (let index = 0; index < (nature.length); index++) {
      displayQuestion(naturePqs[index], nature, index);
      console.log(naturePqs[index]);
      console.log(nature);
    };

    const animalsPqs = PQs.filter((item) => {
      
      return item.category == "Animals";
    });

    for (let index = 0; index < animals.length; index++) {
      displayQuestion(animalsPqs[index], animals, index);
    };

    const computersPqs = PQs.filter((item) => {
      
      return item.category == "Computers";
    });

    for (let index = 0; index < computers.length; index++) {
      displayQuestion(computersPqs[index], computers, index);
    };

    const mythologyPqs = PQs.filter((item) => {
      
      return item.category == "Mythology";
    });

    for (let index = 0; index < mythology.length; index++) {
      displayQuestion(mythologyPqs[index], mythology, index);
    };

    const historyPqs = PQs.filter((item) => {
      
      return item.category == "History";
    });

    for (let index = 0; index < history.length; index++) {
      displayQuestion(historyPqs[index], history, index);
    };

    const generalPqs = PQs.filter((item) => {
      
      return item.category == "General";
    });

    for (let index = 0; index < general.length; index++) {
      displayQuestion(generalPqs[index], general, index);
    };
  });

// }

// function to display question when game tiles are clicked
// Alerts user if they try to select a new tile when they haven't guessed or passed on the current tile
function displayQuestion(quest, tile, index) {
  const item = tile[index];
  item.addEventListener("click", () => {
    if (readyForNewTile !== true) {
      let guessOrPass = document.getElementById("guessorpass");
      guessOrPass.innerText = "Please guess or pass!";
      setTimeout(() => {
        guessOrPass.innerText = ""
      },2000);
      return
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
};

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
  let userGuess = answerInput.value;

  let isCorrect = userGuess === currentQuest.answer;
    console.log(currentQuest.answer);
  if (isCorrect = true) {
    changeScore(playerTurn, currentQuest.score);
    closeTile(currentTile);
  } else if (isCorrect = false) {
    changeScore(playerTurn, -currentQuest.score);
    if (alreadyPassed) {
      closeTile(currentTile);
    } else { 
      alreadyPassed = true;
    }
  }
  answerInput.value = "";
  changeTurn();
});

// makes tile blank after it has been answered or passed by both players
function closeTile (node) {
  node.innerText = "";
  readyForNewTile = true;
}

