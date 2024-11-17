const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const { email, name, phone, user_type } = req.body;

    if (!email || !phone || !name || !user_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    let oldUser = await User.findOne({ where: { email: email } });
    console.log("user exist", oldUser);

    if (oldUser) {
      return res
        .status(409)
        .json({ error: "User already exist with this email" });
    }

    const newUser = await User.create({
      email: email,
      name: name,
      phone: phone,
      user_type: user_type,
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createUser };
