import { Router } from "express";
import { Project } from "../mongoose/project.mjs";
import { User } from "../mongoose/user.mjs";
import { Bug } from "../mongoose/bug.mjs";
import {
  authenticate,
  authorizeRoleForProject,
} from "../utils/middlewares.mjs";
import { validationResult, checkSchema, matchedData } from "express-validator";
import {
  createProjectValidationSchema,
  createBugValidationSchema,
} from "../utils/validation-schemas.mjs";

const router = Router();

router.post(
  "/projects",
  authenticate,
  checkSchema(createProjectValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });
    const { repositoryUrl } = req.body;
    const userId = req.user.id;
    const newProject = new Project({
      repositoryUrl,
      team: [{ userId }],
    });
    try {
      const savedProject = await newProject.save();
      await User.findByIdAndUpdate(userId, {
        $push: {
          projects: { projectId: savedProject._id, role: "MP" },
        },
      });
      res.status(201).json({
        message: "Project created successfully",
        project: savedProject,
      });
    } catch (err) {
      console.error("Error creating the project: ", err);
      res
        .status(500)
        .json({ message: "An error occurred while creating the project" });
    }
  }
);

router.get("/projects", authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("projects.projectId");
    if (!user) return res.status(404).json({ message: "User not found" });
    const projects = user.projects.map((project) => ({
      projectId: project.projectId._id,
      repositoryUrl: project.projectId.repositoryUrl,
      role: project.role,
    }));
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching the projects: ", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the projects" });
  }
});

router.get("/projects/all", authenticate, async (req, res) => {
  try {
    const projects = await Project.find({}).populate(
      "team.userId",
      "email displayName"
    );
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching the projects: ", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the projects." });
  }
});

router.post("/projects/:projectId/testers", authenticate, async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    const user = await User.findById(userId);
    const existingRole = user.projects.find(
      (project) => project.projectId.toString() === projectId
    );
    if (existingRole) {
      if (existingRole.role === "MP" || existingRole.role === "TST")
        return res.status(403).json({
          message: `You are already a ${existingRole.role} of this project`,
        });
    }
    user.projects.push({ projectId, role: "TST" });
    await user.save();
    res.status(200).json({
      message: "You have been successfully added as a TST to the project",
    });
  } catch (err) {
    console.error("Error adding tester: ", err);
    res
      .status(500)
      .json({ message: "An error occurred while adding the tester" });
  }
});

router.patch(
  "/projects/:projectId",
  authenticate,
  authorizeRoleForProject("MP"),
  checkSchema(createProjectValidationSchema),
  async (req, res) => {
    const { projectId } = req.params;
    const errors = validationResult(req);
    const { repositoryUrl, team, bugs } = req.body;
    if (!repositoryUrl && !team && !bugs)
      return res.status(400).json({ message: "No fields provided to update" });
    try {
      const updateFields = {};
      const currentProject = await Project.findById(projectId);
      if (repositoryUrl) {
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        updateFields.repositoryUrl = repositoryUrl;
      }
      if (team) {
        if (!Array.isArray(team))
          return res
            .status(400)
            .json({ message: "Team field must be an array" });
        const validUsers = [];
        for (const userId of team) {
          try {
            const userExists = await User.findById(userId);
            if (!userExists)
              return res.status(404).json({
                message: `User with ID ${userId} does not exist`,
              });
            validUsers.push({ userId });
          } catch (err) {
            return res.status(400).json({ message: "Invalid user ID" });
          }
        }
        const currentTeam = currentProject.team.map((member) =>
          member.userId.toString()
        );
        const usersToAdd = team.filter(
          (userId) => !currentTeam.includes(userId)
        );
        console.log(usersToAdd);
        const usersToRemove = currentTeam.filter(
          (userId) => !team.includes(userId)
        );
        console.log(usersToRemove);
        for (const userId of usersToAdd) {
          await User.findByIdAndUpdate(userId, {
            $addToSet: { projects: { projectId, role: "MP" } },
          });
        }
        for (const userId of usersToRemove) {
          await User.findByIdAndUpdate(userId, {
            $pull: { projects: { projectId } },
          });
        }
        updateFields.team = validUsers;
      }
      if (bugs) {
        if (!Array.isArray(bugs))
          return res
            .status(400)
            .json({ message: "Bugs field must be an array" });
        const validBugs = [];
        for (const bugId of bugs) {
          try {
            const bugExists = await Bug.findById(bugId);
            if (!bugExists)
              return res
                .status(404)
                .json({ message: `Bug with ID ${bugId} does not exist` });
            validBugs.push({ bugId });
          } catch (err) {
            return res.status(400).json({ message: "Invalid bug ID" });
          }
        }
        updateFields.bugs = validBugs;
      }
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $set: updateFields },
        { new: true }
      );
      res.status(200).json({
        message: "Project updated successfully",
        project: updatedProject,
      });
    } catch (err) {
      console.error("Error updating the project: ", err);
      res
        .status(500)
        .json({ message: "An error occurred while updating the project" });
    }
  }
);

router.post(
  "/projects/:projectId/bugs",
  authenticate,
  authorizeRoleForProject("TST"),
  checkSchema(createBugValidationSchema),
  async (req, res) => {
    const { projectId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const data = matchedData(req);
    data.createdBy = req.user.id;
    if (data.assignedTo) {
      const project = await Project.findById(projectId).populate("team.userId");
      const assignedUser = project.team.find(
        (member) =>
          member.userId._id.toString() === data.assignedTo &&
          member.role === "MP"
      );
      if (!assignedUser)
        return res
          .status(400)
          .json({ message: "AssignedTo must be an MP of this project" });
    }
    const newBug = new Bug(data);
    try {
      const savedBug = await newBug.save();
      await Project.findByIdAndUpdate(projectId, {
        $push: {
          bugs: { bugId: savedBug._id },
        },
      });
      res
        .status(201)
        .json({ message: "Bug registered successfully", bug: savedBug });
    } catch (err) {
      console.error("Error registering the bug: ", err);
      res
        .status(500)
        .json({ message: "An error occurred while registering the bug" });
    }
  }
);

router.get("/projects/:projectId/bugs", authenticate, async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId).populate("bugs.bugId");
    if (!project) return res.status(404).json({ message: "Project not found" });
    const bugs = project.bugs;
    res.status(200).json({ bugs });
  } catch (err) {
    console.error("Error fetching the bugs: ", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the bugs" });
  }
});

export default router;
