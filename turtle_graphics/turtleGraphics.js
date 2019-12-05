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

        let toPrint = '';

        if (this.startingCoord[0] !== 0 || this.startingCoord[1] !== 0) {
            if (this.y === 0) {
                toPrint += ' '.repeat(this.startingCoord[0]);
            } else {
                for (let i = 0; i <= this.startingCoord[1]; i++){
                    if (i !== startingCoord[1]) {
                        toPrint += ' '.repeat(this.startingCoord[0]) + '\n';
                    } else {
                        toPrint += ' '.repeat(this.startingCoord[0]);
                    }
                }
            }
        }

        if (this.coordinates.length === 2) { // for 1 line drawings
            if (this.coordinates[1][0] > this.coordinates[0][0]) {
                toPrint += '•'.repeat(this.coordinates[1][0] + 1)

            } else if (this.coordinates[1][1] > this.coordinates[0][1]) {
                for (let m = 0; m <= this.coordinates[1][1]; m++) {
                    if (m < this.coordinates[1][1]) {
                        toPrint += '•\n';
                    } else {
                        toPrint += '•';
                    }
                }
            }     
        } else { // 2 or more lines
            for (let i = 0; i < this.coordinates.length; i++) {
                if (this.coordinates[i + 1] && this.coordinates[i][0] !== this.coordinates[i + 1][0]) { // change in x 
                    if (this.coordinates[i][0] < this.coordinates[i + 1][0]) { // right direction
                        if (this.coordinates[i][0] === 0) { // if at starting point (includes 0)
                            toPrint += '•'.repeat(this.coordinates[i + 1][0] - this.coordinates[i][0] + 1) + '\n'; 
                        } else {
                            position += '•'.repeat(this.coordinates[i + 1][0] - this.coordinates[i][0]) + '\n';
                        }
                    } else if (this.coordinates[i][0] > this.coordinates[i + 1][0]){ // left direction
                        if (this.coordinates[i + 1][0] === 0) { // if at starting point (includes 0)
                            if (this.coordinates[i][1] < maxY) {
                                toPrint += '•'.repeat(this.coordinates[i][0] - this.coordinates[i + 1][0] + 1) + '\n' // not last row
                            } else {
                                toPrint += '•'.repeat(this.coordinates[i][0] - this.coordinates[i + 1][0] + 1) // not last row
                            }
                        } else { 
                            if (this.coordinates[i][1] < maxY) {
                                toPrint += '•'.repeat(this.coordinates[i][0] - this.coordinates[i + 1][0]) + '\n' // not last row
                            } else {
                                toPrint += '•'.repeat(this.coordinates[i][0] - this.coordinates[i + 1][0]) // last row
                            }
                        }
                    } 
                } else if (this.coordinates[i + 1]) { // change in y
                    if (this.coordinates[i][1] > this.coordinates[i + 1][1]) { // down direction
                        for (let k = 1; k < this.coordinates[i][1]; k++) {
                            for (let j = 0; j < this.coordinates.length; j++) {
                                if (this.coordinates[i][1] === this.coordinates[j][1] && this.coordinates[i][0] !== this.coordinates[j][0]) {
                                    if (this.coordinates[i][0] < this.coordinates[j][0] && this.coordinates[i][0] === 0) { // if at starting point (includes 0)
                                        toPrint += ' '.repeat(this.coordinates[i][0]) + '•' + ' '.repeat(this.coordinates[j][1] - this.coordinates[i][0]) + '•' + '\n'; 
                                    } else if (this.coordinates[i][0] < this.coordinates[j][0]) {
                                        toPrint += ' '.repeat(this.coordinates[i][0]) + '•' + ' '.repeat(this.coordinates[j][0] - this.coordinates[i][0] - 1) + '•' + '\n';
                                    } else if (this.coordinates[i][0] > this.coordinates[j][0] && this.coordinates[j][0] === 0) { // if at starting point (includes 0)
                                        toPrint += ' '.repeat(this.coordinates[j][0]) + '•' + ' '.repeat(this.coordinates[i][1] - this.coordinates[j][0]) + '•' + '\n'; 
                                    } else if (this.coordinates[i][0] > this.coordinates[j][0]) {
                                        toPrint += ' '.repeat(this.coordinates[j][0]) + '•' + ' '.repeat(this.coordinates[i][0] - this.coordinates[j][0] - 1) + '•' + '\n';
                                    }
                                }
                            }
                        }
                    } else { // up direction
                        for (let l = 1; l < this.coordinates[i + 1][1]; l++) {
                            for (let j = 0; j < this.coordinates.length; j++) {
                                if (this.coordinates[i][1] === this.coordinates[j][1] && this.coordinates[i][0] !== this.coordinates[j][0]) {
                                    if (this.coordinates[i][0] < this.coordinates[j][0]) {
                                        toPrint += ' '.repeat(this.coordinates[i][0]) + '•' + ' '.repeat(this.coordinates[j][0] - this.coordinates[i][0] - 1) + '•' + '\n';
                                    } else if (this.coordinates[i][0] > this.coordinates[j][0]) {
                                        toPrint += ' '.repeat(this.coordinates[j][0]) + '•' + ' '.repeat(this.coordinates[i][0] - this.coordinates[j][0] - 1) + '•' + '\n';
                                    }
                                }
                            }
                        }
                    }
                    
    
                } 
            }
        }

        console.log(toPrint);
        
    }

}

// need to figure out code for if turtle backtracks/ walks on path it previously walked

const turtle1 = new Turtle(0, 0)

// turtle1.forward(5).right().forward(5).right().forward(5).print();

turtle1.forward(10).right().right().right().left().forward(10).print() // 
