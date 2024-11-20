const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { createAdmin, findAdminByEmail } = require("../services/adminService");

const signup = async (req, res) => {
  const { name, email, password, phone, user_type } = req.body;

  try {
    /**
     * Ansar add here validations for req body
     */
    // Manual validations
    //  if (!name || typeof name !== "string") {
    //   return res.status(400).json({ message: "Name is required and must be a string." });
    // }
    // if (!email || !email.includes("@")) {
    //   return res.status(400).json({ message: "Valid email is required." });
    // }
    // if (!password || password.length < 6) {
    //   return res.status(400).json({ message: "Password must be at least 6 characters long." });
    // }
    // if (!phone || !/^\d+$/.test(phone)) {
    //   return res.status(400).json({ message: "Phone number must be numeric." });
    // }
    // if (!user_type || !["admin", "user"].includes(user_type)) {
    //   return res.status(400).json({ message: "User type must be 'admin' or 'user'." });
    // }
    const admin = await createAdmin(name, email, password, phone, user_type);

    res.status(200).json({
      message: "Admin created successfully",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    if (error.message === "admin exist") {
      res.status(409).json({ message: "admin is already exist" });
    } else if (error.message === "user exist") {
      res
        .status(409)
        .json({ message: " User already exists with the given credentials." });
    } else {
      res
        .status(500)
        .json({ message: "Error creating admin", error: error.message });
    }
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await findAdminByEmail(email);

    if (!admin || !admin.password) {
      return res.status(404).json({ message: "Unauthorized Access" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("isMatch", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Unauthorized Access: Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name, email: admin.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Signin successful",
      data: {
        token,
        user: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
};

module.exports = { signup, signin };
