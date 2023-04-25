const Transaction = require('./model');

const index = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');

    const alert = { message: alertMessage, status: alertStatus };
    const transaction = await Transaction.find().populate('player');

    res.render('admin/transaction/view_transaction', {
      transaction,
      alert,
      name: req.session.user.name,
      title: 'Transaction Page',
    });
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/transaction');
  }
};

const actionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let transaction = await Transaction.findOne({ _id: id });
    const status = transaction.status === 'pending' || transaction.status === 'failed' ? 'success' : 'failed';
    transaction = await Transaction.findOneAndUpdate({ _id: id }, { status });
    req.flash('alertMessage', 'Success Update Status');
    req.flash('alertStatus', 'success');
    res.redirect('/transaction');
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/transaction');
  }
};

module.exports = { index, actionStatus };
