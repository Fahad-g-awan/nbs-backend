// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const materialCategoryRouter = require("./routes/materialCategory");
const spaceAssociationRouter = require("./routes/spaceAssociation");
const styleCategoryRouter = require("./routes/styleCategory");
const quotationRouter = require("./routes/quotation");
const categoryRouter = require("./routes/category");
const featureRouter = require("./routes/feature");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const userRouter = require("./routes/user");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/admin", authRoute);

app.use("/api", spaceAssociationRouter);
app.use("/api", materialCategoryRouter);
app.use("/api", styleCategoryRouter);
app.use("/api", quotationRouter);
app.use("/api", categoryRouter);
app.use("/api", featureRouter);
app.use("/api", productRoute);
app.use("/api", userRouter);
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));
