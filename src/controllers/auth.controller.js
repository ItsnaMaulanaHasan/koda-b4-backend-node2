const authModel = require("../models/users.model");

function login(req, res) {
  const { email, password } = req.body;
  const data = authModel.getUserByEmail(email);

  if (!data || data.password !== password) {
    res.status(400).json({
      success: false,
      message: "Wrong email or password",
    });
    return;
  }

  res.json({
    success: true,
    message: "Login success",
  });
}

function register(req, res) {
  const data = req.body;
  authModel.addUser(data);

  res.json({
    success: true,
    message: "Register success",
  });
}

module.exports = {
  login,
  register,
};
