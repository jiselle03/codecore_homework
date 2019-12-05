// Turtle Graphics

class Turtle {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.coordinates = [[x, y]];
        this.startingCoord = [x, y];
    }

    angle = 0;
    currentCoord = [];

    forward(num) {
        if (this.angle === 0 && this.x === 0 && this.y === 0) {
            this.x = num;
        } else if (this.angle === 0) {
            this.x += num;
        } else if (this.angle === 90 && this.x === 0 && this.y === 0) {
            this.y = num;
        } else if (this.angle === 90) {
            this.y += num;
        } else if (this.angle === 180) {
            this.x -= num;
        } else if (this.angle === 270) {
            this.y -= num;
        }
        this.currentCoord.push(this.x, this.y);
        this.coordinates.push(this.currentCoord);
        this.currentCoord = [];
        return this;
    }

    right() {
        if (this.angle < 270) {
            this.angle += 90
        } else {
            this.angle = 0;
        }
        return this;
    }

    left() {
        if (this.angle > 0) {
            this.angle -= 90
        } else {
            this.angle = 270;
        }
        return this;
    }

    allPoints() {
        console.log(this.coordinates);
    }

    print() {
        let xArr = [];
        let yArr = [];
        
        for (let i = 0; i < this.coordinates.length; i++) {
            xArr.push(this.coordinates[i][0]);
            yArr.push(this.coordinates[i][1]);
        }
        let maxX = Math.max(...xArr);
        let maxY = Math.max(...yArr);
        let toPrint = [];

        for (let j = 0; j <= maxY; j++) {
            toPrint.push(' '.repeat(maxX + 1))
        }
        toPrint.forEach((value, index) => {toPrint[index] = value.split('')}) 
        
        for (let k = 0; k < this.coordinates.length; k++) { // replace spots in array with '•'
            if (this.coordinates[k + 1] && this.coordinates[k + 1][0] > this.coordinates[k][0]) { // x2 > x1
                for (let l = 0; l < toPrint.length; l++) { // looping through big array
                    if (l === this.coordinates[k][1]) { // if index is equal to y
                        for (let m = this.coordinates[k][0]; m < toPrint[l].length; m++) { // looping through small arrays within toPrint
                            toPrint[l][m] = '•';
                        }
                    }
                }
            } else if (this.coordinates[k + 1] && this.coordinates[k + 1][0] < this.coordinates[k][0]) { // x1 > x2
                for (let n = 0; n < toPrint.length; n++) { // looping through big array
                    if (n === this.coordinates[k][1]) { // if index is equal to y
                        for (let o = toPrint[n].length - 1; o > this.coordinates[k + 1][0]; o--) { // looping through small arrays within toPrint
                            toPrint[n][o] = '•';
                        }
                    }
                }
            } else if (this.coordinates[k + 1] && this.coordinates[k + 1][1] > this.coordinates[k][1]) { // y2 > y1
                for (let p = this.coordinates[k][1]; p < toPrint.length; p++) {
                    for (let q = 0; q < toPrint[p].length; q++) {
                        if (q === this.coordinates[k][0]) {
                            toPrint[p][q] = '•';
                        }
                    }
                }
            } else if (this.coordinates[k + 1] && this.coordinates[k][1] > this.coordinates[k + 1][1]) { // y1 > y2
                for (let r = toPrint.length - 1; r > this.coordinates[k + 1][1]; r--) {
                    for (let s = 0; s < toPrint[r].length; s++) {
                        if (s === this.coordinates[k][0]) {
                            toPrint[r][s] = '•';
                        }
                    }
                }
            }
        }
        
        let finalPrint = '';
        toPrint.forEach((value, index) => {toPrint[index] = value.join(' ')})
        
        for (let t = 0; t < toPrint.length; t++) {
            if (t < toPrint.length - 1) {
                finalPrint += toPrint[t] + '\n'
            } else {
                finalPrint += toPrint[t]
            }
        }
        console.log(finalPrint);
        
    }

}

// need to figure out code for if turtle backtracks/ walks on path it previously walked

const turtle1 = new Turtle(0, 0)

// turtle1.forward(5).print()

// turtle1.forward(5).right().forward(5).right().forward(3).right().forward(3).print();

turtle1.forward(10).right().right().right().left().forward(10).print() // 