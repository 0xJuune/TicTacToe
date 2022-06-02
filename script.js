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

//   const gameLogic = (() => {
//     const vv = 's';
//     return {
//         vv,
//     };
//   })();

const gameBoard = (() => {
    let board = new Array(9).fill('');
    const cell = document.querySelectorAll('.cell');

    // should probably replace this with player.currentplayer or something weird
    // let currentPlayerSign = 'X' 

    const playerX = Player('X', 'player', true);
    const playerO = Player('O', 'Easy', false);
    
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
                continue;
            }
            else if (a === b && b === c) {
                currentPlayer().addScore()
                console.log(`Player ${currentPlayer().getSymbol()} Wins! Current Score: ${currentPlayer().getScore()}`)
                return true
                // break;
            }
        }
    }

    cell.forEach((position) => {
        position.addEventListener('click', () => {
            if (claimCell(position)) {
            checkWin();
            swapPlayer(currentPlayer());
        }
        }) 
    }); 

    return {
        swapPlayer,
        checkWin,
        claimCell,
        currentPlayer,
        swapPlayer
    };
  })();

// const Player = (symbol, playerType, currentPlayer) => {
//     let score = 0;
//     const getSymbol = () => symbol;
//     const getScore = () => score;
//     const addScore = () => score++;

//     return {
//         // playerType,
//         // currentPlayer,
//         getSymbol,
//         getScore,
//         addScore
//     }
// }

//   const v = (() => {
//     const vv =  ;
//     return {
//         vv,
//     };
//   })();
  