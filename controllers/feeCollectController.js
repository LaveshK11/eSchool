// const Class = require('../models/Class')
// const Section = require('../models/Section')

const feeCollect = require("../models/FeeCollect");

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
    console.log(student_id);
    const fees_data=await feeCollect.findOne({where:{student_id:student_id}});
    res.send({"fees_data":fees_data});   



  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
