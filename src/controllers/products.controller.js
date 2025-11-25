const productsModel = require("../models/products.model");

/**
 * GET /products
 * @summary Get list all of products
 * @tags products
 * @param {string} search.query   - search by name of product
 * @param {string} sortname.query - sort by name of product - enum:asc,desc
 * @param {string} sortprice.query - sort by price of product - enum: asc,desc
 * @return {object} 200 - success get list all of products
 */
function listProducts(req, res) {
  const { search = "", sortname = "", sortprice = "" } = req.query;
  const listProducts = productsModel.getListProducts(
    search,
    sortname,
    sortprice
  );

  res.json({
    success: true,
    message: "Success get list products",
    results: listProducts,
  });
}

/**
 * GET /products/{id}
 * @summary Get detail product by id
 * @tags products
 * @param {number} id.path - id product
 * @return {object} 200 - success get detail of product
 * @return {object} 404 - product not found
 */
function detailProduct(req, res) {
  const { id } = req.params;
  const product = productsModel.getProductsById(parseInt(id));

  if (!product) {
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

/**
 * POST /products
 * @summary Create product
 * @tags products
 * @param {string} name.form.required - This is the name of product - application/x-www-form-urlencoded
 * @param {number} price.form.required - This is the price of product - application/x-www-form-urlencoded
 * @return {object} 201 - product added successfully
 */
function addProduct(req, res) {
  const data = req.body;
  productsModel.addDataProduct(data);

  res.status(201).json({
    success: true,
    message: "Product added successfully",
  });
}

/**
 * PATCH /products/{id}
 * @summary Update product
 * @tags products
 * @param {number} id.path - id product
 * @param {string} name.form - This is the name of product - application/x-www-form-urlencoded
 * @param {number} price.form.optional - This is the price of product - application/x-www-form-urlencoded
 * @return {object} 200 - product updated successfully
 * @return {object} 404 - product not found
 */
function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;

  const updatedProduct = productsModel.updateProductById(parseInt(id), data);

  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product updated successfully",
  });
}

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags products
 * @param {number} id.path - id product to delete
 * @return {object} 200 - product updated successfully
 * @return {object} 404 - product not found
 */
function deleteProduct(req, res) {
  const { id } = req.params;
  const isSuccess = productsModel.deleteProductById(parseInt(id));

  if (!isSuccess) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

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
