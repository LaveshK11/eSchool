const NoticeBoard = require("../controllers/noticeBoardController");
const noticeBoard = require("../models/NoticeBoard");
const router = require("express").Router();

router.get("/", NoticeBoard.getallNotice);

/**
 * @body title
 * @body notice Date
 * @body Publish ON
 * @body document_file
 * @body message to (recipients)
 */
router.post("/create", NoticeBoard.createNotice);
router.delete("/delete/:id", NoticeBoard.deleteNotice);
router.patch("/update/:id", NoticeBoard.updateNotice);
module.exports = router;
