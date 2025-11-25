const express = require("express");
const router = require("./src/routers");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/", router);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running well",
  });
});

app.listen(8080, () => {
  console.log("App running on http://localhost:8080");
});
