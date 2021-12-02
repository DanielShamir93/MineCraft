import Board from '../modules/board.js';

export const startGame = (n) => {
    let board = new Board(n);
    board.fillBoardRandomly();
    console.log(board);
}
