import Mineral from './mineral.js';

export default class Tool {

    constructor(name) {
        this.name = name;

        if (name === 'pickaxe') {
            this.canMineArray = [ new Mineral('stone') ];
        } else if (name === 'shovel') {
            this.canMineArray = [ new Mineral('dirt') ];
        } else if (name === 'axe') {
            this.canMineArray = [ new Mineral('leaves'), new Mineral('oak') ];
        }
    }

    getName () {
        return this.name;
    }

    affectiveOn(mineralArg) {
        return this.canMineArray.some((mineral) => {
            return mineral.name === mineralArg.name;
        });
    }
}