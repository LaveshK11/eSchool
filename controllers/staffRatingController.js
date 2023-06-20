const StaffRating = require("../models/StaffRating");
const Api = require("../utils/apiFactory");

exports.getAllStaffRating = Api.getAll(StaffRating);
exports.createStaffRating = Api.create(StaffRating);
exports.deleteStaffRating = Api.delete(StaffRating);
exports.updateStaffRating = Api.update(StaffRating);
