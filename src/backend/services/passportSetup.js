// backend/services/passportSetup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../models/User");

// กำหนด serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ตั้งค่า Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:3001/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ค้นหาผู้ใช้ในฐานข้อมูลด้วย googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }
        // ถ้าไม่พบ ให้สร้างผู้ใช้ใหม่
        user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        }).save();
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
