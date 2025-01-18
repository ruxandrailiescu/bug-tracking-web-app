import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validation-schemas.mjs";
import { User } from "../mongoose/user.mjs";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/helpers.mjs";
import { authenticate } from "../utils/middlewares.mjs";

const router = Router();

router.post(
  "/users/register",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json(result.array());
    const data = matchedData(req);
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      const { password, ...user } = savedUser.toObject();
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    } catch (err) {
      console.error("Error during registration: ", err);
      if (err.code === 11000) {
        return res.status(409).json({ message: "Email already in use" });
      }
      return res
        .status(500)
        .json({ message: "An error occurred during registration" });
    }
  }
);

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error finding the user: ", err);
    return res.status(500).json({ message: "An error occurred during login" });
  }
});

router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching users." });
  }
});

export default router;
