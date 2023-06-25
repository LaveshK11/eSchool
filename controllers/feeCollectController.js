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
   const dataDeliver= fees_data.reduce((acc, feesData) => {
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
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.status = async (req, res, next) => {
  const payment_id = req.params.payment_id;
  const feesStatusData = await feeCollect.findOne({
    payment_id,
    attributes: ["mode", "fine", "payment_id", "updatedAt"],
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
  res.send({ data: feesStatusData });
};

exports.updatePAyment = (req, res, next) => {
  const id = req.body.id;
  const mode = req.body.mode;
};
