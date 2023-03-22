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

// buttons to disable

const guessBtn = document.getElementById("guessBtn");

const passBtn = document.getElementById("passBtn");

const r2Btn = document.getElementById("r2Btn");

// Game tiles

const gameTiles = document.querySelectorAll(".tile");

const tile = document.querySelector(".tile");

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
    startMessageP1.innerText = "Player 1 Starts!";
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




    // for (let i of PQs) {
    //   if (i.category == "Nature") {
    //     let natObj = i;
    //     console.log(natObj);
    //     displayQuestion(natObj);

    //   } else if (i.category == "Animals") {
        // console.log(i);

    //   } else if (i.category == "Computers") {
        // console.log(i);
    //   }
    // }
  });

// }

// function to display question when game tiles are clicked

function displayQuestion(quest, cat, index) {
  const item = cat[index];
  item.addEventListener("click", () => {
    item.innerText = quest.question;
    item.style.color = "white";
    item.style["font-size"] = "20px";
    // enable guess and pass button when first tile is clicked
    guessBtn.disabled = false;
    passBtn.disabled = false;
  });
};

// function displayQuest(catObj) {
//   for (let index = 0; index < nature.length; index++) {
//     nature[index].innerText = catObj.question;
//   }
// }
