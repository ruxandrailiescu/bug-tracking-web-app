import { verifyToken } from "./helpers.mjs";
import { User } from "../mongoose/user.mjs";
import { Project } from "../mongoose/project.mjs";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authorizeRoleForProject =
  (requiredRole) => async (req, res, next) => {
    try {
      const { projectId } = req.params;
      try {
        const findProject = await Project.findById(projectId);
      } catch (err) {
        return res.status(404).json({ message: "Project not found" });
      }
      const userId = req.user.id;
      const user = await User.findById(userId).populate("projects.projectId");
      if (!user) return res.status(404).json({ message: "User not found" });
      const projectRole = user.projects.find(
        (project) => project.projectId._id.toString() === projectId
      );
      if (!projectRole) {
        return res
          .status(403)
          .json({ message: "Access denied. No role in this project." });
      }
      if (projectRole.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: `Access denied. Required role: ${requiredRole}` });
      }
      next();
    } catch (err) {
      console.error("Authorization error: ", err);
      res
        .status(500)
        .json({ message: "An error occurred during role authorization" });
    }
  };

export const authorizeRoleForBug = (requiredRole) => async (req, res, next) => {
  try {
    const { bugId } = req.params;
    const userId = req.user.id;
    try {
      const project = await Project.findOne({ "bugs.bugId": bugId });
      const user = await User.findById(userId);
      const userProject = user.projects.find(
        (projectInfo) =>
          projectInfo.projectId.toString() === project._id.toString()
      );
      if (!userProject) {
        return res
          .status(403)
          .json({
            message: "Access denied. You are not part of this project.",
          });
      }
      if (userProject.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: `Access denied. Required role: ${requiredRole}` });
      }
      next();
    } catch (err) {
      return res
        .status(404)
        .json({ message: "Project not found for this bug" });
    }
  } catch (err) {
    console.error("Authorization error: ", err);
    res
      .status(500)
      .json({ message: "An error occurred during role authorization" });
  }
};
