var program = require('commander');

program
    .version('0.0.1')
    .option('-gd, --highRail', 'gd')
    .parse(process.argv);

console.log(program.highRail);