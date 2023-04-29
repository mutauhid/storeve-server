const config = require('../../config');
const jwt = require('jsonwebtoken');
const Player = require('../player/model');

const isLoginAdmin = (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash('alertMessage', `Your session has expired`);
    req.flash('alertStatus', 'danger');
    res.redirect('/');
  } else {
    next();
  }
};

const isPlayerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
    const data = jwt.verify(token, config.jwtKey);
    const player = await Player.findOne({ _id: data.id });
    if (!player) {
      throw new Error();
    }
    req.player = player;

    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'No Authorization' });
  }
};

module.exports = { isLoginAdmin, isPlayerAuth };
