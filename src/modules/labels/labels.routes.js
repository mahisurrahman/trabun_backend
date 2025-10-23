const express = require("express");
const router = express.Router();

const labelController = require("./labels.controller");

router.post("/create", labelController.createLabelCntrlr);
router.get("/getAll", labelController.getAllLabelsCntrlr);
router.get("/getById/:id", labelController.getLabelByIdCntrlr);
router.post("/update/:id", labelController.updateLabelCntrlr);
router.get("/remove/:id", labelController.removeLabelCntrlr);
router.get("/delete/:id", labelController.hardDeleteLabelCntrlr);

module.exports = router;
