import Mineral from './mineral.js';

export default class Board {

    constructor(n) {
        this.board = Array(n).fill(Array(n));
    }

    fillBoardRandomly = () => {
        for (let i = 0; i < this.board[0].length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                let mineral = new Mineral('random');
                this.board[i][j] = mineral;
            }
        }
    }

    getBoard = () => {
        return board;
    }

}