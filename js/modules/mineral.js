export default class Mineral {

    static minerals = {
        dirt: './../../assets/images/Dirt.png',
        grass: './../../assets/images/Grass.png',
        leaves: './../../assets/images/Leaves.png',
        oak: './../../assets/images/Oak-Log.png',
        stone: './../../assets/images/Stone.png'
    };

    constructor(name) {
        if (name === 'random') {
            let randomMineral = Mineral.getRandomMineral();
            this.name = randomMineral[0];
            this.image = randomMineral[1];
        } else {
            this.name = name;
            this.image = Mineral.minerals[name];
        }
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    static getRandomMineral() {
        let randomNumber = Math.floor(Math.random() * Object.keys(Mineral.minerals).length);
        return Object.entries(Mineral.minerals)[randomNumber];
    }
    
}