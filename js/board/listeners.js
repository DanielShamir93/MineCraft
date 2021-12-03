import { board } from './functions.js';
import Mineral from '../modules/mineral.js';

const activeToolListener = document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('tool')) {
        const toolElement = e.target;
        const toolName = toolElement.getAttribute('tool');
        board.setActiveTool(toolName);
        console.log(board.getActiveTool())
    }

})

const mineralToInventoryListener = document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('mineral') && 
        e.target.getAttribute('mineral') !== 'empty') {
        // The element is a non-empty mineral
        const mineralElement = e.target;
        const mineralName = mineralElement.getAttribute('mineral');

        if (!board.getActiveTool()) {
            return;
        }

        if (!board.getActiveTool().affectiveOn(new Mineral(mineralName))) {
            return;
        }

        console.log(board.getActiveTool())
        console.log(board.getActiveTool().affectiveOn(new Mineral(mineralName)))


        console.log('wow')

        const xAxis = mineralElement.getAttribute('xAxis');
        const yAxis = mineralElement.getAttribute('yAxis');

        board.inventoryPush(new Mineral(mineralName));
        board.removeSquare(xAxis, yAxis);
        // Render the grid
        let container = document.querySelector('.container');
        container.replaceChild(board.toGrid(), container.firstChild);
    }
})




export { mineralToInventoryListener, activeToolListener };


