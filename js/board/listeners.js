import { board } from './functions.js';
import Mineral from '../modules/mineral.js';
import Tool from '../modules/tool.js';

const activeToolListener = document.addEventListener('click', (e) => {

    if (e.target.hasAttribute('tool')) {
        const toolElement = e.target;
        const toolName = toolElement.getAttribute('tool');

        if (board.getActiveTool() && 
            board.getActiveTool().getName() === toolName) {
            // This tool is already active
            toolElement.style.borderColor = 'unset';
            board.setActiveTool(null);
            return;
        }

        board.setActiveTool(new Tool(toolName));

        // Set the style to the tools buttons
        document.querySelectorAll('.tools').forEach((tool) => {
            tool.style.borderColor = 'unset';
        })
        toolElement.style.borderColor = 'green';

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


