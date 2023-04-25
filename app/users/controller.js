const User = require("./model");
const bcrypt = require("bcryptjs");

const viewSignin = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    if (req.session.user === null || req.session.user === undefined) {
      res.render("admin/users/view_sigin", { alert,
        title: "Login Page", });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  }
};

const actionSigin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.status === "Y") {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          req.session.user = {
            id: user._id,
            email: user.email,
            status: user.status,
            name: user.name,
          };
          console.log(req.session);
          res.redirect("/dashboard");
        } else {
          req.flash("alertMessage", `Wrong Password`);
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", `Your account status is not active`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } else {
      req.flash("alertMessage", `User not found`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  }
};

const actionLogout = (req, res) => {
  try {
    if (req.session) {
      req.session.destroy();
      res.redirect("/");
    } else {
      req.flash("alertMessage", `Please Login First`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  }
};

module.exports = {
  viewSignin,
  actionSigin,
  actionLogout,
};
