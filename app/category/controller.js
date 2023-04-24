const Category = require("./model");

const index = async (req, res, next) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const category = await Category.find();

    res.render("admin/category/view_category", {
      category,
      alert,
      name: req.session.user.name,
      title: "Category Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

const viewCreate = (req, res) => {
  try {
    res.render("admin/category/view_create", {
      name: req.session.user.name,
      title: "Add Category Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { name } = req.body;
    let category = await Category({ name });
    await category.save();
    req.flash("alertMessage", "Success Add Category");
    req.flash("alertStatus", "success");
    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    res.render("admin/category/view_edit", {
      category,
      name: req.session.user.name,
      title: "Edit Category Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Category.findOneAndUpdate({ _id: id }, { name });
    req.flash("alertMessage", "Success Edit Category");
    req.flash("alertStatus", "warning");
    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findOneAndRemove({ _id: id });
    req.flash("alertMessage", "Success Delete Category");
    req.flash("alertStatus", "danger");
    res.redirect("/category");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/category");
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
