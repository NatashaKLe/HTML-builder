const { join } = require('node:path');
const { createWriteStream } = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const path = join(__dirname, 'text.txt');
const writeStream = createWriteStream(path);
console.log(' Write text! ');
const rl = readline.createInterface({ input, output });
rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
    writeStream.end();
    console.log('Good bye!');
  } else { writeStream.write(line + '\n'); }

})
rl.on('SIGINT', () =>{
  rl.close();
  writeStream.end();
  console.log('Good bye!');

})


