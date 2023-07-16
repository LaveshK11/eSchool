const FeeDiscount = require("../models/FeeDiscount");
const api = require("../utils/apiFactory");

exports.getAllFeeDiscount = api.getAll(FeeDiscount);
exports.createFeeDiscount = api.create(FeeDiscount);
exports.deleteFeeDiscount = async (req, res) => {
  try {
    await FeeDiscount.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: "deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateFeeDiscount = api.update(FeeDiscount);
