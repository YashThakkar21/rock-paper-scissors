// default operator ||.
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
      score.Losses++;
    }
    else if (computerMove === 'paper') {
      result = 'You win';
      score.Wins++;
    }
    else if (computerMove === 'scissors') {
      result = 'Tie'; 
      score.Ties++;
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win';
      score.Wins++;
    }
    else if (computerMove === 'paper') {
      result = 'Tie';
      score.Ties++;
    }
    else if (computerMove === 'scissors') {
      result = 'You lose'; 
      score.Losses++;
    }
  }
  
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
      score.Ties++;
    }
    else if (computerMove === 'paper') {
      result = 'You lose';
      score.Losses++;
    }
    else if (computerMove === 'scissors') {
      result = 'You win'; 
      score.Wins++;
    }
  }

  updateScoreElement();

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = `${result}.`;
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class='move-icon'>
  <img src="images/${computerMove}-emoji.png" class='move-icon'> Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}.`;
}

function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  }
  else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}
