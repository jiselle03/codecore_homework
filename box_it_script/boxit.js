// Box It Script

function drawLine(num) {
    return '━'.repeat(num);
};

function drawTopBorder(num) {
    return '┏'+ '━'.repeat(num) + '┓';
};

function drawMiddleBorder(num) {
    return '┣' + '━'.repeat(num) + '┫';
};

function drawBottomBorder(num) {
    return '┗' + '━'.repeat(num) + '┛';
};

function drawBarsAround(str, num) {
    return '┃' + str + ' '.repeat(num - str.length) + '┃';
};

function boxIt(arr) {
    let result = '';
    const longest = arr.sort(function(a, b) { return b.length - a.length })[0];
    const num = longest.length;

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            result += `${drawTopBorder(num)}\n${drawBarsAround(arr[i])}\n${drawMiddleBorder(num)}\n`;
        } else if (i > 0 && i < arr.length - 1) {
            result += `${drawBarsAround(arr[i], num)}\n${drawMiddleBorder(num)}\n`;
        } else {
            result += `${drawBarsAround(arr[i], num)}\n${drawBottomBorder(num)}`;
        }
    }
    return result;
};

const arr = ['Jon Snow', 'Cersei Lannister', 'Daenerys Targaryen'];
console.log(boxIt(arr));
