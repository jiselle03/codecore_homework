// Turtle Graphics

class Turtle {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.coordinates = [];
    };

    angle = 0;
    actualPrint = '';

    forward(num) {
        switch(this.angle) {
            case 0: // moving right
                for (let a = this.x; a <= this.x + num; a++) this.coordinates.push([a, this.y]);
                this.x += num;
                break;
            case 90: // moving down
                for (let b = this.y; b <= this.y + num; b++) this.coordinates.push([this.x, b]);
                this.y += num;
                break;
            case 180: // moving left
                for (let c = this.x; c >= this.x - num; c--) this.coordinates.push([c, this.y]);
                this.x -= num;
                break;
            case 270: //moving up
                for (let d = this.y; d >= this.y - num; d--) this.coordinates.push([this.x, d]);
                this.y -= num;
                break;
        };
        return this;
    };

    right() {
        this.angle < 270 ? this.angle += 90 : this.angle = 0;
        return this;
    };

    left() {
        this.angle > 0 ? this.angle -= 90 : this.angle = 270;
        return this;
    };

    allPoints() {
        console.log(this.coordinates); // printing every spot turtle walked on
        return this;
    };

    print() {
        // find min and max to create a box to print turtles on 
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

        if (minX > 0) minX = 0;
        if (minY > 0) minY = 0;
        
        for (let j = minY; j <= maxY; j++) {
            toPrint.push(' '.repeat(maxX - minX + 1));
        };

        // split into array per line and character to be able to find the right y and x
        toPrint.forEach((value, index) => {toPrint[index] = value.split('')}) 
        
        // loop through coordinates array to find which spaces to replace with turtles
        this.coordinates.forEach(endpoint => {
            let x = endpoint[0];
            let y = endpoint[1];
            toPrint[y - minY][x - minX] = '•';
        });
        
        // joining all the elements
        // add a space so x and y movements look more even
        toPrint.forEach((value, index) => {toPrint[index] = value.join(' ')});
        
        for (let l = 0; l < toPrint.length; l++) {
            if (l < toPrint.length - 1) {
                this.actualPrint += toPrint[l] + '\n';
            } else {
                this.actualPrint += toPrint[l]
            };
        };
        console.log(this.actualPrint);
    };

};

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
let arr = args.length !== 0 ? args[0].split('=') : [];

if (args.length === 2) { // if option to write to file is chosen
    fileName = arr[1];
    turtleCommands = args[1];
    nodeTurtle(turtleCommands);
} else { // simply print on console
    turtleCommands = args[0];
    if (turtleCommands) nodeTurtle(turtleCommands);
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

    // print to file
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
