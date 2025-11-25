const express = require("express");
const productsController = require("../controllers/products.controller");

const router = express();

router.get("/products", productsController.listProducts);
router.get("/products/:id", productsController.detailProduct);
router.post("/products", productsController.addProduct);
router.patch("/products/:id", productsController.updateProduct);
router.delete("/products/:id", productsController.deleteProduct);
router.post("/products/:id/image", productsController.uploadProductImage);

module.exports = router;
