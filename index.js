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

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.post("/upload", upload.single("ProfileImage"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
