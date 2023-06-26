<<<<<<< HEAD
const feeCollectController = require('../controllers/feeCollectController')
const router = require('express').Router()


router.get('/:student_id' , feeCollectController.collectStudentFee)
// router.post('/' , FeeDiscountController.createFeeDiscount)
// router.delete('/:id' , FeeDiscountController.deleteFeeDiscount)
// router.patch('/:id' , FeeDiscountController.updateFeeDiscount)



module.exports  = router
=======
const FeeCategoryController = require("../controllers/feeCollectController");
const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("ok");
});
router.get("/:student_id", FeeCategoryController.collectStudentFee);

module.exports = router;
>>>>>>> master
