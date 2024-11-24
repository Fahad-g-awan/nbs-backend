const { MaterialCategory } = require("../models");

const createMaterialCategory = async (req, res) => {
  const { materials } = req.body;

  try {
    const mc = materials.map((mat) => ({ material: mat }));
    const newMCs = await MaterialCategory.bulkCreate(mc);

    res.status(201).json(newMCs);
  } catch (err) {
    console.error("Error creating Material Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllMaterialCategory = async (req, res) => {
  try {
    const allMCs = await MaterialCategory.findAll();
    res.status(200).json(allMCs);
  } catch (err) {
    console.error("Error fetching Material Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateMaterialCategory = async (req, res) => {
  const { id } = req.params;
  const { materials } = req.body;

  try {
    const foundMC = await MaterialCategory.findByPk(id);

    if (!foundMC) {
      return res.status(404).json({ message: "Material Category not found" });
    }

    foundMC.material = materials;
    await foundMC.save();

    res.status(200).json({
      message: "Material Category updated successfully",
      foundMC,
    });
  } catch (err) {
    console.error("Error updating Material Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteMaterialCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const foundMC = await MaterialCategory.findByPk(id);

    if (!foundMC) {
      return res
        .status(404)
        .json({ message: "Material Category type not found" });
    }

    await foundMC.destroy();

    res
      .status(200)
      .json({ message: "Material Category type deleted successfully" });
  } catch (err) {
    console.error("Error deleting Material Category type:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createMaterialCategory,
  getAllMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
};
