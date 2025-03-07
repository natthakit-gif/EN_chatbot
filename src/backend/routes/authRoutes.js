// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// เริ่มกระบวนการ Google OAuth
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback หลังจาก Google ยืนยันตัวตน
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login-failed" }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:3000");
    });
});

module.exports = router;
