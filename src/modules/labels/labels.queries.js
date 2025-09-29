require("dotenv").config();
const { ObjectId } = require("mongodb");
const connectDB = require("../../config/db");

// Create Label
const createLabels = async (labelData) => {
  const { labelTitle, labelDescription } = labelData;
  const db = await connectDB();
  const newLabel = {
    name: labelTitle,
    description: labelDescription,
    isActive: true,
    isDelete: false,
    status: true,
    createAt: new Date(),
    updateAt: null,
  };

  const response = await db.collection("labels").insertOne(newLabel);
  return {
    ...newLabel,
    _id: response.insertedId,
  };
};

const getAllLabels = async () => {
  const db = await connectDB();
  return await db
    .collection("labels")
    .find({ isActive: true, isDelete: false })
    .toArray();
};

// Get Label By ID
const getLabelById = async (id) => {
  const db = await connectDB();
  return await db
    .collection("labels")
    .findOne({ _id: new ObjectId(id), isActive: true, isDelete: false });
};

// Update Label
const updateLabel = async (id, updateData) => {
  const db = await connectDB();
  const updatedLabel = {
    ...updateData,
    updateAt: new Date(),
  };

  const response = await db
    .collection("labels")
    .updateOne(
      { _id: new ObjectId(id), isDelete: false },
      { $set: updatedLabel }
    );

  return response.modifiedCount > 0 ? { _id: id, ...updatedLabel } : null;
};

// Soft Delete Label (mark isDelete = true)
const removeLabel = async (id) => {
  const db = await connectDB();
  const response = await db
    .collection("labels")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { isDelete: true, isActive: false, updateAt: new Date() } }
    );
  return response.modifiedCount > 0;
};

// Hard Delete Label (permanent remove)
const hardDeleteLabel = async (id) => {
  const db = await connectDB();
  const response = await db
    .collection("labels")
    .deleteOne({ _id: new ObjectId(id) });
  return response.deletedCount > 0;
};

module.exports = {
  createLabels,
  getAllLabels,
  getLabelById,
  updateLabel,
  removeLabel,
  hardDeleteLabel,
};
