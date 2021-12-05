import Board from '../modules/board.js';

let board = null;
let countDown = null;
const gameTimer = 60;

const setGame = (n = 5) => {
    if (n > 4) {
        board = new Board(n);
        resetBoard();
    } else {
        alert('Board must have at least 5 rows and columns');
    }
}

const resetBoard = () => {
    const timerElement = document.querySelector('.timer');
    const messageElement = document.querySelector('.message');
    const inventoryElement = document.querySelector('.inventory');
    const activeBoxElement = document.querySelectorAll('.tools');
    const toolsElements = document.querySelectorAll('.tools');
    const containerElement = document.querySelector('.container');

    containerElement.style.display = 'flex';
    board.fillBoardRandomly();
    containerElement.replaceChild(board.toGrid(), containerElement.children[1]);

    // clearInterval(countDown);
    timerElement.textContent = gameTimer;
    messageElement.style.display = 'none';
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

const startClock = () => {
    const timerElement = document.querySelector('.timer');
    countDown = setInterval(() => {
        timerElement.textContent--;

        if (timerElement.textContent === '0') {
            clearInterval(countDown);
            timeIsUp();
        }
    }, 1000)
}

const timeIsUp = () => {
    const messageElement = document.querySelector('.message');
    const messageContentElement = document.querySelector('.message-content');
    const messageButtonsNextElement = document.querySelector('.message-buttons-next');
    const activeBoxElement = document.querySelectorAll('.tools');
    const inventoryElement = document.querySelector('.inventory');
    
    messageElement.style.display = 'flex';
    messageContentElement.textContent = 'Time is up!';
    messageButtonsNextElement.style.display = 'none';
    activeBoxElement.forEach((button) => {
        button.disabled = true;
    })
    inventoryElement.disabled = true;
}

const wonGame = () => {
    const messageElement = document.querySelector('.message');
    const messageContentElement = document.querySelector('.message-content');
    const messageButtonsNextElement = document.querySelector('.message-buttons-next');
    const activeBoxElement = document.querySelectorAll('.tools');
    const inventoryElement = document.querySelector('.inventory');
    const scoreElement = document.querySelector('.score');
    
    // clearInterval(countDown);
    messageElement.style.display = 'flex';
    messageContentElement.textContent = 'Well Done!';
    messageButtonsNextElement.style.display = 'unset';
    activeBoxElement.forEach((button) => {
        button.disabled = true;
    })
    inventoryElement.disabled = true;
    scoreElement.textContent = +scoreElement.textContent + board.squaresInLine * 10;
}


export { setGame, board, startClock, resetBoard, setGame, wonGame};