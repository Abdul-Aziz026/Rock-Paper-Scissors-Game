// // Local storage value print...
let score = JSON.parse(localStorage.getItem
    ('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };
    updateScoreElement();
    /*
    if (!score) {
        score = {
            wins: 0,
            losses: 0,
            ties: 0
        };
    }
        */
    // console.log(score);

    let isAutoPlaying = false;
    let intervalId;

    /*
    const autoPlay = {

    };
    */

    document.body.addEventListener('keydown', (event)=>{
        if (event.key == 'r') {
            playGame('rock');
        }else if (event.key == 'p') {
            playGame('paper');
        }if (event.key == 's') {
            playGame('scissors');
        }
    })

    document.querySelector('.js-rock-button')
    .addEventListener('click', ()=>{
        playGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', ()=>{
        playGame('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', ()=>{
        playGame('scissors');
    });

   
    function autoPlay() {
        if (!isAutoPlaying) {
            document.querySelector('.js-auto-play-button').innerHTML = "Stop AutoPlay";
            intervalId = setInterval(() => {
                let playerMove = pickComputerMove();
                playGame(playerMove);
            }, 2000);
            isAutoPlaying = true;
        } else {
            document.querySelector('.js-auto-play-button').innerHTML = "Auto Play";
            clearInterval(intervalId);
            isAutoPlaying = false;
        }
    }

    function playGame(player) {
        const computerMove = pickComputerMove();
        // winner check using condition
        result = '';
        if (player == 'scissors') {
            if (computerMove === 'rock') {
                result = 'You Lose';
            } else if (computerMove == 'paper') {
                result = 'You Win';
            } else if (computerMove == 'scissors') {
                result = 'Result Tie';
            }
        } else if (player === 'paper') {
            if (computerMove == 'rock') {
                result = 'You Win';
            } else if (computerMove == 'paper') {
                result = 'Result Tie';
            } else if (computerMove == 'scissors') {
                result = 'You Lose';
            }
        }
        else {
            if (computerMove == 'rock') {
                result = 'Result Tie';
            } else if (computerMove == 'paper') {
                result = 'You Lose';
            } else if (computerMove == 'scissors') {
                result = 'You Win';
            }
        }
        // winer, losser and tie count update...
        if (result == 'You Win') score.wins += 1;
        else if (result == 'You Lose') score.losses += 1;
        else score.ties += 1;


        // localStorage
        localStorage.setItem('score', JSON.stringify(score));
        
        document.querySelector('.js-result')
        .innerHTML = result;
    
        document.querySelector('.js-moves')
        .innerHTML = `you <img src="images/${player}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer
`;
        
        updateScoreElement();
    }

    function updateScoreElement() {
        // console.log(score);
        document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function pickComputerMove() {
        randomNumber = Math.random() ;
        let computerMove = '';
        if (randomNumber >= 0 && randomNumber < 1/3) {
            computerMove = 'rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
            computerMove = 'paper';
        } else {
            computerMove = 'scissors';
        }
        return computerMove;
    }