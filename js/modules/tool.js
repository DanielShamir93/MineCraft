import Mineral from './Mineral.js';

export default class Tool {

    constructor(name) {
        this.name = name;

        if (name === 'pickaxe') {
            this.mineMinerals = [ new Mineral('stone') ];
        } else if (name === 'shovel') {
            this.mineMinerals = [ new Mineral('dirt') ];
        } else if (name === 'axe') {
            this.mineMinerals = [ new Mineral('leaves'), new Mineral('oak') ];
        }
    }

    affectiveOn(mineral) {
        if (this.mineMinerals.includes(mineral)) {
            return true;
        }
    }
}