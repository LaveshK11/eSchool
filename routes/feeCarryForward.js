const feeCarryForward = require("../controllers/feeCarryForward");

const router = require("express").Router();

router.post("/", feeCarryForward.carryFee);

module.exports = router;
