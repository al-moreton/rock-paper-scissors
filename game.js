const elGameHistory = document.getElementById('gameHistory');
const elGameButtons = document.getElementsByClassName('humanChoice');
const elHumanScore = document.getElementById('humanScore');
const elComputerScore = document.getElementById('computerScore');
const elGameWinner = document.getElementById('gameWinner');
const elRestartGame = document.getElementById('restartGame');
const elGameHistoryTitle = document.getElementById('gameHistoryTitle');
const elFullGameHistory = document.getElementById('fullGameHistory');
const maxGames = 3;

let humanScore = 0;
let computerScore = 0;
let roundNumber = 0;
let gameNumber = 0;
let fullGameHistory = [];

document.addEventListener('DOMContentLoaded', function () {
    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
    elRestartGame.style.display = 'none';
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
        winner = 'It\s a tie!';
        roundNumber++;
        updateHistory(winner, humanScore, computerScore, roundNumber, computerChoice, humanChoice);
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        winner = 'You win!';
        roundNumber++;
        updateHistory(winner, humanScore, computerScore, roundNumber, computerChoice, humanChoice);
    } else {
        computerScore++;
        winner = 'The computer wins!';
        roundNumber++;
        updateHistory(winner, humanScore, computerScore, roundNumber, computerChoice, humanChoice);
    }
}

function updateHistory(winner, humanScore, computerScore, roundNumber, computerChoice, humanChoice) {
    let p = document.createElement('p');

    if (computerChoice === humanChoice) {
        p.appendChild(document.createTextNode('Round ' + roundNumber +
            ': You both chose ' + computerChoice + '. ' + winner));
    } else {
        p.appendChild(document.createTextNode('Round ' + roundNumber +
            ': The computer chose ' + computerChoice + '. ' + winner));
    }

    elGameHistory.appendChild(p);
    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
}

function playGame(humanChoice) {
    elGameHistoryTitle.innerHTML = 'Game History';
    elRestartGame.disabled = false;
    elRestartGame.style.display = 'block';
    playRound(humanChoice, getComputerChoice());
    gameWinner();
}

function gameWinner() {
    let gameWinner;

    if (((humanScore || computerScore) > (maxGames / 2) || (roundNumber >= maxGames))) {
        gameNumber++;
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

        addToFullGameHistory(gameNumber, humanScore, computerScore);
    }
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    roundNumber = 0;

    elHumanScore.innerText = 'Human: ' + humanScore + '/' + maxGames;
    elComputerScore.innerText = 'Computer: ' + computerScore + '/' + maxGames;
    elGameHistory.innerHTML = '';
    elGameWinner.innerHTML = '';
    elRestartGame.style.display = 'none';
    elGameHistoryTitle.innerHTML = '';

    for (let i = 0; i < elGameButtons.length; i++) {
        elGameButtons[i].disabled = false;
    }
}

// Add local storage to keep a game history
// With the ability to look at previous game moves?

function addToFullGameHistory(gameNumber, humanScore, computerScore) {
    elFullGameHistory.innerHTML = '';
    fullGameHistory.push([gameNumber, humanScore, computerScore]);

    fullGameHistory.forEach((element) => {
        element.forEach((element, index) => {
            if (index === 0) {
                let el = document.createElement('h4');
                el.style.marginBottom = '0px';
                el.appendChild(document.createTextNode('Game: ' + element));
                elFullGameHistory.appendChild(el);
            } else if (index === 1) {
                let el = document.createElement('span');
                el.appendChild(document.createTextNode('Human: ' + element + ' '));
                elFullGameHistory.appendChild(el);
            } else {
                let el = document.createElement('span');
                el.appendChild(document.createTextNode('Computer: ' + element));
                elFullGameHistory.appendChild(el);
            }
        });
    });
}