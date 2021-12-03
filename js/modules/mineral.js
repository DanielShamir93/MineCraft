export default class Mineral {

    constructor (name) {
        this.name = name;
        this.image = (
            name === 'dirt' ? 
            'url(./assets/images/Dirt.png)' :
            name === 'grass' ?
            'url(./assets/images/Grass.png)' :
            name === 'leaves' ?
            'url(./assets/images/Leaves.png)' :
            name === 'oak' ? 
            'url(./assets/images/Oak.png)' :
            name === 'stone' ?
            this.image = 'url(./assets/images/Stone.png)': 
            ''
        );
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    // static getMineralImage(mineralName) {
    //     switch(mineralName) {
    //         case 'dirt': return 'url(./assets/images/Dirt.png)';
    //         case 'grass': return 'url(./assets/images/Grass.png)';
    //         case 'leaves': return 'url(./assets/images/Leaves.png)';
    //         case 'oak': return 'url(./assets/images/Oak.png)';
    //         case 'stone': return 'url(./assets/images/Stone.png)';
    //     }
    // }
}