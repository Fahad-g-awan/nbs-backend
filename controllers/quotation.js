const { User, Quotation } = require("../models");

const createQuotation = async (req, res) => {
  try {
    const { user_id, cart, total } = req.body;

    if (!user_name || !user_phone || !user_email || !cart || !total) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findByPk(user_id);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized Access: User not found" });
    }

    const newQuotation = await Quotation.create({
      user_id,
      user_name: user.name,
      user_email: user.email,
      user_phone: user.phone,
      cart,
      total,
    });

    res
      .status(201)
      .json({ message: "Quotation saved", quotation: newQuotation });
  } catch (error) {
    console.error("Error saving quotation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createQuotation };
