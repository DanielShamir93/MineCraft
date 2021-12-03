import Mineral from './mineral.js';
import MineralsList from './mineralsList.js';
import Tool from './tool.js'

export default class Board {

    constructor(squaresInLine) {
        this.inventoryStack = [];
        this.activeTool = null;
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
                const square = this.configSquare(mineral, j, i);

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

    configSquare = (mineral, xAxis, yAxis) => {
        const square = document.createElement('figure');
        const screenPercentage = 100;
        const squareSize = `${screenPercentage / this.squaresInLine}vmin`;
        
        square.setAttribute('mineral', mineral.name);
        square.setAttribute('xAxis', xAxis);
        square.setAttribute('yAxis', yAxis);
        Object.assign(square.style, {
            width: squareSize,
            height: squareSize,
            backgroundImage: mineral.image,
            backgroundSize: squareSize
        });

        return square;
    }

    inventoryPush = (mineral) => {
        this.inventoryStack.push(mineral);
    }

    inventoryPop = () => {
        return this.inventoryStack.pop();
    }

    removeSquare = (xAxis, yAxis) => {
        this.board[yAxis][xAxis] = new Mineral('empty');
    }
    
    addSquare = () => {
        
    }

    setActiveTool = (tool) => {
        if (!tool) {
            this.activeTool = null;
            return;
        }
        this.activeTool = tool;
    }

    getActiveTool = () => {
        return this.activeTool;
    }

    isBoardArranged = () => {

    }

    getBoard = () => {
        return this.board;
    }

}