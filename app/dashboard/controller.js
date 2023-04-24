const index = async (req, res, next) => {
  try {
    res.render("index", {
      name: req.session.user.name,
      title: "Halaman Dashboard",
    });
  } catch (error) {}
};

module.exports = { index };
