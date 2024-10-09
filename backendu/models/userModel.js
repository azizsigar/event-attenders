import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email uniqueness
    lowercase: true, // Ensures email is stored in lowercase
    trim: true, // Removes whitespace from both ends
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
