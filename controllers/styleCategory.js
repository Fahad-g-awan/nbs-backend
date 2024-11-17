const { StyleCategory } = require("../models");

const createStyleCategory = async (req, res) => {
  const { styles = [] } = req.body;

  try {
    const stylesMap = styles.map((style) => ({ style: style }));
    const newStyles = await StyleCategory.bulkCreate(stylesMap);

    res.status(201).json(newStyles);
  } catch (err) {
    console.error("Style Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllStyleCategory = async (req, res) => {
  try {
    const allStyles = await StyleCategory.findAll();
    res.status(200).json(allStyles);
  } catch (err) {
    console.error("Stle Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateStyleCategory = async (req, res) => {
  const { id } = req.params;
  const { style } = req.body;

  try {
    const foundStyle = await StyleCategory.findByPk(id);

    if (!foundStyle) {
      return res.status(404).json({ message: "Feature not found" });
    }

    foundStyle.style = style;
    await foundStyle.save();

    res.status(200).json({
      message: "Style updated successfully",
      foundStyle,
    });
  } catch (err) {
    console.error("Error updating  Feature:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteStyleCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const foundStyle = await StyleCategory.findByPk(id);

    if (!foundStyle) {
      return res.status(404).json({ message: "Style not found" });
    }

    await foundStyle.destroy();

    res.status(200).json({ message: " Style deleted successfully" });
  } catch (err) {
    console.error("Error deleting  Style:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createStyleCategory,
  getAllStyleCategory,
  updateStyleCategory,
  deleteStyleCategory,
};
