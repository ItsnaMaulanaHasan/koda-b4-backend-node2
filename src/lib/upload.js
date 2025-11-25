const multer = require("multer");
const path = require("node:path");
const process = require("node:process");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const filename = file.originalname.split(".")[0];
    const ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `${filename}-${uniqueSuffix}.${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpg, .jpeg, .png allowed!"));
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = upload;
