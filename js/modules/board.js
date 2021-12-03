import MineralsList from './MineralsList.js';

export default class Board {

    constructor(n) {
        this.board = new Array(n);
        for (let i = 0; i < n; i++) {
            this.board[i] = new Array(n);
        }
    }

    fillBoardRandomly = () => {
        const n = this.board.length;
        const mineralsList = new MineralsList(n);
        for (let i = 0; i < n; i ++) {
            for (let j = 0; j < n; j++) {
                let mineral = mineralsList.takeRandomMineral();                    // MineralsList is empty
                this.board[i][j] = mineral;
            }
        }
    }

    

    toGrid = () => {
        const grid = document.createElement('div');

        for (let i = 0; i < this.board[0].length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                let mineral = this.board[i][j];
                let figure = document.createElement('figure');
                figure.className = mineral.mineralName;
                grid.appendChild(figure);
            }
        }

        return grid;
    }

    getBoard = () => {
        return this.board;
    }

}