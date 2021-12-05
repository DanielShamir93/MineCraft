import { setGame } from '../board/functions.js';


const playListener = document.querySelector('.play').addEventListener('click', (e) => {
    document.querySelector('.opening').style.display = 'none';
    const lineSquareNumber = document.querySelector('#line-square-number').value;
    setGame(lineSquareNumber);
});

export { playListener };

