export default class Mineral {

    constructor (name) {
        this.name = name;
        this.image = (
            name === 'dirt' ? 
            './assets/images/Dirt.png' :
            name === 'grass' ?
            './assets/images/Grass.png' :
            name === 'leaves' ?
            './assets/images/Leaves.png' :
            name === 'oak' ? 
            './assets/images/Oak.png' :
            name === 'stone' ?
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