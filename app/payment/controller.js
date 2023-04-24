const Payment = require("./model");
const Bank = require("../bank/model");

const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const payment = await Payment.find().populate("banks");

    res.render("admin/payment/view_payment", {
      payment,
      alert,
      name: req.session.user.name,
      title: "Payment Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const viewCreate = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.render("admin/payment/view_create", {
      banks,
      name: req.session.user.name,
      title: "Add Payment Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { type, banks } = req.body;

    const payment = await Payment.create({ type, banks });

    await payment.save();
    req.flash("alertMessage", "Success Add Payment");
    req.flash("alertStatus", "success");
    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const banks = await Bank.find();
    const payment = await Payment.findOne({ _id: id }).populate("banks");

    res.render("admin/payment/view_edit", {
      payment,
      banks,
      name: req.session.user.name,
      title: "Edit Payment Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, banks } = req.body;
    await Payment.findOneAndUpdate({ _id: id }, { type, banks });
    req.flash("alertMessage", "Success Edit Payment");
    req.flash("alertStatus", "success");
    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Payment.findOneAndRemove({ _id: id });
    req.flash("alertMessage", "Success Delete Nominal");
    req.flash("alertStatus", "success");
    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

const actionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let payment = await Payment.findOne({ _id: id });
    let status = payment.status === "Y" ? "N" : "Y";
    payment = await Payment.findOneAndUpdate({ _id: id }, { status });
    req.flash("alertMessage", "Success Update Status");
    req.flash("alertStatus", "success");
    res.redirect("/payment");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/payment");
  }
};

module.exports = {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
};
