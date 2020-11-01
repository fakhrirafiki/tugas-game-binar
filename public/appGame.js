// (function () {


// Selector
const userChoise = document.querySelector(".user-choice__container");
const userImage = document.getElementById("user-choice__big-image");
const compImage = document.getElementById("comp-choice__big-image");
const boardGame = document.querySelector(".board");
const playerScoreBoard = document.getElementById("user__score");
const compScoreBoard = document.getElementById("comp__score");
const maxScoreBoard = document.getElementById("max__score");
const restartButton = document.getElementById("restart");
let maxScore;
let playerHero, computerHero, winner;
let playerScore = 0;
let computerScore = 0;
let playerHeroes = [];
let compHeroes = [];


// Event Listenner
playerHero = userChoise.addEventListener("click", playerSelector);
maxScoreBoard.onclick = changeMaxScore;
restartButton.onclick = restart;

// Function
function gameInit() {
    maxScore = parseInt(
        prompt(`Please enter a maximum score. Default value is 5`)
    );
    if (!maxScore) {
        alert(`You enter a wrong number, max score return to default 5 `);
        maxScore = 5;
    }
    maxScoreBoard.innerHTML = `MAX SCORE: ${maxScore}`;

}

function playerSelector(e) {
    userChoise.classList.toggle("stopEventListener");
    shake();
    playerHero = e.target.id;
    setTimeout(() => {
        userChoise.classList.toggle("stopEventListener");
        userImage.src = `assets/${playerHero}.png`;
        // console.log(`Player : ${playerHero}`);
        playGame();
    }, 1100);
    // userChoise.classList.toggle("stopEvent");
    // playerHero.style.pointerEvents = "auto";
    playerHeroes.push(playerHero)
    return playerHero;
}

function shake() {
    const shakeStartAt = new Date().getTime();
    setInterval(() => {
        if (new Date().getTime() - shakeStartAt > 1100) {
            clearInterval;
            return
        }
        userImage.src = 'assets/Rock.png';
        compImage.src = 'assets/Rock.png';
        userImage.classList.toggle("shake");
        compImage.classList.toggle("shake");
    }, 100);


}

function playGame() {
    compRandomSelector();
    checkWinner();
    checkMaxScore();
}

function compRandomSelector() {
    computerHero = Math.random();
    if (computerHero < 0.34) {
        computerHero = "Rock";
    } else if (computerHero <= 0.67) {
        computerHero = "Paper";
    } else {
        computerHero = "Scissors";
    }
    compImage.src = `assets/${computerHero}.png`;
    // console.log(`Comp: ${computerHero}`);
    compHeroes.push(computerHero)

    return computerHero;
}

function checkWinner() {
    if (
        (playerHero === "Paper" && computerHero === "Rock") ||
        (playerHero === "Rock" && computerHero === "Scissors") ||
        (playerHero === "Scissors" && computerHero === "Paper")
    ) {
        win();
    } else if (playerHero === computerHero) {
        draw();
    } else {
        lose();
    }
}

function win() {
    boardGame.innerHTML = "You win!";
    playerScore++;
    playerScoreBoard.innerHTML = playerScore;
    // console.log(`You: ${playerScore}, comp: ${computerScore}`);
}

function draw() {
    boardGame.innerHTML = "Draw! It's a tie";
    // console.log(`You: ${playerScore}, comp: ${computerScore}`);
}

function lose() {
    boardGame.innerHTML = "You Lose!";
    computerScore++;
    compScoreBoard.innerHTML = computerScore;
    // console.log(`You: ${playerScore}, comp: ${computerScore}`);
}

function checkMaxScore() {
    if (playerScore < maxScore && computerScore < maxScore) return


    setTimeout(() => {
        if (playerScore === maxScore) {
            winner = 'PLAYER(YOU)';
            alert(`YEEYYYYYY, YOU WIN!!`);
            getGameResult()
            reset();
        }

        if (computerScore === maxScore) {
            winner = 'COMP';
            alert(`HAHAHA, YOU LOSE!!`);
            getGameResult()
            reset();
        }
    }, 100);

}

function getGameResult() {
    gameDetail.maxScore = maxScore;
    gameDetail.playerScore = playerScore;
    gameDetail.computerScore = computerScore;
    gameDetail.playerHeroes = playerHeroes;
    gameDetail.compHeroes = compHeroes;
    gameDetail.winner = winner;
    let gameResult = new GameSesion(gameDetail.maxScore, gameDetail.playerScore, gameDetail.computerScore, gameDetail.playerHeroes, gameDetail.compHeroes, gameDetail.winner);
    console.log(gameResult)
    sendGameResultToServer(gameResult)
}

function sendGameResultToServer(data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('/apis/postGameHistory', options)
}


function reset() {
    playerScore = 0;
    computerScore = 0;
    playerHeroes = [];
    compHeroes = [];
    playerScoreBoard.innerHTML = playerScore;
    compScoreBoard.innerHTML = computerScore;
    userImage.src = 'assets/Rock.png';
    compImage.src = 'assets/Rock.png';
    boardGame.innerHTML = "AYOK SUIT!!";
    maxScoreBoard.innerHTML = `MAX SCORE: ${maxScore}`;
}

function changeMaxScore() {
    askForChange = confirm(
        `Do you want to reset and change the maximum score?`
    );
    if (!askForChange) return;
    reset();
    gameInit();
}

function restart() {
    reset();
}

gameInit();

let gameDetail = {
    maxScore,
    playerScore,
    computerScore,
    compHeroes,
    playerHeroes,
    winner
}


class GameSesion {
    constructor(maxScore, playerScore, computerScore, playerHeroes, compHeroes, winner) {
        this.maxScore = maxScore;
        this.playerScore = playerScore;
        this.computerScore = computerScore;
        this.playerHeroes = playerHeroes;
        this.compHeroes = compHeroes;
        this.time = new Date();
        this.id = new Date().getTime();
        this.winner = winner
    }
}

// })();
