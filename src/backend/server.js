// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./services/passportSetup");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

mongoose
    .connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
