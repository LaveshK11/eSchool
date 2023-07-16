const feeCollect = require("../models/FeeCollect");
const FeeGroup = require("../models/FeeGroup");
const feeMaster = require("../models/FeeMaster");

exports.carryFee = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const student_id = req.body.id;
    const class_ = req.body.class;
    const balance = req.body.balance;
    var PreviousDate = new Date(year, 1, 1);

    const feeGroupData = await FeeGroup.findOrCreate({
      where: {
        name: "Previous Year due",
        class: class_,
        description: `Added dues for year ${Number(year - 1)} - ${Number(
          year
        )}`,
      },
      defaults: {
        name: "Previous Year due",
        class: class_,
        description: `Added dues for year ${Number(year - 1)} - ${Number(
          year
        )}`,
      },raw:true
    });
    const feeMasterData = await feeMaster.create(
      {
        amount: Number(balance),
        description: "Previous dues created",
        due_date: PreviousDate,
        fee_group_id: feeGroupData[0].id,
        fee_type_id: 1,
        class_id: 23,
        session_id: 1,
      },
      { raw: true }
    );
    console.log(feeMasterData['dataValues'],feeMasterData['dataValues']['id']);
    const feeCollectData = await feeCollect.create({
      fee_master_id: Number(feeMasterData['dataValues']['id']),
      discount_id: 1,
      session_id: 1,
      student_id: student_id,
    });
    return res
      .status(400)
      .send({ status: "success", message: "Student fee added successfully " });
  } catch (error) {
    console.log(error);
  }
};
