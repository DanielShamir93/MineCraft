import Mineral from './mineral.js';
import MineralsList from './mineralsList.js';
import Tool from './tool.js'
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

    isBoardArranged = () => {

        // inventory is not empty
        if (this.inventoryStack.length > 0) {
            return false;
        }

        for (let i = 0; i < this.squaresInLine; i++) {
            for (let j = 0; j < this.squaresInLine; j++) {
                let mineral = this.board[i][j];

                if (mineral.name === 'dirt') {
                    if (this.downSquare(i, j) &&
                        this.downSquare(i, j).name !== 'dirt') {
                        console.log('from dirt')
                        // From under: There is a square but its not dirt
                        return false;
                    }
                } else if (mineral.name === 'grass') {
                    if (!this.downSquare(i, j) ||
                        this.downSquare(i, j).name !== 'dirt') {
                        // From under: There isn't a square or there is a square but its not dirt
                        console.log('from grass')
                        return false;
                    }
                } else if (mineral.name === 'leaves') {
                    if ((!this.downSquare(i, j) || (this.downSquare(i, j).name !== 'leaves' || this.downSquare(i, j).name !== 'oak')) ||
                        (this.upSquare(i, j) && (this.upSquare(i, j).name !== 'leaves' || this.upSquare(i, j).name !== 'empty'))) {
                        // From under: There isn't a square or its not leaves or an oak ||
                        // From above: There is a square but its not leaves or empty square ||                        
                        console.log('from leaves')
                        return false;
                    }
                } else if (mineral.name === 'oak') {
                    if ((!this.downSquare(i, j) || (this.downSquare(i, j).name !== 'grass' || this.downSquare(i, j).name !== 'oak')) ||
                        (this.upSquare(i, j) && (this.upSquare(i, j).name !== 'leaves' || this.upSquare(i, j).name !== 'oak' || this.upSquare(i, j).name !== 'empty'))) {
                        // From under: There isn't a square or its not a grass or an oak
                        // From above: There is a square but its not leaves, oak or empty
                        console.log('from oak')
                        return false;
                    }
                } else if (mineral.name === 'stone') {
                    if ((!this.downSquare(i, j) || (this.downSquare(i, j).name !== 'grass' || this.downSquare(i, j).name !== 'stone')) ||
                        (this.upSquare(i, j) && (this.upSquare(i, j).name !== 'stone' || this.upSquare(i, j).name !== 'leaves' || this.upSquare(i, j).name !== 'empty'))) {
                        // From under: There isn't a square or its not a grass or stone
                        // From above: There is a square but its not stone or leaves or empty
                        console.log('from stone')
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
            return false;
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
}