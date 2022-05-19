const gameBoard = (() => {
    let board = new Array(9);
    const show = console.log(board);
    const cell = document.querySelectorAll('.cell')

    let currentPlayerSign = 'X' // should probably replace this with player.currentplayer or something weird


    const claimCell = (a) => {
        if (a.textContent === '') {
            a.textContent = currentPlayerSign
            board[a.id] = currentPlayerSign
        }
        else {
            
        }
    }

    cell.forEach((position) => {
        // position.addEventListener('click', () => console.log(position.id)) 
        position.addEventListener('click', () => claimCell(position)) 
    }); 

    return {
        show,
    };
  })();

const player = (symbol, playerType) => {
    // let team = symbol;
    let score = 0;
    // const getTeam = () => {return team};
    // const getScore = () => {return score};
    // const getTeam = team;
    const getScore = score;

    return {
        symbol,
        playerType,
        getScore
    }
}

//   const v = (() => {
//     const vv =  ;
//     return {
//         vv,
//     };
//   })();
  