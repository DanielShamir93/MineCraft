import { setGame } from '../board/functions.js';


const playListener = document.querySelector('.play').addEventListener('click', (e) => {
    document.querySelector('.opening').style.display = 'none';
    setGame(5);
});

export { playListener };

