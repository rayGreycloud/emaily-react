const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Load userSchema into mongoose
mongoose.model("users", userSchema);
