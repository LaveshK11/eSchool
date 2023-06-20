const StaffRatingController = require("../controllers/staffRatingController");

const router = require("express").Router();

router.get("/", StaffRatingController.getAllStaffRating);
router.post("/createRating", StaffRatingController.createStaffRating);
router.delete("/:id", StaffRatingController.deleteStaffRating);
router.patch("/approve/:id", StaffRatingController.updateStaffRating);

module.exports = router;
