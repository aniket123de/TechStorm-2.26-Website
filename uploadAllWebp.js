require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const baseFolder = "src/assets/img";
const outputFile = "all-cloudinary-links.json";

let uploadedData = {};

function walkDir(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (fullPath.endsWith(".webp")) {
      results.push(fullPath);
    }
  });
  return results;
}

async function uploadAll() {
  const files = walkDir(baseFolder);

  for (const filePath of files) {
    const relative = path.relative(baseFolder, filePath);
    const publicId = relative.replace(/\\/g, "/").replace(".webp", "");

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: "eoorox",
        public_id: publicId,
        overwrite: true,
        resource_type: "image"
      });

      uploadedData[publicId] = cloudinary.url(res.public_id, {
        fetch_format: "auto",
        quality: "auto",
        secure: true
      });

      console.log("Uploaded:", publicId);
    } catch (err) {
      console.error("Error uploading:", publicId);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(uploadedData, null, 2));
  console.log("All uploads complete.");
}

uploadAll();