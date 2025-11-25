const { Router } = require("express");
const authRouter = require("./auth.router");
const productsRouter = require("./products.router");

const router = Router();

router.use("/", authRouter);
router.use("/", productsRouter);

module.exports = router;
