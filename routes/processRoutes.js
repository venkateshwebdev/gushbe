const express = require("express");
const processController = require("../controllers/processController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(processController.getProcesses)
  .post(processController.createProcess);
router
  .route("/:id")
  .get(processController.getProcess)
  .delete(processController.deleteProcess)
  .put(processController.updateProcess);

module.exports = router;
