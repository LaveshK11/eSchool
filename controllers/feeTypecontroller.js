const FeeType = require("../models/FeeType");
const api = require("../utils/apiFactory");

exports.getAllFeeType = api.getAll(FeeType);
exports.createFeeType = api.create(FeeType);
exports.deleteFeeType = async (req, res) => {
  try {
    await FeeType.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: "deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateFeeType = api.update(FeeType);
