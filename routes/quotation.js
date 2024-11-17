const { createQuotation } = require("../controllers/quotation");

const router = require("express").Router();

router.post("/quotations", createQuotation);

module.exports = router;
