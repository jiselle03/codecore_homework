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
        showCommands();
        
    } else if (answer === 'n') {
        rl.question('What?\n', enterTask);
        
    } else if (answer[0] === 'c' && answer.length >= 2 && parseInt(answer[1])) {
        console.log(`Completed "${tasks[answer[1]].slice(4)}"`)
        let item = tasks[answer[1]].split('');
        item[1] = '✓';
        let itemStr = '';
        for (let i = 0; i < item.length; i++) {
            itemStr += item[i];
        };
        
        tasks[answer[1]] = itemStr;
        
        showCommands();

    } else if (answer[0] === 'd' && answer.length >= 2 && parseInt(answer[1])) {
        console.log(`Deleted "${tasks[answer[1]].slice(4)}"`)
        tasks.splice(answer[1], 1);
        showCommands();
    } else if (answer === 'q') {
        console.log('See you soon! 😄')
        rl.close();
    } else {
        console.log('Please enter a valid command.')
        showCommands();
    }
        
};

const showCommands = function() {
    rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n`, checkAnswer);
}

const enterTask = answer => {
    tasks.push(`[ ] ${answer}`);
    showCommands();
};

rl.question('Welcome to Todo CLI!\n--------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n', checkAnswer);