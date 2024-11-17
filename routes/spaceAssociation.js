const {
  createSA,
  getAllSA,
  updateSA,
  deleteSA,
} = require("../controllers/spaceAssociation");
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
router.post("/space-association", verifyToken, createSA);
router.put("/space-association/:id", verifyToken, updateSA);
router.delete("/space-association/:id", verifyToken, deleteSA);
router.get("/space-association", getAllSA);

module.exports = router;
