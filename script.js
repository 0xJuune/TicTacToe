const Player = (symbol, playerType, currentPlayer) => {
    const getSymbol = () => symbol;
    const getPlayerType = () => playerType;
    const getCurrentPlayer = () => currentPlayer;
    const updateCurrentPlayer = (currentStatus) => currentPlayer = currentStatus;
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {
        getSymbol,
        getPlayerType,
        getCurrentPlayer,
        updateCurrentPlayer,
        getScore,
        addScore
    }
}

const pageFunc = (() => {
    const butt = document.getElementById('reset')
    const boardContainer = document.querySelector('.gameBoard')
    const leftScore = document.getElementById('leftScore')
    const rightScore = document.getElementById('rightScore')
    

    const highlightWin = (a, b, c) => {
        document.getElementById(a).style.color = "green";
        document.getElementById(b).style.color = "green";
        document.getElementById(c).style.color = "green";
    }

    const appendScore = () => {
        leftScore.textContent = `${gameBoard.getPlayer('x').getSymbol()}'s Score: ${gameBoard.getPlayer('x').getScore()}`
        rightScore.textContent = `${gameBoard.getPlayer('o').getSymbol()}'s Score: ${gameBoard.getPlayer('o').getScore()}`
    }
    
    boardContainer.addEventListener('click', () => {
        appendScore();
    }, {once : true});

    butt.addEventListener('click', () => {
        gameBoard.resetGameBoard();
    })

    return {
        highlightWin,
        appendScore,
    };
})();

const gameBoard = (() => {
    let board = new Array(9).fill('');
    const cell = document.querySelectorAll('.cell');
    const playerX = Player('X', 'player', true);
    const playerO = Player('O', 'Easy', false);
    let gameOverStatus = false;
    

    const getPlayer = (a) => {
       return a === 'x' ? playerX : playerO;
    }

    const swapPlayer = (a) => {
        switch(a) {
            case playerX:
                // currentPlayerSign = playerO.getSymbol();
                playerX.updateCurrentPlayer(false);
                playerO.updateCurrentPlayer(true);
                break;
            case playerO:
                // currentPlayerSign = playerX.getSymbol();
                playerO.updateCurrentPlayer(false);
                playerX.updateCurrentPlayer(true);
            break;
        };
    };
    
    const currentPlayer = () => {
        return playerX.getCurrentPlayer() === true ? playerX : playerO;
    }    

    const claimCell = (a) => {
        if (a.textContent === '') {
            a.textContent = currentPlayer().getSymbol();
            board[a.id] = currentPlayer().getSymbol();
            return true;
        }
        else {
            console.log('cell previously claimed');
            return false;
        }
    }

    const checkWin = () => {
        const winningMoves = 
            [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];

        for (let i = 0; i <= 7; i++) {
            const winPattern = winningMoves[i];
            let a = board[winPattern[0]];    
            let b = board[winPattern[1]];
            let c = board[winPattern[2]];
            if (a === '' || b === '' || c === '') {
                gameOverStatus = false;
                continue;
            }
            else if (a === b && b === c) {
                currentPlayer().addScore()
                pageFunc.appendScore()
                console.log(`Player ${currentPlayer().getSymbol()} Wins! Current Score: ${currentPlayer().getScore()}`)
                gameOverStatus = true;
                pageFunc.highlightWin(winPattern[0], winPattern[1], winPattern[2]);
                break;
            }
            // else if (a != '' && b != '' && c != '') {
            //     gameOverStatus = true;
            //     console.log('tie! you both suck')
            // }
        }
    }

    const resetGameBoard = () => {
        console.log('reset')
        gameOverStatus = false;
        board.fill('');
        playerX.updateCurrentPlayer(true);
        playerO.updateCurrentPlayer(false);
        cell.forEach((element) => {
            element.textContent = '';
            element.style.color = "black";
        })
    }

    const roundOver = (element) => {
        if (!gameOverStatus) {
            if (claimCell(element)) {
            checkWin();
            swapPlayer(currentPlayer());
        }}
        else {
            // resetGameBoard();
        };
    }

    cell.forEach((element) => {
        element.addEventListener('click', () => {
            roundOver(element);
        }) 
    }); 

    return {
        swapPlayer,
        checkWin,
        claimCell,
        resetGameBoard,
        currentPlayer,
        swapPlayer,
        getPlayer,
    };
  })();