const labelServices = require("./labels.service.js");

// Create Label
const createLabelCntrlr = async (req, res) => {
  try {
    const response = await labelServices.createLabelSrvc(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Create Label Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Create Label Controller - Internal Server Error",
      data: null,
    });
  }
};

// Get All Labels
const getAllLabelsCntrlr = async (req, res) => {
  try {
    const response = await labelServices.getAllLabelsSrvc();
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get All Labels Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get All Labels Controller - Internal Server Error",
      data: null,
    });
  }
};

// Get Label By ID
const getLabelByIdCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await labelServices.getLabelByIdSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Get Label By ID Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Get Label By ID Controller - Internal Server Error",
      data: null,
    });
  }
};

// Update Label
const updateLabelCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await labelServices.updateLabelSrvc(id, req.body);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Update Label Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Update Label Controller - Internal Server Error",
      data: null,
    });
  }
};

// Soft Delete Label
const removeLabelCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await labelServices.removeLabelSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Remove Label Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Remove Label Controller - Internal Server Error",
      data: null,
    });
  }
};

// Hard Delete Label
const hardDeleteLabelCntrlr = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await labelServices.hardDeleteLabelSrvc(id);
    res.status(response.status).send(response);
  } catch (error) {
    console.log("Hard Delete Label Controller Error", error);
    res.status(500).send({
      status: 500,
      error: true,
      message: "Hard Delete Label Controller - Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createLabelCntrlr,
  getAllLabelsCntrlr,
  getLabelByIdCntrlr,
  updateLabelCntrlr,
  removeLabelCntrlr,
  hardDeleteLabelCntrlr,
};
