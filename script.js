var score = 0;
var timer = 60;
var timerInterval;
var enteredWords = [];
//var wordbank = require('words.json');
var wordbank;


var board;

// the reason for more of certain letters is to artifically 'weight' the board to have more of certain letters than others
var alphabet = [
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", // 14 occurrences of "E"
    "T", "T", "T", "T", "T", "T", "T", "T", "T", // 9 occurrences of "T"
    "A", "A", "A", "A", "A", "A", "A", // 7 occurrences of "A"
    "O", "O", "O", "O", "O", "O", "O", // 7 occurrences of "O"
    "I", "I", "I", "I", "I", // 5 occurrences of "I"
    "N", "N", "N", "N", "N", "N", // 6 occurrences of "N"
    "S", "S", "S", "S", // 4 occurrences of "S"
    "H", "H", "H", "H", // 4 occurrences of "H"
    "R", "R", "R", "R", // 4 occurrences of "R"
    "D", "D", "D", "D", // 4 occurrences of "D"
    "L", "L", "L", "L", // 4 occurrences of "L"
    "C", "C", "C", // 3 occurrences of "C"
    "U", "U", "U", // 3 occurrences of "U"
    "M", "M", "M", // 3 occurrences of "M"
    "W", "W", "W", // 3 occurrences of "W"
    "F", "F", "F", // 3 occurrences of "F"
    "G", "G", "G", // 3 occurrences of "G"
    "Y", "Y", "Y", // 3 occurrences of "Y"
    "P", "P", "P", // 3 occurrences of "P"
    "B", "B", // 2 occurrences of "B"
    "V", "V", // 2 occurrences of "V"
    "K", "K", // 2 occurrences of "K"
    "J", "J", // 2 occurrences of "J"
    "X", "X", // 2 occurrences of "X"
    "Q", // 1 occurrence of "Q"
    "Z" // 1 occurrence of "Z"
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
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        var letter = alphabet[randomIndex];
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
            score++;
            document.getElementById("score-value").innerText = score;
            enteredWords.push(word);
        } else {
            alert("Invalid word!");
        }
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
