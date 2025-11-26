import { validationResult } from "express-validator";
import { addUser, getUserByEmail } from "../models/users.model.js";

/**
 * POST /auth/login
 * @summary Login user
 * @tags authentication
 * @param  {string} email.form.required - Email of user - application/x-www-form-urlencoded
 * @param  {string} password.form.required - Password of user - application/x-www-form-urlencoded
 * @return {object} 200 - login success
 * @return {object} 401 - wrong email or password
 */
export async function login(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Error validation",
        results: result.array(),
      });
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password",
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Wrong email or password",
      });
    }

    return res.json({
      success: true,
      message: "Login success",
      results: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
}

/**
 * POST /auth/register
 * @summary Register user
 * @tags authentication
 * @param  {string} fullName.form.required - fullname of user - application/x-www-form-urlencoded
 * @param  {string} email.form.required - Email of user - application/x-www-form-urlencoded
 * @param  {string} password.form.required - Password of user - application/x-www-form-urlencoded
 * @return {object} 200 - login success
 */
export async function register(req, res) {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Error validation",
        results: result.array(),
      });
    }

    const data = req.body;

    const user = await addUser(data);

    return res.json({
      success: true,
      message: "Register success",
      results: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Register failed",
      error: err.message,
    });
  }
}
