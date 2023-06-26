const noticeBoard = require("../models/NoticeBoard.js");
const path = require("path");
const multer = require("multer");
const Api = require("../utils/apiFactory");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/noticeDocument`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage }).single("document");

exports.createNotice = async (req, res, next) => {
  console.log(req.body);
  upload(req, res, async (err) => {
    if (req.body.attachment)
      req.body.document = `/public/noticeDocument/${req.body.attachment}`;
    await noticeBoard.create(req.body);
  });
  res.status(200).json({
    status: "success",
    message: "Assignment updated successfully!",
    data: req.body,
  });
};
exports.getallNotice = Api.getAll(noticeBoard);

exports.updateNotice = Api.update(noticeBoard);

exports.deleteNotice = Api.delete(noticeBoard);
