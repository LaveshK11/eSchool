const Postaldispatch = require("../models/PostalDipatch");
const api = require("../utils/apiFactory");

exports.getAllPostalDispatch = api.getAll(Postaldispatch);
exports.createPostalDispatch = api.create(Postaldispatch);
exports.deletePostalDispatch = async (req, res) => {
  try {
    await Postaldispatch.destroy({ where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      message: "deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updatePostalDispatch = api.update(Postaldispatch);
