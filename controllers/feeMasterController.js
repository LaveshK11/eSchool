const FeeMaster = require("../models/FeeMaster");
const api = require("../utils/apiFactory");
const sequelize = require("sequelize");
const FeeType = require("../models/FeeType");
const FeeGroup = require("../models/FeeGroup");
const Session = require("../models/Session");
const Student = require("../models/student");
const Class = require("../models/Class");
const feeCollect = require("../models/FeeCollect");
// const feeGroupType = require('../models/FeeGroupCode')

exports.getAllFeeMaster = async (req, res, next) => {
  try {
    let feeMasters = await FeeMaster.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("fee_group_id")), "fee_grp_id"],
      ],
    });

    let results = [];

    for (const id of feeMasters) {
      try {
        if (!id.fee_grp_id) {
          continue;
        }
        let obj = {};
        let fee_codes = [];

        let feeMaster = await FeeMaster.findAll({
          where: {
            fee_group_id: Number(id.fee_grp_id),
          },
          include: [
            {
              model: FeeGroup,
              attributes: ["name"],
            },
            {
              model: FeeType,
              attributes: ["id", "type"],
            },
            {
              model: Session,
              attributes: ["session"],
            },
          ],
          raw: true,
          nest: true,
        });

        obj.id = feeMaster[0]["id"];
        obj.fee_group = feeMaster[0]["fee_group"].name;
        if (feeMaster[0]["session"] != null)
          obj.session = feeMaster[0]["session"].session || null;
        feeMaster.forEach((fee_master) => {
          fee_codes.push({
            id: fee_master["fee_type"].id,
            code: fee_master["fee_type"].type + ` $${fee_master["amount"]}`,
          });
        });

        obj.fee_code = fee_codes;
        results.push(obj);
      } catch (error) {
        console.log(error);
      }
    }

    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};

exports.createFeeMaster = async (req, res, next) => {
  try {
    const feeGroupId = Number(req.body.fee_group_id);
    const class_Data = await FeeGroup.findOne({
      where: { id: feeGroupId },
      attributes: ["class"],
    });
    const classData = class_Data["dataValues"]["class"];

    const allStudents = await Student.findAll(
      {
        attributes: ["id"],
        include: {
          model: Class,
          attributes: ["class"],
        },
      },
      { raw: true }
    );
    const data = allStudents.reduce((acc, value) => {
      acc = [...acc, value.toJSON()];
      return acc;
    }, []);

    const feeMasterData = (
      await FeeMaster.create(req.body, { raw: true })
    ).toJSON();
    const students_Array = [];
    data.forEach((students) => {
      if (
        students["class"] != null &&
        students["class"]["class"] == classData
      ) {
        students_Array.push(students);
      }
    });
    const toCollectFromStudents = students_Array.map((students) => {
      return feeCollect.create({
        fee_master_id: feeMasterData.id,
        discount_id: 1,
        session_id: 1,
        student_id: students.id,
      });
    });
    await Promise.all(toCollectFromStudents);

    res.status(200).json({
      status: "success",
      message: "Added successfully!",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.deleteFeeMasterType = async (req, res, next) => {
  try {
    await FeeMaster.destroy({
      where: {
        id: req.params.fee_master_id,
        fee_type_id: req.params.fee_type_id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFeeMaster = async (req, res, next) => {
  try {
    await FeeMaster.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFeeMaster = api.update(FeeMaster);

exports.getFeeMasterAmountSum = async (req, res, next) => {
  try {
    let data = await FeeMaster.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      include: {
        model: FeeGroup,
        attributes: ["name"],
      },
      group: ["fee_group_id"],
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
