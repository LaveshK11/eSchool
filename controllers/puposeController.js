const Purpose = require("../models/Purpose");
const Api = require("../utils/apiFactory");

exports.getAllPurpose = Api.getAll(Purpose);
exports.createPurpose = Api.create(Purpose);
exports.deletePurpose = async (req, res) => {
  try {
    await Purpose.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: "student deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updatePurpose = Api.update(Purpose);
