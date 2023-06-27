const feeCollectController = require('../controllers/feeCollectController')
const router = require('express').Router()


router.get('/:student_id' , feeCollectController.collectStudentFee);
router.get('/searchFeePaymentStatus/:payment_id',feeCollectController.status);
// router.post('/' , FeeDiscountController.createFeeDiscount)
// router.delete('/:id' , FeeDiscountController.deleteFeeDiscount)
// router.patch('/:id' , FeeDiscountController.updateFeeDiscount)



module.exports  = router