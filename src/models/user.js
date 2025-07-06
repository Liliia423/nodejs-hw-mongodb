import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Invalid email'],
    },
    password: { type: String, required: true, minlength: 6 },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;
