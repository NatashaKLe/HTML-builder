const { readdir, stat } = require("fs");
const { join, parse } = require("path");

const path = join(__dirname, 'secret-folder');

readdir(path, (error, files) => {
  if (error) {
    console.log('Error:', error);
    return;
  }
  files.forEach((file) => {

    stat(join(path, file), (statErr, stats) => {
      if (statErr) {
        console.error(statErr);
      }
      if (stats.isFile()) {
        console.log(`${parse(file).name} - ${parse(file).ext.slice(1)} - ${stats.size / 1024} kb`);
      }
    });

  });

});
