import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  projects: [
    {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
      role: {
        type: mongoose.Schema.Types.String,
        enum: ["MP", "TST"],
      },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
