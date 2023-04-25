const Bank = require("./model");

const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const bank = await Bank.find();

    res.render("admin/bank/view_bank", {
      bank,
      alert,
      name: req.session.user.name,
      title: "Bank Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
  }
};

const viewCreate = (req, res) => {
  try {
    res.render("admin/bank/view_create", {
      name: req.session.user.name,
      title: "Add Bank Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { name, nameBank, noRekening } = req.body;

    const bank = await Bank.create({ name, nameBank, noRekening });

    await bank.save();
    req.flash("alertMessage", "Success Add Bank");
    req.flash("alertStatus", "success");
    res.redirect("/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const bank = await Bank.findOne({ _id: id });

    res.render("admin/bank/view_edit", {
      bank,
      name: req.session.user.name,
      title: "Edit Bank Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bankName, noRekening } = req.body;
    await Bank.findOneAndUpdate({ _id: id }, { name, bankName, noRekening });
    req.flash("alertMessage", "Success Edit Bank");
    req.flash("alertStatus", "success");
    res.redirect("/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Bank.findOneAndRemove({ _id: id });
    req.flash("alertMessage", "Success Delete Bank");
    req.flash("alertStatus", "success");
    res.redirect("/bank");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/bank");
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
