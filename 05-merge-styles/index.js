// const { readdir, createReadStream, stat } = require("fs");
const { readFile, readdir, stat, writeFile } = require("fs/promises");
const { join, parse } = require("path");
const dataArray = [];

const pathStyles = join(__dirname, 'styles');

async function isValidStyleFile(filePath) {
  try {
    const stats = await stat(filePath);
    return (stats.isFile() && parse(filePath).ext === '.css');
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

const mergeStyles = async function () {
  try {
    const files = await readdir(pathStyles);
    for (const file of files) {
      if (await isValidStyleFile(join(pathStyles, file))) {
        dataArray.push(await readFile(join(pathStyles, file), 'utf8'));
      }
    }
    // console.log(dataArray);
    writeFile(join(__dirname,'project-dist', 'bundle.css'), dataArray.join('\n'));
  } catch (error) {
    console.log('Error:', error);
  }
}

mergeStyles();