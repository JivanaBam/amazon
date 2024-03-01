import express from "express";
import connectDB from "./connect.db.js";
import productRoutes from "./product/product.routes.js";
import sellerRoutes from "./seller/seller.routes.js";

const app = express();

//to make app understand json

app.use(express.json());

//=======database connection=====
connectDB();
//=======register routes=========
app.use(productRoutes);
app.use(sellerRoutes);
//========port and server========

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
