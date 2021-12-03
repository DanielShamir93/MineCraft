export default class MineralsList {

    constructor(n) {

        let dirtAmount = Math.floor(0.25 * n ** 2);
        let grassAmount = n;
        let leavesAmount = Math.floor(n / 2);
        let oakAmount = Math.floor(n / 4);
        let stoneAmount = Math.floor(n / 5);
        let emptyAmount = n ** 2 - (dirtAmount + grassAmount + leavesAmount + oakAmount + stoneAmount);

        this.list = {
            dirt: dirtAmount,
            grass: grassAmount,
            leaves: leavesAmount,
            oak: oakAmount,
            stone: stoneAmount,
            empty: emptyAmount
        };
    }

    takeRandomMineral() {
        const keys = Object.keys(this.list);
        const randomNumber = Math.floor(Math.random() * keys.length);
        const mineralName = keys[randomNumber];

        if (this.list[mineralName] === 1) {
            // There is only one mineral of this kind left
            delete this.list[mineralName];
        } else {
            this.list[mineralName]--;
        }

        return { mineralName };
    }

    static getMineralImage(mineralName) {
        switch(mineralName) {
            case 'dirt': return 'url(./assets/images/Dirt.png)';
            case 'grass': return 'url(./assets/images/Grass.png)';
            case 'leaves': return 'url(./assets/images/Leaves.png)';
            case 'oak': return 'url(./assets/images/Oak.png)';
            case 'stone': return 'url(./assets/images/Stone.png)';
        }
    }
}

