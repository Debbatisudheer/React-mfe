const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const rateLimit = require("express-rate-limit");


// ✅ Validation schema for Register
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

// ✅ Validation schema for Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ✅ Rate limiter ↓ (max 5 calls / minute per IP)
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: "Too many login attempts, try again after 1 minute." },
});


// ===========================
// ✅ Register User
// ===========================
router.post("/register", async (req, res) => {
  try {
    // ✅ Validate user input
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    // ✅ Check if email already exists
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(409).json({ error: "Email already exists" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "✅ User registered successfully" });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// ===========================
// ✅ Login User
// ===========================
router.post("/login", loginLimiter, async (req, res) => {
  try {
    // ✅ Validate input
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Don't send password back
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({
      message: "✅ Login successful",
      token,
      user: userResponse,
    });

  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
