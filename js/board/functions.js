import Board from '../modules/board.js';

let board = null;

const setGame = (n) => {
    if (n > 4) {
        board = new Board(n);
        const container = document.querySelector('.container');
        board.fillBoardRandomly();
        container.insertBefore(board.toGrid(), container.children[1]);
    } else {
        alert('Board must have at least 5 rows and columns');
    }
    
}

export { setGame, board };