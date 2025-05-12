const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
PORT = 3000;

//UPLOAD INSTANCES
// const upload = multer({
//   dest: "uploads/",
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
  fileFilter,
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

const cpUpload = upload.fields([
  { name: "CoverImage", maxCount: 1 },
  { name: "ProfileImage", maxCount: 8 },
]);

app.post("/upload", cpUpload, function (req, res, next) {
  console.log(req.body);
  console.log(req.files);

  return res.redirect("/");
});
// app.post("/upload", upload.single("ProfileImage"), function (req, res, next) {
//   console.log(req.body);
//   console.log(req.file);

//   return res.redirect("/");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
