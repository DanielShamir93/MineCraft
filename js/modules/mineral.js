import { DIRT, GRASS, LEAVES, OAK, STONE } from '../board/variables.js';
export default class Mineral {

    constructor (name) {
        this.name = name;
        this.image = (
            name === DIRT ? 
            './assets/images/Dirt.png' :
            name === GRASS ?
            './assets/images/Grass.png' :
            name === LEAVES ?
            './assets/images/Leaves.png' :
            name === OAK ? 
            './assets/images/Oak.png' :
            name === STONE ?
            this.image = './assets/images/Stone.png': 
            ''
        );
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

}