export default class MineralsList {

    constructor (name) {
        this.name = name;
        this.image =    name === 'dirt' ? 
                        'url(./assets/images/Dirt.png)' :
                        name === 'grass' ?
                        'url(./assets/images/Grass.png)' :
                        name === 'leaves' ?
                        'url(./assets/images/Leaves.png)' :
                        name === 'oak' ? 
                        'url(./assets/images/Oak.png)' :
                        name === 'stone' ?
                        this.image = 'url(./assets/images/Stone.png)': 
                        '';
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }
}