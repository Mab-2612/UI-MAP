const User = require("../models/User"); // Adjust path to your User model
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// --- 1. SIGN UP WITH CONFIRMATION ---
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create user (but set verified to false)
    const newUser = await User.create({
      name,
      email,
      password,
      isVerified: false, // Add this field to your User Schema
      emailToken: crypto.randomBytes(32).toString("hex"), // Generate random token
    });

    // Create Verification Link
    // Change 'localhost:5173' to your frontend URL
    const confirmLink = `http://localhost:5173/confirm-email/${newUser.emailToken}`;

    // Send Email
    const message = `
      <h1>Welcome to UI Navigator!</h1>
      <p>Please click the link below to verify your account:</p>
      <a href="${confirmLink}" style="padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
    `;

    await sendEmail({
      email: newUser.email,
      subject: "Confirm your UI Navigator Account",
      message,
    });

    res.status(201).json({
      status: "success",
      message: "Account created! Please check your email to verify.",
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// --- 2. FORGOT PASSWORD ---
exports.forgotPassword = async (req, res) => {
  try {
    // 1. Get user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "No user found with that email" });
    }

    // 2. Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes valid
    await user.save({ validateBeforeSave: false });

    // 3. Send Email
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password. It is valid for 10 minutes.</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Your Password (UI Navigator)",
        message,
      });

      res.status(200).json({ status: "success", message: "Reset link sent to email!" });
    } catch (err) {
      // If email fails, reset the token fields so user can try again
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ error: "Email could not be sent. Try again." });
    }

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};