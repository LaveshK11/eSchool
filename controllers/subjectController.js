const Subject = require("../models/Subject");
const ApiFactory = require("../utils/apiFactory");

exports.getAllSubject = ApiFactory.getAll(Subject);
exports.createSubject = ApiFactory.create(Subject);
exports.deleteSubject = async (req, res) => {
  try {
    let uId = req.params.id;
    await Subject.destroy({ where: { id: uId } });
    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateSubject = ApiFactory.update(Subject);
