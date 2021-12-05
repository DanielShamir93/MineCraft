import { setGame } from '../board/functions.js';


const playListener = document.querySelector('.play').addEventListener('click', (e) => {
    const lineSquareNumber = parseInt(document.querySelector('#line-square-number').value);
    const isGameSet = setGame(lineSquareNumber);

    if (isGameSet) {
        document.querySelector('.opening').style.display = 'none';
    }
});

export { playListener };

