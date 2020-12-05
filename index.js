const chalkAnimation = require('chalk-animation');
const franc = require('franc');
const input = process.argv.splice(2, process.argv.length - 1).join(' ');
chalkAnimation.rainbow("Your input: " + input+ "\nwe think this is ->");
setTimeout(() => {
    console.log(franc(input));
}, 1000);

