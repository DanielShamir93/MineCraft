import Board from '../modules/board.js';

let board = null;

const setGame = (n) => {
    if (n > 4) {
        const containerElement = document.querySelector('.container');
        
        board = new Board(n);
        board.fillBoardRandomly();
        containerElement.replaceChild(board.toGrid(), containerElement.children[1]);
        containerElement.style.display = 'flex';
        resetBoard();

    } else {
        alert('Board must have at least 5 rows and columns');
    }
}

const resetBoard = () => {
    const timerElement = document.querySelector('.timer');
    const scoreElement = document.querySelector('.score');
    const messageElement = document.querySelector('.message');
    const messageContentElement = document.querySelector('.message-content');
    const inventoryElement = document.querySelector('.inventory');
    const activeBoxElement = document.querySelectorAll('.tools');
    const toolsElements = document.querySelectorAll('.tools');
    
    clearInterval(countDown);
    timerElement.textContent = 1;
    scoreElement.textContent = 0;
    messageElement.style.display = 'none';
    messageContentElement.textContent = 'Time is up!';
    inventoryElement.style.borderColor = 'unset';
    inventoryElement.disabled = false;
    inventoryElement.children[0].textContent = 0;
    inventoryElement.style.backgroundImage = '';
    activeBoxElement.forEach((button) => {
        button.disabled = false;
    })
    toolsElements.forEach((tool) => {
        tool.style.borderColor = 'unset';
    })

}

let countDown = null;
const startClock = () => {
    const timerElement = document.querySelector('.timer');
    countDown = setInterval(() => {
        timerElement.textContent--;

        if (timerElement.textContent === '0') {
            clearInterval(countDown);
            gameOver();
        }
    }, 1000)
}

const gameOver = () => {
    const messageElement = document.querySelector('.message');
    const messageContentElement = document.querySelector('.message-content');
    const activeBoxElement = document.querySelectorAll('.tools');
    const inventoryElement = document.querySelector('.inventory');
    
    messageElement.style.display = 'flex';
    messageContentElement.textContent = 'Time is up!';
    activeBoxElement.forEach((button) => {
        button.disabled = true;
    })
    inventoryElement.disabled = true;
}


export { setGame, board, startClock, resetBoard};