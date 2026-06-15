import mongoose from "mongoose";
import {IUser} from "../types/user.types";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      githubUsername: {
        type: String,
      },

      leetcodeUsername: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export const User = mongoose.model("User", userSchema);