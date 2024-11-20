const { User } = require("../models");
const bcrypt = require("bcrypt");

const createAdmin = async (name, email, password, phone, user_type) => {
  const existingAdmin = await User.findOne({
    where: {
      email: email,
    },
  });
  const existAdmin = await User.findOne({
    where: {
      user_type: "admin", // Add user_type condition
    },
  });

  if (existingAdmin) {
    throw new Error(" user exist");
  }
  if (existAdmin) {
    throw new Error("admin exist"); // Add user_type condition for existing admin.  This condition is optional.  If not added, it will create new admin with same user_type as existing admin.  If added, it will throw an error.  This is just an example.  You can modify the condition as per your requirements.  For example, you can add a condition to check if the admin is already in the system, or if the user_type is different from the existing admin's user_type.  You can also add a condition to check if the admin's phone number is already in use.  This would require querying the database for the phone number and checking if it exists.  However, please note that these are just examples and you may need to modify them based on your specific requirements.  For example, you can add additional conditions to check for other unique fields like name, email, or phone number.
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
  const admin = await User.findOne({
    where: {
      email: email,
    },
  });

  console.log("admin", admin.name);
  return admin;
};

module.exports = { createAdmin, findAdminByEmail };
