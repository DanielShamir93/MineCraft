import Mineral from './mineral.js';
import MineralsList from './mineralsList.js';
import { DIRT, GRASS, LEAVES, OAK, STONE } from '../board/variables.js';

export default class Board {

    constructor(squaresInLine) {
        this.inventoryStack = [];
        this.isInventoryPopPossible = false;
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
        
        for (let i = 0; i < this.squaresInLine; i++) {
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
            backgroundImage: `url(${mineral.image})`,
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

    inventoryTop = () => {
        return this.inventoryStack[this.inventoryStack.length - 1];
    }

    isInventoryEmpty = () => {
        return this.inventoryStack.length === 0;
    }

    getInventoryLength = () => {
        return inventoryStack.length;
    }

    setPopPossible = (boolean) => {
        this.isInventoryPopPossible = boolean;
    }

    isPopPossible = () => {
        return this.isInventoryPopPossible;
    }

    removeFromSquare = (xAxis, yAxis) => {
        this.board[yAxis][xAxis] = new Mineral('empty');
    }
    
    insertToSquare = (emptyMineralElement) => {
        const xAxis = emptyMineralElement.getAttribute('xAxis');
        const yAxis = emptyMineralElement.getAttribute('yAxis');
        
        this.board[yAxis][xAxis] = this.inventoryPop();
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

    getSquaresInLine = () => {
        return this.squaresInLine;
    }

    isBoardArranged = () => {

        // inventory is not empty
        if (this.inventoryStack.length > 0) {
            return false;
        }

        for (let i = 0; i < this.squaresInLine; i++) {
            for (let j = 0; j < this.squaresInLine; j++) {
                let mineral = this.board[i][j];

                if (mineral.name === DIRT) {
                    if (this.downSquare(i, j) &&
                        this.downSquare(i, j).name !== DIRT) {
                        // From under: There is a square but its not dirt
                        return false;
                    }
                } else if (mineral.name === GRASS) {
                    if (!this.downSquare(i, j) ||
                        this.downSquare(i, j).name !== DIRT) {
                        // From under: There isn't a square or there is a square but its not dirt
                        return false;
                    }
                } else if (mineral.name === LEAVES) {
                    if (!this.isAttachedToOak(i, j)) {
                        return false;
                    }   
                } else if (mineral.name === OAK) {
                    if ((!this.downSquare(i, j) || (this.downSquare(i, j).name !== GRASS && this.downSquare(i, j).name !== OAK)) ||
                        (this.upSquare(i, j) && (this.upSquare(i, j).name !== LEAVES && this.upSquare(i, j).name !== OAK && this.upSquare(i, j).name !== 'empty'))) {
                        // From under: There isn't a square or its not a grass and not an oak
                        // From above: There is a square but its not leaves, not oak and not empty
                        return false;
                    }
                } else if (mineral.name === STONE) {
                    if ((!this.downSquare(i, j) || (this.downSquare(i, j).name !== GRASS && this.downSquare(i, j).name !== STONE)) ||
                        (this.upSquare(i, j) && (this.upSquare(i, j).name !== STONE && this.upSquare(i, j).name !== LEAVES && this.upSquare(i, j).name !== 'empty'))) {
                        // From under: There isn't a square or its not a grass and not a stone
                        // From above: There is a square but its not stone and not leaves and not empty
                        return false;
                    }
                }
            }
        }
        // The board arranged properly
        return true;
    }

    downSquare = (i, j) => {
        if (i === this.squaresInLine - 1) {
            // Exceeded the board bottom border
            return null;
        }
        return this.board[i+1][j];
    }

    upSquare = (i, j) => {
        if (i === 0) {
            // Exceeded the board top border
            return false;
        }
        return this.board[i-1][j];
    }

    leftSquare = (i, j) => {
        if (j === 0) {
            // Exceeded the board top border
            return false;
        }
        return this.board[i][j-1];
    }

    rightSquare = (i, j) => {
        if (j === this.squaresInLine - 1) {
            // Exceeded the board top border
            return false;
        }
        return this.board[i][j+1];
    }

    isAttachedToOak = (i, j) => {
        if (i < 0 || j < 0 || i >= this.squaresInLine || j >= this.squaresInLine) {
            // Exceeded board borders
            return false;
        }

        if (this.board[i][j] === null) {
            return false;
        }
        
        const currentMineral = this.board[i][j];

        if (currentMineral.name === OAK) {
            return true;
        } else if (currentMineral.name !== LEAVES) {
            return false;
        }

        this.board[i][j] = null;

        const res = this.isAttachedToOak(i + 1, j) ||
                    this.isAttachedToOak(i - 1, j) ||
                    this.isAttachedToOak(i, j + 1) ||
                    this.isAttachedToOak(i, j - 1);

        this.board[i][j] = currentMineral;
        return res;
    }
}