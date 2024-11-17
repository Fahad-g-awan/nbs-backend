const { createUser } = require("../controllers/user");

const router = require("express").Router();

router.post("/user", createUser);

module.exports = router;
