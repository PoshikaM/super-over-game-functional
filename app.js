let batting = document.getElementById("strike");
let reset = document.getElementById("reset");
let $scoreteam1 = document.getElementById("score-team1");
let $wicketTeam1 = document.getElementById("wickets-team1");
let $scoreteam2 = document.getElementById("score-team2");
let $wicketTeam2 = document.getElementById("wickets-team2");

const battingAudio = new Audio("http://bit.ly/so-ball-hit");
const gameLostAudio = new Audio("http://bit.ly/so-crowd-cheer");

var score$scoreteam1 = 0;
var wick$wicketTeam1 = 0;
var scoreteam2 = 0;
var wi$wicketTeam2 = 0;
var team1BallsFaced = 0;
var team2BallsFaced = 0;
var turn = 1;
const possibleScores = [0, 1, 2, 3, 4, 6, "W"];

function updateScore() {
    $scoreteam1.textContent = score$scoreteam1;
    $wicketTeam1.textContent = wick$wicketTeam1;
    $scoreteam2.textContent = scoreteam2;
    $wicketTeam2.textContent = wi$wicketTeam2;
}  

function gameOver() {
  gameLostAudio.play();
  if (score$scoreteam1 > scoreteam2) alert("India wins");
  if (scoreteam2 > score$scoreteam1) alert("Pakistan wins");
  if (scoreteam2 === score$scoreteam1) alert("This match is draw");
}

reset.onclick = () => {
  window.location.reload();
};

batting.onclick = () => {
  battingAudio.pause();
  battingAudio.currentTime = 0;
  battingAudio.play();

  const randomElement = possibleScores[Math.floor(Math.random() * possibleScores.length)];

  if (turn === 2) {
    team2BallsFaced++;
    document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`).textContent = randomElement;

    if(randomElement === "W"){
      wi$wicketTeam2++;
    }else {
      scoreteam2 += randomElement;
    }

    if (team2BallsFaced === 6 || wi$wicketTeam2 === 2 || scoreteam2 > score$scoreteam1){
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1BallsFaced++;
    document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`).textContent = randomElement;
    
    if(randomElement === "W") {
      wick$wicketTeam1++;
    }else {
      score$scoreteam1 += randomElement;
    }

    if(team1BallsFaced === 6 || wick$wicketTeam1 === 2) turn = 2;
  }
  updateScore();
};