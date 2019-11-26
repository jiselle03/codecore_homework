#!/usr/bin/env node

// Box It Script Stretch

const csv = require('csv-parser');
const fs = require('fs');


let names = [];
let houses = [];

fs.createReadStream('characters.csv')
  .pipe(csv())
  .on('data', (row) => {
    names.push(Object.values(row)[0])
    houses.push(Object.values(row)[1]);
})
  .on('end', () => {
      
    console.log(boxIt(names, houses));
  });
  

function drawLine(num) {
    return '━'.repeat(num);
};

function drawTopBorderName(numName) {
    return '┏'+ '━'.repeat(numName) + '┓';
};
function drawTopBorderHouse(numHouse) {
    return '━'.repeat(numHouse + 1) + '┓';
};

function drawMiddleBorderName(numName) {
    return '┣' + '━'.repeat(numName) + '┫';
};
function drawMiddleBorderHouse(numHouse) {
    return '━'.repeat(numHouse + 1) + '┫';
};

function drawBottomBorderName(numName) {
    return '┗' + '━'.repeat(numName) + '┛';
};
function drawBottomBorderHouse(numHouse) {
    return '━'.repeat(numHouse + 1) + '┛';
};

function drawBarsAroundName(name, numName) {
    return '┃' + name + ' '.repeat(numName - name.length) + '┃';
};
function drawBarsAroundHouse(house, numHouse) {
    return house + ' '.repeat(numHouse - house.length + 1) + '┃';
};

function boxIt(names, houses) {
    
    let longestName = names[0];
    let longestHouse = houses[0];

    let result = '';

    for (let name of names) {
        if (name.length > longestName.length) {
            longestName = name;
        }
    }
    const numName = longestName.length;

    for (let house of houses) {
        if (house.length > longestHouse.length) {
            longestHouse = house;
        }
    }
    const numHouse = longestHouse.length;

    for (let i = 0; i < names.length; i++) {
        if (names.length === 1) {
            result += `${drawTopBorderName(numName)}${drawTopBorderHouse(numHouse)}\n┃NAME${' '.repeat(numName - 4)}┃HOUSE${' '.repeat(numHouse - 4)}┃\n${drawMiddleBorderName(numName)}${drawMiddleBorderHouse(numHouse)}\n${drawBarsAroundName(names[i], numName)}${drawBarsAroundHouse(houses[i], numHouse)}\n${drawBottomBorderName(numName)}${drawBottomBorderHouse(numHouse)}`;
        } else if (i === 0) {
            result += `${drawTopBorderName(numName)}${drawTopBorderHouse(numHouse)}\n┃NAME${' '.repeat(numName - 4)}┃HOUSE${' '.repeat(numHouse - 4)}┃\n${drawMiddleBorderName(numName)}${drawMiddleBorderHouse(numHouse)}\n${drawBarsAroundName(names[i], numName)}${drawBarsAroundHouse(houses[i], numHouse)}\n`;
        } else if (i > 0 && i < names.length - 1) {
            result += `${drawMiddleBorderName(numName)}${drawMiddleBorderHouse(numHouse)}\n${drawBarsAroundName(names[i], numName)}${drawBarsAroundHouse(houses[i], numHouse)}\n`;
        } else {
            result += `${drawMiddleBorderName(numName)}${drawMiddleBorderHouse(numHouse)}\n${drawBarsAroundName(names[i], numName)}${drawBarsAroundHouse(houses[i], numHouse)}\n${drawBottomBorderName(numName)}${drawBottomBorderHouse(numHouse)}`;
        }
    }
    return result;
};