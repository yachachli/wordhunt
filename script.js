var score = 0;
var timer = 60;
var timerInterval;
var enteredWords = [];

function submitWord() {
    var wordInput = document.getElementById("word-input");
    var word = wordInput.value.trim();
  
    if (word !== "") {
      if (enteredWords.includes(word)) {
        alert("You have already entered this word!");
      } else {
        // Perform word scoring logic here
        score++;
        document.getElementById("score-value").innerText = score;
        enteredWords.push(word);
      }
    }
  
    wordInput.value = "";
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
