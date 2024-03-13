import express from "express";
import Product from "./product.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;

  // add new product to db
  await Product.create(newProduct);

  // send response
  return res.status(201).send({ message: "Product is added successfully." });
});

//? get product list

router.get("/product/list", async (req, res) => {
  const productList = await Product.find();
  return res.status(201).send({ message: "success", Product: productList });
});

//? get product details by _id

router.get("/product/details/:id", async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  //valid for mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  //if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product deos not exist." });
  }

  // send response
  return res
    .status(201)
    .send({ message: "Success", productDetails: requiredProduct });
});

//? delete product by _id

router.delete("/product/delete/:id", async (req, res) => {
  // extarct product from req.params
  const productId = req.params.id;

  // valid for mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  //if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // delete product
  await Product.deleteOne({ _id: productId });

  // send response
  return res.status(201).send({ message: "Product is deleted successfully." });
});

//? edit Product
router.put("/product/edit/:id", async (req, res) => {
  //extract productId from req.params
  const productId = req.params.id;

  // check for valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo Id." });
  }

  // find product by id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // get new values from req.body
  const newProduct = req.body;

  // edit product
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        expiryDate: newProduct.expiryDate,
        freeshipping: newProduct.freeshipping,
        brand: newProduct.brand,
        quantity: newProduct.quantity,
      },
    }
  );

  //send response
  return res.status(201).send({ message: "Product is updated successfully." });
});

export default router;
