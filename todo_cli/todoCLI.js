//To Do CLI
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasks = [];
let fileName = 'ToDoList.json';


console.log('Welcome to Todo CLI!\n--------------------');

// Check if fileName is given (if not, use default)
if (process.argv[2]) {
    fileName = process.argv[2];
    showCommands();
} else {
    showCommands();
}

// Read .json file and add to task list
fs.readFile(fileName, (err, data) => {
    if (typeof data !== 'undefined') {
        const fileContents = JSON.parse(data);
        fileContents.forEach((item, index) => {
        const task = Object.entries(item);
        if (task[0][1] === true) {
            tasks.push(`[✓] ${task[1][1]}`);
        } else if (task[0][1] === false) {
            tasks.push(`[ ] ${task[1][1]}`);
        }
        });
    }
});

function showCommands() {
    // Show command options after every request is completed
    rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n`, answer => {
        // View task list
        if (answer === 'v') {
            if (tasks.length === 0) {
                console.log('Your list is empty.')
            } else {
                tasks.forEach((item, index) => {
                    console.log(`${index} ${item}`);
                });
            }
            showCommands();
        // Add new task
        } else if (answer === 'n') {
            rl.question('What?\n', enterTask);
        // Mark task as complete
        } else if (answer[0] === 'c' && answer.length >= 2 && answer.slice(1) <= tasks.length - 1) {
            console.log(`Completed "${tasks[answer[1]].slice(4)}"`)
            let item = tasks[answer[1]].split('');
            item[1] = '✓';
            let itemStr = '';
            for (let i = 0; i < item.length; i++) {
                itemStr += item[i];
            };
            
            tasks[answer[1]] = itemStr;
            
            showCommands();
        // Delete task from list
        } else if (answer[0] === 'd' && answer.length >= 2 && answer.slice(1) <= tasks.length - 1) {
            console.log(`Deleted "${tasks[answer[1]].slice(4)}"`)
            tasks.splice(answer[1], 1);
    
            showCommands();
        // Save task list to file
        } else if (answer === 's') {
            const taskArr = [];
            let task = {};
            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j].includes('✓')) {
                    task = { 'completed': true, 'title': tasks[j].slice(4) };
                } else {
                    task = { 'completed': false, 'title': tasks[j].slice(4) };
                }
                taskArr.push(task);
            }
            fileContents = JSON.stringify(taskArr);
            
            fs.writeFile(fileName, fileContents, err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Saved "${fileName}" to disk`);
                showCommands();
            });
        // Quit
        } else if (answer === 'q') {
            console.log('See you soon! 😄')
            rl.close();
        } else {
            console.log('Please enter a valid command.')
            showCommands();
        }
    });
}

// Enter task to add
const enterTask = answer => {
    tasks.push(`[ ] ${answer}`);
    showCommands();
};