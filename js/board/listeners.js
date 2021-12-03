import Mineral from '../modules/tool.js';

const inventoryStack = [];

const boardListener = document.addEventListener('click', (e) => {
    const element = e.target;

    if (element.getAttribute('mineral') === 'dirt') {
        element.style.backgroundImage = '';
        element.setAttribute('mineral', 'empty');
        inventoryStack.push(new Mineral('dirt'));
    }
    console.log(inventoryStack)
})




export { boardListener };


//TODO: match tool to mineral in the UI