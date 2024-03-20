const sharp = require("sharp");
const fs = require("fs");

const inputFolder = "fesse";
const outputFolder = "lossless";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (
      file.endsWith(".jpg") ||
      file.endsWith(".jpeg") ||
      file.endsWith(".png")
    ) {
      const inputPath = `${inputFolder}/${file}`;
      const name = file.substring(0, file.lastIndexOf("."));

      const outputPath = `${outputFolder}/${name}.avif`;

      if (!fs.existsSync(outputPath)) {
        sharp(inputPath)
          .toFormat("avif", { lossless: true })
          .toFile(outputPath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${name}.avif saved`);
            }
          });
      } else {
        console.log(`${outputPath} already exist`);
      }
    } else {
      console.log("weird image type");
    }
  });
});
