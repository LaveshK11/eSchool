const FeeCategoryController = require("../controllers/feeCollectController");
const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("ok");
});
router.get("/:student_id", FeeCategoryController.collectStudentFee);

module.exports = router;
