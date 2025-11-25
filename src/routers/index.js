const express = require("express");
const authRouter = require("./auth.router");
const productsRouter = require("./products.router");
const path = require("node:path");
const process = require("node:process");

const router = express.Router();

router.use("/", authRouter);
router.use("/", productsRouter);
router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

module.exports = router;
