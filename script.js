var score = 0;
var timer = 60;
var timerInterval;
var enteredWords = [];
//var wordbank = require('words.json');
var wordbank;


var board;

// the reason for more of certain letters is to artifically 'weight' the board to have more of certain letters than others
var alphabet = [
    { letter: "E", weight: 14 },
    { letter: "T", weight: 9 },
    { letter: "A", weight: 7 },
    { letter: "O", weight: 7 },
    { letter: "I", weight: 5 },
    { letter: "N", weight: 6 },
    { letter: "S", weight: 4 },
    { letter: "H", weight: 4 },
    { letter: "R", weight: 4 },
    { letter: "D", weight: 4 },
    { letter: "L", weight: 4 },
    { letter: "C", weight: 3 },
    { letter: "U", weight: 3 },
    { letter: "M", weight: 3 },
    { letter: "W", weight: 3 },
    { letter: "F", weight: 3 },
    { letter: "G", weight: 3 },
    { letter: "Y", weight: 3 },
    { letter: "P", weight: 3 },
    { letter: "B", weight: 2 },
    { letter: "V", weight: 2 },
    { letter: "K", weight: 2 },
    { letter: "J", weight: 2 },
    { letter: "X", weight: 2 },
    { letter: "Q", weight: 1 },
    { letter: "Z", weight: 1 }
  ];
  
  

// this function theoretically randomly generates a board but it doesn't work rn
// function generateBoard() {
//     var date = new Date();
//     var dateString = date.toDateString();
//     var seed = dateString.replace(/[^0-9]/g, ''); // Extract numeric characters from the date string
//     var random = new Math.seedrandom(seed); // Initialize the random number generator with the seed
  
//     var boardElement = document.getElementById("board");
//     boardElement.innerHTML = ""; // Clear previous tiles
  
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         var randomIndex = Math.floor(random() * alphabet.length);
//         var letter = alphabet[randomIndex];
  
//         var tile = document.createElement("div");
//         tile.textContent = letter;
//         boardElement.appendChild(tile);
//       }
//     }
// }

// function generateBoard() { //to test a board with all A's
//     var boardElement = document.getElementById("board");
//     boardElement.innerHTML = ""; // Clear previous tiles
    
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         var tile = document.createElement("div");
//         tile.textContent = "A";
//         boardElement.appendChild(tile);
//       }
//     }
//   }

function generateBoard() {
    board = [];
  
    for (var i = 0; i < 4; i++) {
      var row = [];
  
      for (var j = 0; j < 4; j++) {
        var totalWeight = alphabet.reduce((acc, letter) => acc + letter.weight, 0); //to take into account weights
        var randomWeight = Math.random() * totalWeight;
  
        var cumulativeWeight = 0;
        var randomIndex = -1;
        for (var k = 0; k < alphabet.length; k++) {
          cumulativeWeight += alphabet[k].weight;
          if (randomWeight <= cumulativeWeight) {
            randomIndex = k;
            break;
          }
        }
  
        var letter = alphabet[randomIndex].letter;
        row.push(letter);
      }
  
      board.push(row);
    }
  }
  

function renderBoard() {
    var boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
  
    for (var i = 0; i < board.length; i++) {
      var row = document.createElement("div");
  
      for (var j = 0; j < board[i].length; j++) {
        var cell = document.createElement("div");
        cell.classList.add("tile");
        cell.innerText = board[i][j];
        row.appendChild(cell);
      }
  
      boardContainer.appendChild(row);
    }
}

function submitWord() {
    var wordInput = document.getElementById("word-input");
    var word = wordInput.value.trim();
  
    if (word !== "") {
        if (word === "Thank you Yahli") {
            alert("You're very welcome! hope this has been fun for you, here's a point");
            score++;
            document.getElementById("score-value").innerText = score;
        }
        else if (enteredWords.includes(word)) {
          alert("You have already entered this word!");
        } else if (wordBank.includes(word)) {
            // Perform word scoring logic here
            var wordScore = calculateWordScore(word);
            score += wordScore;
            document.getElementById("score-value").innerText = score;
            enteredWords.push(word);
        } else {
            alert("Invalid word!");
        }
      }
  
    wordInput.value = "";
}


function calculateWordScore(word) {
    var wordLength = word.length;
    var wordScore = 0;
    
    if (wordLength === 2) {
      wordScore = 0;
    } else if (wordLength === 3) {
      wordScore = 100;
    } else if (wordLength === 4) {
      wordScore = 400;
    } else if (wordLength === 5) {
      wordScore = 800;
    } else if (wordLength === 6) {
      wordScore = 1200;
    } else if (wordLength === 7) {
      wordScore = 1600;
    } else if (wordLength === 8) {
      wordScore = 2000;
    } else if (wordLength === 9) {
      wordScore = 2400;
    } else if (wordLength >= 10) {
      wordScore = 3000;
    }
    
    return wordScore;
}
  

function handleKeyDown(event) {
    if (event.key === "Enter") {
      submitWord();
    }
    else if (event.keyCode === 13) {
        submitWord();
    }
}

function isValidWord(word) {
    return wordBank.includes(word);
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}



function updateTimer() {
    timer--;
    document.getElementById("timer-value").innerText = timer;
  
    if (timer === 0) {
      clearInterval(timerInterval);
      document.getElementById("word-input").disabled = true;
  
      var message = "Congrats! Your score was: " + score + "! Come back tomorrow to play again!";
      alert(message);
  
      // Perform end game logic here
    }
}
  
function startGame() {
    var startContainer = document.getElementById("start-container");
    var gameContainer = document.getElementById("game-container");
  
    startContainer.style.display = "none";
    gameContainer.style.display = "block";
  
    generateBoard();
    renderBoard();
    startTimer();
  }


fetch("words.json")
    .then(response => response.json())
    .then(data => {
        wordBank = data.words;
        //generateBoard(); //start game now calls these
        //renderBoard(); //start game now calls these
    })
    .catch(error => {
        console.error("Error loading word bank:", error);
    });

document.addEventListener("DOMContentLoaded", function() {
    generateBoard();
});

// startTimer(); // start game now calls these
