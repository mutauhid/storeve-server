const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');
const Category = require('../category/model');
const Player = require('../player/model');

const index = async (req, res, next) => {
  try {
    const transaction = await Transaction.countDocuments();
    const voucher = await Voucher.countDocuments();
    const category = await Category.countDocuments();
    const player = await Player.countDocuments();
    const dashboard = await res.render('index', {
      count: {
        transaction,
        voucher,
        category,
        player,
      },
      name: req.session.user.name,
      title: 'Halaman Dashboard',
    });
  } catch (error) {}
};

module.exports = { index };
