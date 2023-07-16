const FeeGroup = require("../models/FeeGroup");
const api = require("../utils/apiFactory");

exports.getAllFeeGroup = api.getAll(FeeGroup);
exports.createFeeGroup = api.create(FeeGroup);
exports.deleteFeeGroup = async (req, res) => {
  try {
    await FeeGroup.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: " deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateFeeGroup = api.update(FeeGroup);
