const Player = require('../player/model');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
  try {
    const payload = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let fileName = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const player = new Player({
            ...payload,
            avatar: fileName,
          });
          await player.save();
          delete player._doc.password;
          return res.status(200).json({ data: player });
        } catch (error) {
          if (error && error.name === 'ValidationError') {
            return res.status(422).json({
              error: 1,
              msg: error.message,
              fields: error.errors,
            });
          }
          next(error);
        }
      });
    } else {
      const player = new Player(payload);
      await player.save();
      delete player._doc.password;

      return res.status(200).json({ data: player });
    }
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      return res.status(422).json({
        error: 1,
        msg: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const player = await Player.findOne({ email: email });
    if (!player) return res.status(403).json({ msg: 'Email is not registered' });
    const checkPassword = bcrypt.compareSync(password, player.password);
    if (!checkPassword) return res.status(403).json({ msg: 'Invalid Password' });
    const token = jwt.sign(
      {
        id: player.id,
        username: player.username,
        email: player.email,
        phoneNumber: player.phoneNumber,
        nama: player.nama,
        avatar: player.avatar,
      },
      config.jwtKey
    );
    res.status(200).json({ data: token });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};
module.exports = { signUp, signIn };
