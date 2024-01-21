const { readFile, readdir, mkdir, writeFile, stat, rm, copyFile } = require("fs/promises");
const { join, parse } = require("path");

const dataArray = [];

// REPLACE TAGS

async function replaceTemplateTags() {
  try {
    await mkdir(join(__dirname, 'project-dist'), { recursive: true });
    let template = await readFile(join(__dirname, 'template.html'), 'utf8');
    const components = await readdir(join(__dirname, 'components'), 'utf-8');
    for (const component of components) {
      if (parse(component).ext === '.html') {
        const componentText = await readFile(join(__dirname, 'components', component), 'utf8');
        template = template.replace(`{{${parse(component).name}}}`, componentText);
      }
    }
    await writeFile(join(__dirname, 'project-dist', 'index.html'), template);


  } catch (error) {
    console.log('Error:', error);
  }
}

//MERGE STYLES

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
    writeFile(join(__dirname, 'project-dist', 'style.css'), dataArray.join('\n'));
  } catch (error) {
    console.log('Error:', error);
  }
}

//COPY DIRECTORY

const path = join(__dirname, `project-dist/assets`);
const originalPath = join(__dirname, 'assets');


const deleteFolder = async function (folder) {
  try {
    await rm(folder, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
}
const copyFolder = async function (originalPath, path) {
  try {
    await mkdir(path, { recursive: true });
    const objectAssets = await readdir(originalPath);
    for (const object of objectAssets) {
      if ((await stat(join(originalPath, object))).isFile()) {
        await copyFile(join(originalPath, object), join(path, object));
      } else {
        await copyFolder(join(originalPath, object), join(path, object));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// TOTAL

async function buildPage() {
  try {
    await replaceTemplateTags();
    await mergeStyles();
    await deleteFolder(path);
    await copyFolder(originalPath, path);



  } catch (error) {
    console.log('Error:', error);
  }
}

buildPage();