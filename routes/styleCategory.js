const {
  createStyleCategory,
  updateStyleCategory,
  deleteStyleCategory,
  getAllStyleCategory,
} = require("../controllers/styleCategory");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

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
router.post("/style-category", verifyToken, createStyleCategory);
router.put("/style-category/:id", verifyToken, updateStyleCategory);
router.delete("/style-category/:id", verifyToken, deleteStyleCategory);
router.get("/style-category", getAllStyleCategory);

module.exports = router;
