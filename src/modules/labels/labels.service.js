const labelQueries = require("./labels.queries.js");

// Create Label
const createLabelSrvc = async (body) => {
  try {
    const response = await labelQueries.createLabels(body);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Label has been created",
        data: response,
      };
    } else {
      return {
        status: 400,
        error: true,
        message: "Label creation failed",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Create Label Service - Internal Server Error",
      data: null,
    };
  }
};

// Get All Labels
const getAllLabelsSrvc = async () => {
  try {
    const response = await labelQueries.getAllLabels();
    return {
      status: 200,
      error: false,
      message: "Labels fetched successfully",
      data: response,
    };
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Get All Labels Service - Internal Server Error",
      data: null,
    };
  }
};

// Get Label By ID
const getLabelByIdSrvc = async (id) => {
  try {
    const response = await labelQueries.getLabelById(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Label fetched successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Label not found",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Get Label By ID Service - Internal Server Error",
      data: null,
    };
  }
};

// Update Label
const updateLabelSrvc = async (id, body) => {
  try {
    const response = await labelQueries.updateLabel(id, body);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Label updated successfully",
        data: response,
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Label not found or update failed",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Update Label Service - Internal Server Error",
      data: null,
    };
  }
};

// Soft Delete Label
const removeLabelSrvc = async (id) => {
  try {
    const response = await labelQueries.removeLabel(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Label removed (soft delete) successfully",
        data: { _id: id },
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Label not found or already deleted",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Remove Label Service - Internal Server Error",
      data: null,
    };
  }
};

// Hard Delete Label
const hardDeleteLabelSrvc = async (id) => {
  try {
    const response = await labelQueries.hardDeleteLabel(id);
    if (response) {
      return {
        status: 200,
        error: false,
        message: "Label permanently deleted",
        data: { _id: id },
      };
    } else {
      return {
        status: 404,
        error: true,
        message: "Label not found",
        data: null,
      };
    }
  } catch (error) {
    return {
      status: 500,
      error: true,
      message: "Hard Delete Label Service - Internal Server Error",
      data: null,
    };
  }
};

module.exports = {
  createLabelSrvc,
  getAllLabelsSrvc,
  getLabelByIdSrvc,
  updateLabelSrvc,
  removeLabelSrvc,
  hardDeleteLabelSrvc,
};
