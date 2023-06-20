const PostalReceive = require("../models/PostalReceive");
const api = require("../utils/apiFactory");

/**
 * @param : id
 */
exports.deletePostalReceive = async (req, res) => {
  console.log(req.params);
  try {
    let uId = req.params.id;
    await PostalReceive.destroy({ where: { id: uId } });
    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPostalReceive = api.getAll(PostalReceive);
exports.createPostalReceive = api.create(PostalReceive);
exports.updatePostalReceive = api.update(PostalReceive);
