import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the student
    email: { type: String, required: true, unique: true }, // Unique email address
    phoneNumber: { type: String, match: /^[0-9]{10}$/, sparse: true }, // Optional phone number validation
    password: { type: String, required: true }, // Hashed password
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }, // User role
    isVerified: { type: Boolean, default: false }, // Email verification status
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Account status
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const User = mongoose.model("user", UserSchema);