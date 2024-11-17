const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { upload } = require("../config/cloudinary");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

// Middleware to verify JWT for admin access
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Failed to authenticate token");
    req.userId = decoded.id;

    next();
  });
};

// Routes
router.post("/products", verifyToken, upload.array("images", 5), createProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/products", getAllProducts);

module.exports = router;
