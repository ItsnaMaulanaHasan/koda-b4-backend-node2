import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import process from "process";
import { verifyPassword } from "../lib/hashPasswordArgon2.js";
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
      res.status(400).json({
        success: false,
        message: "Error validation",
        results: result.array(),
      });
      return;
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Wrong email or password",
      });
      return;
    }

    const isValidPassword = await verifyPassword(user.password, password);

    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: "Wrong email or password",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
      expiresIn: 15 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login success",
      results: {
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
    return;
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
      res.status(400).json({
        success: false,
        message: "Error validation",
        results: result.array(),
      });
      return;
    }

    const data = req.body;

    const user = await addUser(data);

    res.json({
      success: true,
      message: "Register success",
      results: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Register failed",
      error: err.message,
    });
    return;
  }
}
