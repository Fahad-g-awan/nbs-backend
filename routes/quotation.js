const { createQuotation } = require("../controllers/quotation");

const router = require("express").Router();

router.post("/quotations", createQuotation);

module.exports = router;



//     try {
//       const { user_id, cart, total } = req.body;
  
//       if (!user_id || !cart || !total) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }
  
//       let user = await User.findByPk(user_id);
  
//       if (!user) {
//         return res
//           .status(401)
//           .json({ error: "Unauthorized Access: User not found" });
//       }
  
//       const newQuotation = await Quotation.create({
//         user_id,
//         cart,
//         total,
//       });
  
//       res
//         .status(201)
//         .json({ message: "Quotation saved", quotation: newQuotation });
//     } catch (error) {
//       console.error("Error saving quotation:", error);
//       res.status(500).json({ error: "Server error" });
//     }
//   };