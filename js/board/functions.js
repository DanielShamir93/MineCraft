import Board from '../modules/board.js';


let board = null;

const setGame = (n) => {
    board = new Board(n);
    let container = document.querySelector('.container');

    board.fillBoardRandomly();
    container.insertBefore(board.toGrid(), container.firstChild);
}

export { setGame, board };