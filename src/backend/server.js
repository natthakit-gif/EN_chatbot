// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// เรียกใช้การตั้งค่า Passport
require("./services/passportSetup");

const authRoutes = require("./routes/authRoutes");

const app = express();

// เชื่อมต่อ MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ตั้งค่า middleware
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// เปิดใช้งาน CORS (อนุญาตให้ Frontend เข้าถึง API)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// เริ่มต้น Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount routes สำหรับ auth
app.use("/auth", authRoutes);

// (ถ้ามี catch-all route สำหรับ static files หรือ API อื่น ๆ ให้อยู่หลัง auth routes)
app.get("*", (req, res) => {
  res.send("This is the fallback route");
});

app.listen(3001, () => console.log("Server running on port 3001"));
