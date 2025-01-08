import mongoose from "mongoose";

const BugSchema = new mongoose.Schema({
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  severity: {
    type: mongoose.Schema.Types.String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  priority: {
    type: mongoose.Schema.Types.String,
    enum: ["Low", "High", "Immediate"],
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.String,
    enum: ["Open", "In progress", "Resolved"],
    default: "Open",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commit: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const Bug = mongoose.model("Bug", BugSchema);
