// backend/models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String
});

module.exports = mongoose.model("User", userSchema);
