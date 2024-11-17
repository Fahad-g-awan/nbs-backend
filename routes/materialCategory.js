const {
  createMaterialCategory,
  getAllMaterialCategory,
  updateMaterialCategory,
  deleteMaterialCategory,
} = require("../controllers/materialCategory");
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
router.post("/material-category", verifyToken, createMaterialCategory);
router.put("/material-category/:id", verifyToken, updateMaterialCategory);
router.delete("/material-category/:id", verifyToken, deleteMaterialCategory);
router.get("/material-category", getAllMaterialCategory);

module.exports = router;
