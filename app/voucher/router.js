const express = require('express');
const { index, viewCreate, actionCreate, actionDelete, viewEdit, actionEdit, actionStatus } = require('./controller');
const multer = require('multer');
const os = require('os');
const { isLoginAdmin } = require('../middleware/auth');

const route = express.Router();

route.use(isLoginAdmin);
route.get('/', index);
route.get('/create', viewCreate);
route.post('/create', multer({ dest: os.tmpdir() }).single('image'), actionCreate);
route.get('/edit/:id', viewEdit);
route.put('/edit/:id', multer({ dest: os.tmpdir() }).single('image'), actionEdit);
route.delete('/delete/:id', actionDelete);
route.put('/status/:id', actionStatus);

module.exports = route;
