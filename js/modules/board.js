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
        for (let i = 0; i < this.squaresInLine; i++) {
            for (let j = 0; j < this.squaresInLine; j++) {
                let mineral = this.board[i][j];
                
                if (mineral.name === 'dirt') {
                    if (this.downSquare() &&
                        this.downSquare().name !== 'dirt') {
                        // From under: There is a square but its not dirt
                        return false;
                    }
                } else if (mineral.name === 'grass') {
                    if (!this.downSquare() ||
                        this.downSquare().name !== 'dirt') {
                        // From under: There isn't a square or there is a square but its not dirt
                        return false;
                    }
                } else if (mineral.name === 'leaves') {
                    if ((!this.downSquare() || (this.downSquare().name ==! 'leaves' || this.downSquare().name ==! 'oak')) ||
                        (this.upSquare() && (this.upSquare().name ==! 'leaves' || this.upSquare().name ==! 'empty'))) {
                        // From under: There isn't a square or its not leaves or an oak ||
                        // From above: There is a square but its not leaves or empty square ||                        
                        return false;
                    }
                } else if (mineral.name === 'oak') {
                    if ((!this.downSquare() || (this.downSquare().name ==! 'dirt' || this.downSquare().name ==! 'oak')) ||
                        (this.upSquare() && (this.upSquare().name ==! 'leaves' || this.upSquare().name ==! 'oak' || this.upSquare().name ==! 'empty'))) {
                        // From under: There isn't a square or its not a dirt or an oak
                        // From above: There is a square but its not leaves, oak or empty
                        return false;
                    }
                } else if (mineral.name === 'stone') {
                    if ((!this.downSquare() || (this.downSquare().name ==! 'dirt' || this.downSquare().name ==! 'stone')) ||
                        (this.upSquare() && (this.upSquare().name ==! 'stone' || this.upSquare().name ==! 'empty'))) {
                        // From under: There isn't a square or its not a dirt or stone
                        // From above: There is a square but its not stone or empty
                        return false;
                    }
                }
            }
        }
    }

    downSquare = (i, j) => {
        return this.board[i+1][j];
    }

    upSquare = (i, j) => {
        return this.board[i-1][j];
    }
}