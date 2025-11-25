const express = require("express");
const router = require("./src/routers");
const initDocs = require("./src/lib/docs");

const app = express();

initDocs(app);

app.use(express.urlencoded());
app.use(express.json());

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
