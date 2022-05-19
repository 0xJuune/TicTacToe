let board2 = new Array(9);
const gameBoard = (() => {
    let board = new Array(9);
    const cell = document.querySelectorAll('.cell');

    let currentPlayerSign = 'X' // should probably replace this with player.currentplayer or something weird


    const claimCell = (a) => {
        if (a.textContent === '') {
            a.textContent = currentPlayerSign;
            board[a.id] = currentPlayerSign;
        }
        else {
            console.log('cell previously claimed');
        }
    }

    const swapPlayer = (a) => {
        console.log('poop')
        switch(a) {
            case "X":
                currentPlayerSign = 'O';
                console.log("CASE X");
                break;
            case "O":
                currentPlayerSign = 'X';
                console.log("CASE O");
            break;
        }
    };



    cell.forEach((position) => {
        // position.addEventListener('click', () => console.log(position.id)) 
        position.addEventListener('click', () => {
            claimCell(position);
            swapPlayer(currentPlayerSign);
        }) 
    }); 

    return {

    };
  })();

const player = (symbol, playerType, currentPlayer) => {
    // let team = symbol;
    let score = 0;
    // const getTeam = () => {return team};
    // const getScore = () => {return score};
    // const getTeam = team;
    const getScore = score;

    return {
        symbol,
        playerType,
        currentPlayer,
        getScore
    }
}

//   const v = (() => {
//     const vv =  ;
//     return {
//         vv,
//     };
//   })();
  