export default class Mineral {
    minerals = ['dirt', 'grass', 'tree', 'leaves', 'oak', 'stone'];

    constructor() {
        this.name = '';
    }

    getRandomMineral() {
        this.name = minerals[Math.floor(Math.random * minerals.length)];
    }
}