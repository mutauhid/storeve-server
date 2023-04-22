const express = require("express");
const {
  index,
  viewCreate,
  actionCreate,
  actionDelete,
  viewEdit,
  actionEdit,
} = require("./controller");
const multer = require("multer");
const os = require("os");

const route = express.Router();

route.get("/", index);
route.get("/create", viewCreate);
route.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
route.get("/edit/:id", viewEdit);
route.put("/edit/:id", actionEdit);
route.delete("/delete/:id", actionDelete);

module.exports = route;
