// services/passportSetup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// สำหรับตัวอย่างนี้เก็บข้อมูลผู้ใช้ในหน่วยความจำ (in-memory)
let users = [];

// ฟังก์ชันค้นหาหรือสร้างผู้ใช้
function findOrCreateUser(profile) {
  let user = users.find(u => u.googleId === profile.id);
  if (!user) {
    user = {
      id: (Math.random() + 1).toString(36).substring(7),
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value
    };
    users.push(user);
  }
  return user;
}

// ตั้งค่า serialize และ deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || null);
});

// ตั้งค่า Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" // ตรวจสอบให้ตรงกับ Authorized Redirect URI ใน Google Cloud Console
    },
    (accessToken, refreshToken, profile, done) => {
      const user = findOrCreateUser(profile);
      return done(null, user);
    }
  )
);
