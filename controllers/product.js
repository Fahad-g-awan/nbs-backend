const { Product } = require("../models");

// const createProduct = async (req, res) => {
//   let { name, description, price, metadata } = req.body;
//   metadata = JSON.parse(metadata);
//   console.log("metadata", metadata);

//   try {
//     const img_urls = req.files ? req.files.map((file) => file.path) : [];

//     const newProduct = await Product.create({
//       image_url: img_urls,
//       name,
//       description,
//       price,
//       metadata: metadata,
//     });
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

const createProduct = async (req, res) => {
  let { name, description, price, metadata } = req.body;

  try {
    // Parse metadata only if it's a string
    if (typeof metadata === "string") {
      metadata = JSON.parse(metadata);
    }

    console.log("metadata after parsing:", metadata); // Log metadata to check it

    // Process image URLs if files are present
    const img_urls = req.files ? req.files.map((file) => file.path) : [];

    // Create the new product
    const newProduct = await Product.create({
      image_url: img_urls,
      name,
      description,
      price,
      metadata, // metadata is expected to be an object
    });

    // Return the newly created product
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
      stack: err.stack, // Optionally include stack trace for debugging
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Use Sequelize to fetch all products
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { img_url, name, description, price } = req.body;

//   try {
//     // Find the product by ID
//     const product = await Product.findByPk(id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Update the product fields
//     product.img_url = img_url;
//     product.name = name;
//     product.description = description;
//     product.price = price;

//     // Save the updated product
//     await product.save();

//     res.status(200).json({ message: "Product updated successfully", product });
//   } catch (err) {
//     console.error("Error updating product:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, metadata } = req.body;
  const img_urls = req.files ? req.files.map((file) => file.path) : [];

  try {
    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.metadata = JSON.parse(metadata); // If metadata is being updated
    if (img_urls.length > 0) {
      product.img_url = img_urls; // Update image URLs if new images are provided
    }

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

// metadata = {
//   make: 2024,
//   color: "black,brown",
//   materialCategory: [
//     { id: 1, material: "Wooden" },
//     { id: 2, material: "Leather" },
//   ],
//   features: [
//     {
//       id: 1,
//       feature: "Adjustable",
//     },
//     {
//       id: 3,
//       feature: "Ergonomic",
//     },
//   ],
//   category: {
//     id: 1,
//     category: "chair",
//     sub_categories: ["Office Chair", "Dinning Chair"],
//   },
//   spaceAssociations: [
//     { id: 4, type: "Bedroom" },
//     { id: 6, type: "Kid's Room" },
//   ],
//   style: [
//     { id: 1, style: "Modern" },
//     { id: 5, style: "Industerial" },
//     { id: 7, style: "Minimalist" },
//   ],
// };
