var score = 0;
var timer = 60;
var timerInterval;
var enteredWords = [];
//var wordbank = require('words.json');
var wordbank;

fetch("words.json")
  .then(response => response.json())
  .then(data => {
    wordBank = data.words;
  })
  .catch(error => {
    console.error("Error loading word bank:", error);
  });

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
  
    wordInput.value = "";
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
      submitWord();
    }
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

startTimer();
