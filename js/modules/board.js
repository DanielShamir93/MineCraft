import MineralsList from './MineralsList.js';

export default class Board {

    constructor(squaresInLine) {
        this.squaresInLine = squaresInLine;
        this.board = new Array(this.squaresInLine);
        for (let i = 0; i < this.squaresInLine; i++) {
            this.board[i] = new Array(this.squaresInLine).fill(0);
        }
    }

    fillBoardRandomly = () => {
        const mineralsList = new MineralsList(this.squaresInLine);
        for (let i = 0; i < this.squaresInLine; i ++) {
            for (let j = 0; j < this.squaresInLine; j++) {
                let mineral = mineralsList.takeRandomMineral();                    // MineralsList is empty
                this.board[i][j] = mineral;
            }
        }
    }

    toGrid = () => {
        const grid = this.configGrid();
        
        for (let i = 0; i < this.board[0].length; i++) {
            for (let j = 0; j < this.squaresInLine; j++) {
                let mineral = this.board[i][j];
                const square = this.configSquare(mineral);
                
                grid.appendChild(square);
            }
        }

        return grid;
    }

    configGrid = () => {
        const grid = document.createElement('div');

        grid.className = 'board';
        Object.assign(grid.style, {
            display: 'grid',
            gridTemplateRows: `repeat(${this.squaresInLine}, auto`,
            gridTemplateColumns: `repeat(${this.squaresInLine}, auto`,
            width: 'fit-content',
            height: 'fit-content'
        });

        return grid;
    }

    configSquare = (mineral) => {
        let square = document.createElement('figure');
        let squareSize = `${80 / this.squaresInLine}vmin`;

        square.className = mineral.mineralName;
        Object.assign(square.style, {
            width: squareSize,
            height: squareSize,
        });

        return square;
    }

    getBoard = () => {
        return this.board;
    }

}