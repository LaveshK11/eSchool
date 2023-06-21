const feeCollectController = require('../controllers/feeCollectController')
const router = require('express').Router()


router.get('/' , feeCollectController.collectStudentFee)
// router.post('/' , FeeDiscountController.createFeeDiscount)
// router.delete('/:id' , FeeDiscountController.deleteFeeDiscount)
// router.patch('/:id' , FeeDiscountController.updateFeeDiscount)



module.exports  = router