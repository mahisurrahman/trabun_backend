const express = require("express");
const router = express.Router();

const labelController = require("./labels.controller");
const labelValidator = require("./labels.validator");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post(
  "/create",
  labelValidator.createLabel,
  labelController.createLabelCntrlr
);
router.get("/getAll", labelController.getAllLabelsCntrlr);
router.get("/getById/:id", labelController.getLabelByIdCntrlr);
router.post(
  "/update/:id",
  labelValidator.updateLabel,
  labelController.updateLabelCntrlr
);
router.get("/remove/:id", labelController.removeLabelCntrlr);
router.get("/delete/:id", labelController.hardDeleteLabelCntrlr);

module.exports = router;
