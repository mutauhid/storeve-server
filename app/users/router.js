const express = require("express");
const { viewSignin, actionSigin, actionLogout } = require("./controller");

const route = express.Router();

route.get("/", viewSignin);
route.get("/logout", actionLogout);
route.post("/", actionSigin);

module.exports = route;
