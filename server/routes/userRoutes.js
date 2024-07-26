const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(userController.getAllUsers);

router.route("/me").get(authController.getMe, userController.getUser);

// Routes for bookmarks and downloads
router
  .route("/me/bookmarks")
  .post(userController.addBookmark)
  .delete(userController.removeBookmark);

router
  .route("/me/downloads")
  .post(userController.addDownload)
  .delete(userController.removeDownload);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
