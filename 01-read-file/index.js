const fs = require("fs");
const { join } = require("path");
const path = join(__dirname,'text.txt');
const stream = fs.createReadStream(path);
stream.on('data', (text) => {
  console.log(text.toString());
});

