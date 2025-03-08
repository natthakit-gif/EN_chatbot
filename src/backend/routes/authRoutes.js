// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");

// เริ่มกระบวนการ Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback หลังจาก Google ยืนยันตัวตนแล้ว
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req, res) => {
    // เมื่อเข้าสู่ระบบสำเร็จ redirect กลับไปที่ Front End
    res.redirect("http://localhost:3000"); // เปลี่ยน URL ตามที่คุณต้องการ
  }
);

// Logout: ออกจากระบบและ redirect กลับไปที่หน้า login
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

module.exports = router;
