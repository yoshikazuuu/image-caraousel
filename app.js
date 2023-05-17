const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const imagesDirectory = path.join(__dirname, "public/images");

app.use(express.static(imagesDirectory));
app.use(express.static(path.join(__dirname, "public")));

app.get("/images", (req, res) => {
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error(`Error reading files: ${err}`);
      res.status(500).send("Error reading files");
      return;
    }

    // Filter out files that are not images
    const imageFiles = files.filter((file) => {
      const isImage = file.match(/\.(jpg|jpeg|png|gif)$/i);
      return isImage;
    });

    console.log(`Loaded ${imageFiles.length} images.`);

    res.json(imageFiles);
  });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
