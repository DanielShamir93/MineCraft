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
        board.setPopPossible(false);
        
        // Reset the style to the tools and inventory buttons
        document.querySelectorAll('.tools').forEach((tool) => {
            tool.style.borderColor = 'unset';
        })
        // Set style for current tool button and reset inventory style
        toolElement.style.borderColor = 'green';
        document.querySelector('.inventory').style.borderColor = 'unset';
    }
});

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
        board.removeFromSquare(xAxis, yAxis);
        // Render the grid
        let container = document.querySelector('.container');
        container.replaceChild(board.toGrid(), container.children[1]);
        // Set the background image of the inventory button and update stack size
        const inventoryElement = document.querySelector('.inventory');
        inventoryElement.style.backgroundImage = `url(${(new Mineral(mineralName)).image})`;
        inventoryElement.children[0].textContent++;
    }
});


const inventoryButtonListener = document.addEventListener('click', (e) => {
    if (e.target.className === 'inventory') {
        const mineral = board.inventoryTop();

        if (mineral) {
            // There is a mineral in the inventory
            board.setPopPossible(true);
            // Set style of inventory button
            const inventoryElement = document.querySelector('.inventory');
            inventoryElement.style.borderColor = 'yellow';
            // Prevent tool to be active
            board.setActiveTool(null);
            // Reset the style to the tools buttons
            document.querySelectorAll('.tools').forEach((tool) => {
                tool.style.borderColor = 'unset';
            })
        }
    }
});

const inventoryGridListener = document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('mineral') && 
        e.target.getAttribute('mineral') === 'empty') {
        // The element is 'empty' mineral
        if (board.isPopPossible()) {
            const emptyMineralElement = e.target;
            board.insertToSquare(emptyMineralElement);
            // Render the grid
            const container = document.querySelector('.container');
            container.replaceChild(board.toGrid(), container.children[1]);
            board.setPopPossible(false);
            // Reset inventory button style
            const inventoryElement = document.querySelector('.inventory');
            if (!board.isInventoryEmpty()) {
                const mineral = board.inventoryTop();
                inventoryElement.style.backgroundImage = `url(${(new Mineral(mineral.name)).image})`;
            } else {
                inventoryElement.style.backgroundImage = '';
            }
            inventoryElement.style.borderColor = 'unset';
            // update inventory stack number
            inventoryElement.children[0].textContent--;



            console.log(board.isBoardArranged());
        }
    }
});

export { mineralToInventoryListener, activeToolListener, inventoryButtonListener, inventoryGridListener };


