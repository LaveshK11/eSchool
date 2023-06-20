const NoticeBoard = require("../controllers/noticeBoardController");
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
router.delete('/delete/:id' , NoticeBoard.deleteNotice)
module.exports = router;
