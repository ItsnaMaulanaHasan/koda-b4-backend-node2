import { MulterError } from "multer";
import { env } from "node:process";
import convertBigInt from "../lib/convertBigInt.js";
import upload from "../lib/upload.js";
import {
  addDataProduct,
  deleteProductById,
  getListProducts,
  getProductsById,
  getTotalDataProducts,
  updateProductById,
} from "../models/products.model.js";

/**
 * GET /products
 * @summary Get list all of products
 * @tags products
 * @param  {string} search.query     - search by name of product
 * @param  {string} sortname.query   - sort by name of product - enum:asc,desc
 * @param  {string} sortprice.query  - sort by price of product - enum: asc,desc
 * @param  {number} page.query       - page of list products
 * @param  {number} limit.query      - limit of list products per page
 * @return {object} 200 - success get list all of products
 */
export async function listProducts(req, res) {
  try {
    const { search = "", sortname = "", sortprice = "" } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const totalData = await getTotalDataProducts(search);
    const list = await getListProducts(
      search,
      sortname,
      sortprice,
      page,
      limit
    );

    res.json({
      success: true,
      message: "Success get list products",
      results: {
        data: convertBigInt(list),
        meta: {
          page,
          limit,
          totalData,
          totalPage: Math.ceil(totalData / limit),
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * GET /products/{id}
 * @summary Get detail product by id
 * @tags products
 * @param {number} id.path - id product
 * @return {object} 200 - success get detail of product
 * @return {object} 404 - product not found
 */
export async function detailProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductsById(Number(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Success get detail product",
      results: convertBigInt(product),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * POST /products
 * @summary Create product
 * @tags products
 * @param {string} name.form.required - This is the name of product - application/x-www-form-urlencoded
 * @param {number} price.form.required - This is the price of product - application/x-www-form-urlencoded
 * @return {object} 201 - product added successfully
 */
export async function addProduct(req, res) {
  try {
    const data = req.body;
    console.log(data);
    const created = await addDataProduct(data);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      results: convertBigInt(created),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
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
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await updateProductById(Number(id), data);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      result: convertBigInt(updated),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * DELETE /products/{id}
 * @summary Delete product
 * @tags products
 * @param {number} id.path - id product to delete
 * @return {object} 200 - product updated successfully
 * @return {object} 404 - product not found
 */
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const success = await deleteProductById(Number(id));

    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * POST /products/{id}/image
 * @summary Upload image product
 * @tags    products
 * @param   {number} id.path - id product
 * @param   {file} fileImage.form - This is the file image of product - application/x-www-form-urlencoded
 * @return  {object} 200 - product updated successfully
 * @return  {object} 404 - product not found
 */
export function uploadProductImage(req, res) {
  const { id } = req.params;

  upload.single("fileImage")(req, res, async function (err) {
    try {
      const product = await getProductsById(Number(id));
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (err instanceof MulterError) {
        return res.json({ success: false, message: err.message });
      } else if (err) {
        return res.json({ success: false, message: err.message });
      }

      if (!req.file) {
        return res.json({
          success: false,
          message: "File is required",
        });
      }

      const updated = await updateProductById(Number(id), {
        image: env.BASE_UPLOAD_URL + req.file.filename,
      });

      res.json({
        success: true,
        message: "File uploaded successfully",
        results: updated,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
}
