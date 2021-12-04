import Mineral from './mineral.js';
import { DIRT, GRASS, LEAVES, OAK, STONE } from '../board/variables.js';

export default class Tool {

    constructor(name) {
        this.name = name;

        if (name === 'pickaxe') {
            this.canMineArray = [ new Mineral(STONE) ];
        } else if (name === 'shovel') {
            this.canMineArray = [ new Mineral(DIRT), new Mineral(GRASS) ];
        } else if (name === 'axe') {
            this.canMineArray = [ new Mineral(LEAVES), new Mineral(OAK) ];
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