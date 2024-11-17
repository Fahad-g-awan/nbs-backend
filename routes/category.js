const {
  createCategory,
  getAllCategories,
  updateCategories,
  deleteCategory,
} = require("../controllers/category");
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
router.post("/category", verifyToken, createCategory);
router.put("/category/:id", verifyToken, updateCategories);
router.delete("/category/:id", verifyToken, deleteCategory);
router.get("/category", getAllCategories);

module.exports = router;
