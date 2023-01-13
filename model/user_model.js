import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last name"],
  },
  batch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
  ],
  // course: {
  //     type: Array
  // },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],

  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
  },
  avatar: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Please enter password"],
    maxLength: [8, "Password must be at least 8 characters"],
    select: false,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Add Token
UserSchema.methods.getSignedJwtToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", UserSchema);
