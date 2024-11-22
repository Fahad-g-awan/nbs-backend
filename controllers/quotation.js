const { User, Quotation } = require("../models");

const createQuotation = async (req, res) => {
  try {
    const { user_id, cart, total } = req.body;

    if (!user_id || !cart || !total) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("cart", cart);

    let user = await User.findByPk(user_id);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized Access: User not found" });
    }

    console.log("JSON.stringify(cart)", JSON.stringify(cart));

    const newQuotation = await Quotation.create({
      user_id,
      user_name: user.name,
      user_email: user.email,
      user_phone: user.phone,
      data: JSON.stringify(cart),
      total,
    });

    let quotation = {
      data: JSON.parse(newQuotation.data),
      id: newQuotation.id,
      total: newQuotation.total,
      email: newQuotation.user_email,
      id: newQuotation.user_id,
      name: newQuotation.user_name,
      phone: newQuotation.user_phone,
    };

    res.status(201).json({ message: "Quotation saved", quotation: quotation });
  } catch (error) {
    console.error("Error saving quotation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createQuotation };
