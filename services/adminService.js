const { User } = require("../models");
const bcrypt = require("bcrypt");

const createAdmin = async (name, email, password, phone, user_type) => {
  const existingAdmin = await User.findOne({ where: { email: email } });

  if (existingAdmin) {
    throw new Error("admin exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name: name,
    email: email,
    phone: phone,
    password: hashedPassword,
    user_type: user_type,
  });

  return admin;
};

const findAdminByEmail = async (email) => {
  const admin = await User.findOne({ where: { email: email } });
  console.log("admin", admin.name);
  return admin;
};

module.exports = { createAdmin, findAdminByEmail };
