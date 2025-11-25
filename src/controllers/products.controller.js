const productsModel = require("../models/products.model");

function listProducts(req, res) {
  const { search } = req.query;
  const listProducts = productsModel.getListProducts(search);

  res.json({
    success: true,
    message: "Success get list products",
    results: listProducts,
  });
}

function detailProduct(req, res) {
  const { id } = req.params;
  const product = productsModel.getProductsById(parseInt(id));

  if (product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  res.json({
    success: true,
    message: "Success get detail product",
    results: product,
  });
}

function addProduct(req, res) {
  const data = req.body;
  productsModel.addDataProduct(data);

  res.json({
    success: true,
    message: "Success add data product",
  });
}

function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  productsModel.updateProductById(parseInt(id), data);

  res.json({
    success: true,
    message: "Product updated successfully",
  });
}

function deleteProduct(req, res) {
  const { id } = req.params;
  productsModel.deleteProductById(parseInt(id));

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
}

module.exports = {
  listProducts,
  detailProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
