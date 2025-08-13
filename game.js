const elGameHistory = document.getElementById('gameHistory');
const elGameButtons = document.getElementsByClassName('humanChoice');
const elHumanScore = document.getElementById('humanScore');
const elComputerScore = document.getElementById('computerScore');
const elGameWinner = document.getElementById('gameWinner');
const elRestartGame = document.getElementById('restartGame');
const elGameHistoryTitle = document.getElementById('gameHistoryTitle');
const maxGames = 3;

let humanScore = 0;
let computerScore = 0;
let gameNumber = 0;

document.addEventListener('DOMContentLoaded', function () {
    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
}, false);

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3)
    if (randomNumber === 0) {
        return 'rock';
    } else if (randomNumber === 1) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function playRound(humanChoice, computerChoice) {
    let winner;

    if (humanChoice === computerChoice) {
        winner = 'tie';
        gameNumber++;
        updateHistory(winner, humanScore, computerScore, gameNumber);
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        winner = 'human';
        gameNumber++;
        updateHistory(winner, humanScore, computerScore, gameNumber);
    } else {
        computerScore++;
        winner = 'computer';
        gameNumber++;
        updateHistory(winner, humanScore, computerScore, gameNumber);
    }
}

function updateHistory(winner, humanScore, computerScore, gameNumber) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode('Round ' + gameNumber + ': The winner is: ' + winner));
    elGameHistory.appendChild(p);
    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
}

function playGame(humanChoice) {
    elGameHistoryTitle.innerHTML = 'Game History';
    elRestartGame.disabled = false;
    elRestartGame.style.visibility = 'visible';
    const humanSelection = humanChoice;
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    gameWinner();
}

function gameWinner() {
    let gameWinner;

    if (((humanScore || computerScore) > (maxGames / 2) || (gameNumber >= maxGames))) {
        if (humanScore > computerScore) {
            gameWinner = 'You won the game!'
        } else if (computerScore > humanScore) {
            gameWinner = 'The computer won the game!'
        } else {
            gameWinner = 'The game is a tie!'
        }

        let p = document.createElement('p');
        p.appendChild(document.createTextNode(gameWinner));
        elGameWinner.appendChild(p);

        for (let i = 0; i < elGameButtons.length; i++) {
            elGameButtons[i].disabled = true;
        }
    }
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    gameNumber = 0;

    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
    elGameHistory.innerHTML = '';
    elGameWinner.innerHTML = '';
    elRestartGame.style.visibility = 'hidden';
    elGameHistoryTitle.innerHTML = '';

    for (let i = 0; i < elGameButtons.length; i++) {
        elGameButtons[i].disabled = false;
    }
}