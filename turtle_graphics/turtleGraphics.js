// Turtle Graphics

class Turtle {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.coordinates = [[x, y]];
    }

    angle = 0;
    currentCoord = [];
    actualPrint = '';

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
        console.log(this.coordinates); // printing every spot turtle walked on
        return this;
    }

    print() {

        // find min and max to create a box to print turtles on 
        // (and not create new lines in case turtle backtracks)

        let xArr = [];
        let yArr = [];
        
        for (let i = 0; i < this.coordinates.length; i++) {  
            xArr.push(this.coordinates[i][0]);
            yArr.push(this.coordinates[i][1]);
        }

        let maxX = Math.max(...xArr); 
        let maxY = Math.max(...yArr);
        let minX = Math.min(...xArr);
        let minY = Math.min(...yArr);
        let toPrint = [];

        if (minX > 0) {
            minX = 0;
        };

        if (minY > 0) {
            minY = 0;
        };
        
        for (let j = minY; j <= maxY; j++) {
            toPrint.push(' '.repeat(maxX - minX + 1))
        }

        // split into array per line and character to be able to find the right y and x
        toPrint.forEach((value, index) => {toPrint[index] = value.split('')}) 
        
        // looping through coordinates array to find which spaces to replace with turtles
        for (let k = 0; k < this.coordinates.length; k++) {
            let x = this.coordinates[k][0];
            let y = this.coordinates[k][1];
            
            toPrint[y - minY][x - minX] = '•';
        }
        
        // joining all the elements
        // add a space for aesthetic purpose (so x and y movements look more even)
        toPrint.forEach((value, index) => {toPrint[index] = value.join(' ')}) 
        
        for (let l = 0; l < toPrint.length; l++) {
            if (l < toPrint.length - 1) {
                this.actualPrint += toPrint[l] + '\n'
            } else {
                this.actualPrint += toPrint[l]
            }
        }
        console.log(this.actualPrint);
    }

}

// Tests
const raphael = new Turtle(3, 2);

// raphael.forward(10).right().right().right().left().forward(10).allPoints().print();

const michelangelo = new Turtle(0, 0);

// michelangelo.forward(5).right().forward(5).right().forward(5).right().forward(5).allPoints().print();

const donatello = new Turtle(5, 5);
// donatello.forward(10).right().forward(5).right().forward(10).right().forward(5).right().forward(2).right().forward(5).left().forward(2).left().forward(5).print();

const leonardo = new Turtle(0, 0);
// leonardo.forward(10).right().right().forward(10).left().forward(5).left().forward(10).right().forward(5).right().forward(15).print();

/******************************
 
            STRETCH 
 
*******************************/

const fs = require('fs');

const args = process.argv.slice(2);
let fileName = '';
let turtleCommands = '';
let arr = args[0].split('=')

if (args.length === 2) { // If option to write to file is chosen
    fileName = arr[1];
    turtleCommands = args[1];
    nodeTurtle(turtleCommands);
} else { // simply print on console
    turtleCommands = args[0];
    nodeTurtle(turtleCommands);
}

// run turtle graphics via commands from node
function nodeTurtle(turtleCommands) {
    const tPos = turtleCommands.split('-');

    if (tPos[0][0] === 't') {
        const startPos = tPos.shift().substr(1).split(',')
        x = parseInt(startPos[0]);
        y = parseInt(startPos[1]);
    } else {
        x = 0;
        y = 0;
    }

    const ninjaTurtle = new Turtle(x, y);

    for (let movement of tPos) {
        if (movement[0] === 'f') {
            num = parseInt(movement.substr(1))
            ninjaTurtle.forward(num);
        } else if (movement[0] === 'r') {
            ninjaTurtle.right();
        } else if (movement[0] === 'l') {
            ninjaTurtle.left();
        }
    }

    ninjaTurtle.print();
    let drawing = ninjaTurtle.actualPrint;

    // printing to file
    if (fileName === arr[1]) {
        fs.writeFile(fileName, drawing, err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`🐢 Drawing written to ${fileName}.`);
        })
    } 
};

