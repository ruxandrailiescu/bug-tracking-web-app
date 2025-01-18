import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  repositoryUrl: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  team: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  bugs: [
    {
      bugId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bug",
      },
    },
  ],
});

export const Project = mongoose.model("Project", ProjectSchema);
