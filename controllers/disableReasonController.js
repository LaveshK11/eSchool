const DisableReason = require("../models/DisableReason");
const ApiFactory = require("../utils/apiFactory");

exports.getAllReasons = ApiFactory.getAll(DisableReason);

exports.createReason = ApiFactory.create(DisableReason);

exports.deleteReason = async (req, res) => {
  try {
    await DisableReason.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: "deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateReason = ApiFactory.update(DisableReason);
