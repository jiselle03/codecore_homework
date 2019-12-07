//To Do CLI
const fs = require('fs');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

const checkAnswer = answer => {
    if (answer === 'v') {
        tasks.forEach((item, index) => {
            console.log(`${index} ${item}`);
        });
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);
        
    } else if (answer === 'n') {
        rl.question('What?\n', enterTask);
        
    } else if (answer[0] === 'c') {
        console.log(`Completed "${tasks[answer[1]].slice(4)}"`)
        let item = tasks[answer[1]].split('');
        item[1] = '✓';
        let itemStr = '';
        for (let i = 0; i < item.length; i++) {
            itemStr += item[i];
        };
        
        tasks[answer[1]] = itemStr;
        
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);

    } else if (answer[0] === 'd') {
        console.log(`Deleted "${tasks[answer[1]].slice(4)}"`)
        tasks.splice(answer[1]);
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);

    } else if (answer === 'q') {
        console.log('See you soon! 😄')
        rl.close();
    } else {
        rl.question('Please enter a valid command.\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);
    }
        
};

const enterTask = answer => {
    tasks.push(`[ ] ${answer}`);
    rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);
};

rl.question('Welcome to Todo CLI!\n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);