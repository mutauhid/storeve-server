const isLoginAdmin = (req, res, next) => {
  if (req.session.user === null || req.session.user === undefined) {
    req.flash("alertMessage", `Your session has expired`);
    req.flash("alertStatus", "danger");
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = isLoginAdmin;
