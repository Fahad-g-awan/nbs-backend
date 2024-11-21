const { Feature } = require("../models");

const createFeature = async (req, res) => {
  const { features = [] } = req.body;

  try {
    const featuresMap = features.map((feat) => ({ feature: feat }));
    const newFeatures = await Feature.bulkCreate(featuresMap);

    res.status(201).json(newFeatures);
  } catch (err) {
    console.error(" Feature Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllFeature = async (req, res) => {
  try {
    const allFeature = await Feature.findAll();
    res.status(200).json(allFeature);
  } catch (err) {
    console.error("Feature Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateFeature = async (req, res) => {
  const { id } = req.params;
  const { features } = req.body;
  // const { style, color, features } = req.body;

  try {
    const foundFeature = await Feature.findByPk(id);

    if (!foundFeature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    foundFeature.feature = features;
    await foundFeature.save();

    res.status(200).json({
      message: " Feature updated successfully",
      foundFeature,
    });
  } catch (err) {
    console.error("Error updating  Feature:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const foundFeature = await Feature.findByPk(id);

    if (!foundFeature) {
      return res.status(404).json({ message: "Feature not found" });
    }

    await foundFeature.destroy();

    res.status(200).json({ message: " Feature deleted successfully" });
  } catch (err) {
    console.error("Error deleting  Feature:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createFeature,
  getAllFeature,
  updateFeature,
  deleteFeature,
};
