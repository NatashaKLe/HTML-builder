const { copyFile, readdir } = require("fs");
const { mkdir, unlink } = require("fs/promises");
const { join } = require("path");
const path = join(__dirname, 'files-copy');
const originalPath = join(__dirname, 'files');

mkdir(path, { recursive: true });
readdir(path, (error, files) => {
  if (error) {
    console.log('Error:', error);
    return;
  }
  // console.log('del' + files);
  files.forEach((file) => {
    unlink(join(path, file), (err) => {
      if (err) throw err;
    }
    );
  });
});
readdir(originalPath, (error, files) => {
    if (error) {
      console.log('Error:', error);
      return;
    }
    // console.log('copy' + files);
    files.forEach((file) => {
      copyFile(join(originalPath, file), join(path, file), (err) => {
        if (err) throw err;
      }
      );
    });
  });