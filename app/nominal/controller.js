const Nominal = require('./model');

const index = async (req, res) => {
  try {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');

    const alert = { message: alertMessage, status: alertStatus };
    const nominal = await Nominal.find();

    res.render('admin/nominal/view_nominal', {
      nominal,
      alert,
      name: req.session.user.name,
      title: 'Nominal Page',
    });
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

const viewCreate = (req, res) => {
  try {
    res.render('admin/nominal/view_create', {
      name: req.session.user.name,
      title: 'Add Nominal Page',
    });
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

const actionCreate = async (req, res) => {
  try {
    const { coinQuantity, coinName, price } = req.body;

    const nominal = await Nominal.create({ coinQuantity, coinName, price });

    await nominal.save();
    req.flash('alertMessage', 'Success Add Nominal');
    req.flash('alertStatus', 'success');
    res.redirect('/nominal');
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const nominals = await Nominal.find();
    const nominal = await Nominal.findOne({ _id: id });

    res.render('admin/nominal/view_edit', { nominal, nominals, name: req.session.user.name, title: 'Edit Nominal Page' });
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { coinQuantity, coinName, price } = req.body;
    await Nominal.findOneAndUpdate({ _id: id }, { coinQuantity, coinName, price });
    req.flash('alertMessage', 'Success Edit Nominal');
    req.flash('alertStatus', 'success');
    res.redirect('/nominal');
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Nominal.findOneAndRemove({ _id: id });
    req.flash('alertMessage', 'Success Delete Nominal');
    req.flash('alertStatus', 'success');
    res.redirect('/nominal');
  } catch (error) {
    req.flash('alertMessage', `${error.message}`);
    req.flash('alertStatus', 'danger');
    res.redirect('/nominal');
  }
};

module.exports = {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
};
