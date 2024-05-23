const express = require("express");
const multer = require("multer");
//const multerS3 = require("multer-s3");
const upload = require("../utils/multer");
const { auction_controller } = require("../controller");

const router = express.Router();

router.post(
  "/post",
  upload.fields([{ name: "image" }]),
  auction_controller.Post
);
router.delete("/delete", auction_controller.Delete);
router.post("/update", auction_controller.Update);
router.get("/get", auction_controller.Get);
router.get("/getpost/:id", auction_controller.GetPost);
router.post("/search", auction_controller.Search);

module.exports = router;
