// Turtle Graphics

class Turtle {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.coordinates = [[x, y]];
    }

    angle = 0;
    currentCoord = [];

    forward(num) {
        if (this.angle === 0) { // moving right
            let newX = this.x + num;
            for (let a = this.x; a < newX; a++) {
                this.x++;
                this.currentCoord.push(this.x, this.y);
                this.coordinates.push(this.currentCoord);
                this.currentCoord = [];
            }
        } else if (this.angle === 90) { // moving down
            let newY = this.y + num;
            for (let b = this.y; b < newY; b++) {
                this.y++;
                this.currentCoord.push(this.x, this.y);
                this.coordinates.push(this.currentCoord);
                this.currentCoord = [];
            }
        } else if (this.angle === 180) { // moving left
            let newX = this.x - num;
            for (let c = this.x; c > newX; c--) {
                this.x--;
                this.currentCoord.push(this.x, this.y);
                this.coordinates.push(this.currentCoord);
                this.currentCoord = [];
            }
        } else if (this.angle === 270) { // moving up
            let newY = this.y - num;
            for (let d = this.y; d > newY; d--) {
                this.y--;
                this.currentCoord.push(this.x, this.y);
                this.coordinates.push(this.currentCoord);
                this.currentCoord = [];
            }
        }

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
        return this;
    }

    print() {
        let xArr = [];
        let yArr = [];
        
        for (let i = 0; i < this.coordinates.length; i++) { // to create a box to print turtles on 
            xArr.push(this.coordinates[i][0]); // (and not create new lines in case turtle backtracks)
            yArr.push(this.coordinates[i][1]);
        }
        let maxX = Math.max(...xArr); 
        let maxY = Math.max(...yArr);
        let toPrint = [];

        for (let j = 0; j <= maxY; j++) {
            toPrint.push(' '.repeat(maxX + 1))
        }
        toPrint.forEach((value, index) => {toPrint[index] = value.split('')}) // split into array per line to be able to find the right y/row in loop
        
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
        
        let actualPrint = '';
        toPrint.forEach((value, index) => {toPrint[index] = value.join(' ')})
        
        for (let t = 0; t < toPrint.length; t++) {
            if (t < toPrint.length - 1) {
                actualPrint += toPrint[t] + '\n'
            } else {
                actualPrint += toPrint[t]
            }
        }
        console.log(actualPrint);
        return this;
    }

}

const raphael = new Turtle(3, 2)

// raphael.forward(10).right().right().right().left().forward(10).print().allPoints();

const michelangelo = new Turtle(0, 0)

// michaelangelo.forward(5).right().forward(5).right().forward(5).right().forward(5).allPoints().print();

const donatello = new Turtle(5, 5)
// donatello.forward(10).right().forward(5).right().forward(10).right().forward(5).right().forward(2).right().forward(5).left().forward(2).left().forward(5).print();




/******************************
 
            STRETCH 
 
*******************************/

const argv = process.argv[2];

if (typeof argv === 'string') {
    nodeTurtle(argv)
} else {
    console.log('Please provide instructions for your turtle.')
}

function nodeTurtle(argv) {
    const tPos = argv.split('-');

    if (tPos[0][0] === 't') {
        const startPos = tPos.shift().substr(1).split(',')
        x = parseInt(startPos[0]);
        y = parseInt(startPos[1]);
    } else {
        x = 0;
        y = 0;
    }

    const leonardo = new Turtle(x, y);

    for (let movement of tPos) {
        if (movement[0] === 'f') {
            num = parseInt(movement.substr(1))
            leonardo.forward(num);
        } else if (movement[0] === 'r') {
            leonardo.right();
        } else if (movement[0] === 'l') {
            leonardo.left();
        }
    }
    leonardo.print();

}