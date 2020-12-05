const chalkAnimation = require('chalk-animation');
const franc = require('franc');
const langs = require('langs');
const input = process.argv.splice(2, process.argv.length - 1).join(' ');

chalkAnimation.rainbow("Your input: " + input+ "\nwe think this is ->");

setTimeout(() => {
    if(franc(input) === 'und'){
        chalkAnimation.pulse('your input was not recognised');
    }
    else{
        const langCode = franc(input);
        const language = langs.where("3",langCode);
        console.log(language.name);
    }
}, 2000);

