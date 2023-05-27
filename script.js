var score = 0;
var timer = 60;
var timerInterval;
var enteredWords = [];
//var wordbank = require('words.json');
var wordbank;


var board;
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


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

function generateBoard() { //to test a board with all A's
    var boardElement = document.getElementById("board");
    boardElement.innerHTML = ""; // Clear previous tiles
    
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var tile = document.createElement("div");
        tile.textContent = "A";
        boardElement.appendChild(tile);
      }
    }
  }

function renderBoard() {
    var boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
  
    for (var i = 0; i < board.length; i++) {
      var row = document.createElement("div");
  
      for (var j = 0; j < board[i].length; j++) {
        var cell = document.createElement("div");
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
        if (enteredWords.includes(word)) {
          alert("You have already entered this word!");
        } else if (wordBank.includes(word)) {
            // Perform word scoring logic here
            score++;
            document.getElementById("score-value").innerText = score;
            enteredWords.push(word);
        } else {
            alert("Invalid word!");
        }
      }
    
    if (word === "Thank you Yahli") {
        alert("You're very welcome! hope this has been fun for you, here's 3 points");
        score += 3;
    }
  
    wordInput.value = "";
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
    // Perform end game logic here
  }
}


fetch("words.json")
    .then(response => response.json())
    .then(data => {
        wordBank = data.words;
        generateBoard();
        renderBoard();
    })
    .catch(error => {
        console.error("Error loading word bank:", error);
    });

document.addEventListener("DOMContentLoaded", function() {
    generateBoard();
});

startTimer();
