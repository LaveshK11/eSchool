const Category = require("../models/Category");

exports.getAllCategory = require("../utils/apiFactory").getAll(Category);
exports.createCategory = require("../utils/apiFactory").create(Category);
exports.deleteCategory = async (req, res) => {
  try {
    let data = await Category.destroy({ where: { id: req.params.id } });
    console.log(data);
    res.status(200).json({
      status: "success",
      message: "student deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateCategory = require("../utils/apiFactory").update(Category);
