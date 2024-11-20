const { SpaceAssociation } = require("../models");

const createSA = async (req, res) => {
  const { type } = req.body;

  try {
    const associations = type.map((t) => ({ type: t }));
    const newSAs = await SpaceAssociation.bulkCreate(associations);

    res.status(201).json(newSAs);
  } catch (err) {
    console.error("Error creating SpaceAssociation:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getAllSA = async (req, res) => {
  try {
    const allnewSA = await SpaceAssociation.findAll();
    res.status(200).json(allnewSA);
  } catch (err) {
    console.error("Error fetching SpaceAssociation:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateSA = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const foundSA = await SpaceAssociation.findByPk(id);

    if (!foundSA) {
      return res
        .status(404)
        .json({ message: "Space Association type not found" });
    }

    foundSA.type = type;
    await foundSA.save();

    res.status(200).json({
      message: "Space Association type updated successfully",
      foundSA,
    });
  } catch (err) {
    console.error("Error updating Space Association type:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteSA = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const foundSA = await SpaceAssociation.findByPk(id);

    if (!foundSA) {
      return res
        .status(404)
        .json({ message: "Space Association type not found" });
    }

    await foundSA.destroy();

    res
      .status(200)
      .json({ message: "Space Association type deleted successfully" });
  } catch (err) {
    console.error("Error deleting Space Association type:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createSA,
  getAllSA,
  updateSA,
  deleteSA,
};
