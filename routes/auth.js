const { signup, signin } = require("../controllers/auth");

const router = require("express").Router();

router.post("/create", signup);
router.post("/signin", signin);

module.exports = router;
