const { Category } = require("../models");

const createCategory = async (req, res) => {
  const { category, sub_categories } = req.body;

  try {
    const newCategory = await Category.create({
      category,
      sub_categories,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error creating newCategory:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allnewCategories = await Category.findAll();
    res.status(200).json(allnewCategories);
  } catch (err) {
    console.error("Error fetching Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCategories = async (req, res) => {
  const { id } = req.params;
  const { category, sub_categories } = req.body;

  try {
    const foundCategory = await Category.findByPk(id);

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    foundCategory.category = category;
    foundCategory.category = category;

    await foundCategory.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", foundCategory });
  } catch (err) {
    console.error("Error updating Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const foundCategory = await Category.findByPk(id);

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await foundCategory.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting Category:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategories,
  deleteCategory,
};
