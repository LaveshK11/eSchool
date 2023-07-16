const LeaveType = require("../models/StaffLeaveType");
const api = require("../utils/apiFactory");

exports.getAllLeaveType = api.getAll(LeaveType);
exports.createLeaveType = api.create(LeaveType);
exports.deleteLeaveType = async (req, res) => {
  try {
    let uId = req.params.id;
    await LeaveType.destroy({ where: { id: uId } });
    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updateLeaveType = api.update(LeaveType);
