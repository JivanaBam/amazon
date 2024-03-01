import express from "express";
import Seller from "./seller.model.js";

const router = express.Router();

router.post("/seller/add", async (req, res) => {
  // extract new seller from req.body
  const newUser = req.body;

  // find user with new email
  const user = await Seller.findOne({ email: newUser.email });

  // if user, throw error
  if (user) {
    return res.status(409).send({ message: "Email user already exist" });
  }

  // insert new seller to database
  await Seller.create(newUser);

  // send response
  return res.status(200).send({ Message: "Seller added successfully" });
});

// list seller
router.get("/seller/list", async (req, res) => {
  // extract pagination data from req.body
  const { page, limit } = req.body;

  // calculate skip

  const skip = (page - 1) * limit;

  const sellerList = await Seller.aggregate([
    { $match: {} },
    {
      $skip: skip,
    },

    {
      $limit: limit,
    },
  ]);

  return res.status(200).send({ message: "success", sellers: sellerList });
});

export default router;
