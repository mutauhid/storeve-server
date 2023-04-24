const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");

    const alert = { message: alertMessage, status: alertStatus };
    const voucher = await Voucher.find()
      .populate("category")
      .populate("nominal");

    res.render("admin/Voucher/view_Voucher", {
      voucher,
      alert,
      name: req.session.user.name,
      title: "Voucher Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/Voucher");
  }
};

const viewCreate = async (req, res) => {
  try {
    const category = await Category.find();
    const nominal = await Nominal.find();
    res.render("admin/voucher/view_create", {
      category,
      nominal,
      name: req.session.user.name,
      title: "Add Voucher Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/voucher");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { name, nominal, category } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/${fileName}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          const voucher = new Voucher({
            name,
            category,
            nominal,
            thumbnail: fileName,
          });
          await voucher.save();
          req.flash("alertMessage", "Success Add Voucher");
          req.flash("alertStatus", "success");
          res.redirect("/voucher");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/voucher");
        }
      });
    } else {
      const voucher = new Voucher({
        name,
        category,
        nominal,
      });
      await voucher.save();
      req.flash("alertMessage", "Success Add Voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/Voucher");
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.find();
    const nominal = await Nominal.find();
    const voucher = await Voucher.findOne({ _id: id })
      .populate("category")
      .populate("nominal");

    res.render("admin/Voucher/view_edit", {
      voucher,
      category,
      nominal,
      name: req.session.user.name,
      title: "Edit Voucher Page",
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/voucher");
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nominal, category } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let fileName = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/${fileName}`
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on("end", async () => {
        try {
          const voucher = await Voucher.findOne({ _id: id });

          const currentImage = `${config.rootPath}/public/upload/${voucher.thumbnail}`;

          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          await Voucher.findOneAndUpdate(
            { _id: id },
            { name, category, nominal, thumbnail: fileName }
          );

          req.flash("alertMessage", "Success Edit Voucher");
          req.flash("alertStatus", "success");
          res.redirect("/voucher");
        } catch (error) {
          req.flash("alertMessage", `${error.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/voucher");
        }
      });
    } else {
      await Voucher.findOneAndUpdate({ _id: id }, { name, category, nominal });

      req.flash("alertMessage", "Success Edit Voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/Voucher");
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findOneAndRemove({ _id: id });
    const currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }
    req.flash("alertMessage", "Success Delete Voucher");
    req.flash("alertStatus", "success");
    res.redirect("/Voucher");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/Voucher");
  }
};

const actionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let voucher = await Voucher.findOne({ _id: id });
    let status = voucher.status === "Y" ? "N" : "Y";
    voucher = await Voucher.findOneAndUpdate({ _id: id }, { status });
    req.flash("alertMessage", "Success Update Status");
    req.flash("alertStatus", "success");
    res.redirect("/Voucher");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/Voucher");
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
