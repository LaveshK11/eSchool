// const Class = require('../models/Class')
// const Section = require('../models/Section')

const feeCollect = require("../models/FeeCollect");
const FeeGroup = require("../models/FeeGroup");
const feeMaster = require("../models/FeeMaster");

// const Student = require('../models/student')

exports.getClassSectionStudent = async (req, res) => {
  try {
    let data = await Student.findAll({
      attributes: ["id", "id_no", "firstname", "dob", "mobileno"],
      where: {
        class_id: req.params.class_id,
        section_id: req.params.section_id,
      },
      include: [
        {
          model: Class,
          attributes: ["class"],
        },
        {
          model: Section,
          attributes: ["section"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.collectStudentFee = async (req, res) => {
  try {
    let student_id = req.params.student_id;
    const fees_data = await feeCollect.findAll({
      where: { student_id },
      attributes: ["id", "status", "mode", "fine", "paid", "balance"],
      include: [
        {
          model: feeMaster,
          attributes: ["amount", "due_date", "fine_amount"],
          include: [
            {
              model: FeeGroup,
              attributes: ["name", "description"],
            },
          ],
        },
      ],
    });

    const dataDeliver = fees_data.reduce((acc, feesData) => {
      console.log(feesData.fee_master)
      acc = [
        ...acc,
        {
          id: feesData.id,
          status: feesData.status,
          mode: feesData.fine,
          paid: feesData.paid,
          balance: feesData.balance,
          amount: feesData.fee_master.amount,
          due_date: feesData.fee_master.due_date,
          fine_amount: feesData.fee_master.fine_amount,
          
          name: feesData.fee_master.fee_group.name,
          description: feesData.fee_master.fee_group.description,
        },
      ];
      return acc;
    }, []);
    res.status(200).send({ data: dataDeliver });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.status = async (req, res, next) => {
  const payment_id = req.params.payment_id;
  const feesStatusData = await feeCollect.findOne({
    where: { payment_id },
    attributes: ["mode", "fine", "payment_id", "updatedAt", "status"],
    include: [
      {
        model: feeMaster,
        attributes: ["fine_amount", "fine_type", "amount"],
        include: [
          {
            model: FeeGroup,
            attributes: ["name", "description"],
          },
        ],
      },
    ],
  });

  if (feesStatusData) {
    const dataDeliver = {
      mode: feesStatusData.mode,
      status: feesStatusData.status,
      payment_id: feesStatusData.payment_id,
      amount: feesStatusData.fee_master.amount,
      due_date: feesStatusData.fee_master.due_date,
      fine_amount: feesStatusData.fee_master.fine_amount,
      fine_type: feesStatusData.fee_master.fine_type,
      name: feesStatusData.fee_master.fee_group.name,
      description: feesStatusData.fee_master.fee_group.description,
    };
    let data = [];
    data.push(dataDeliver);
    res.send({ data: data });
  } else {
    res.send({ data: [] });
  }
};

exports.updatePAyment = async (req, res, next) => {
  try {
    const id = req.body.id;
    const mode = req.body.mode;
    const paid = req.body.paid;
    const data = await feeCollect.findByPk(id);
    const totalAmount = (
      await feeMaster.findOne({
        where: { id: data.fee_master_id },
        attributes: ["amount"],
      })
    ).amount;
    if (Number(paid) + Number(data.paid) > Number(totalAmount)) {
      return res.status(404).send({
        status: false,
        message: "Requested amount is higher than which is to be paid",
      });
    }
    await feeCollect.update(
      {
        paid: Number(data.paid) + Number(paid),
        balance: Number(data.balance) - Number(paid),
      },
      { where: { id } }
    );
    if (Number(totalAmount) == Number(paid) + Number(data.paid)) {
      let val = await feeCollect.update(
        { status: "paid", mode },
        { where: { id } }
      );
    } else {
      let r = await feeCollect.update(
        { status: "partial", mode },
        { where: { id } }
      );
    }
    res.send({ data: true, message: "successfully added" });
  } catch (error) {
    console.log(error);
  }
};
