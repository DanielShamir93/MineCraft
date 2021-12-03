import Board from '../modules/board.js';

export const startGame = (n) => {
    let board = new Board(n);
    board.fillBoardRandomly();
    document.querySelector('.container').appendChild(board.toGrid());
}
