import { Router } from "express";
import { Bug } from "../mongoose/bug.mjs";
import { Project } from "../mongoose/project.mjs";
import { authenticate, authorizeRoleForBug } from "../utils/middlewares.mjs";
import { updateBugStatusValidationSchema } from "../utils/validation-schemas.mjs";
import { checkSchema, validationResult } from "express-validator";

const router = Router();

router.post(
  "/bugs/:bugId/assign",
  authenticate,
  authorizeRoleForBug("MP"),
  async (req, res) => {
    const userId = req.user.id;
    const { bugId } = req.params;
    try {
      const bug = await Bug.findById(bugId);
      bug.assignedTo = userId;
      try {
        await bug.save();
      } catch (err) {
        return res
          .status(500)
          .json({ message: "An error occurred during saving" });
      }
    } catch (err) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res
      .status(200)
      .json({ message: `Bug assigned successfully to MP with ID ${userId}` });
  }
);

router.patch(
  "/bugs/:bugId/status",
  authenticate,
  authorizeRoleForBug("MP"),
  checkSchema(updateBugStatusValidationSchema),
  async (req, res) => {
    const { bugId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { status } = req.body;
    try {
      const bug = await Bug.findById(bugId);
      bug.status = status;
      try {
        await bug.save();
      } catch (err) {
        return res
          .status(500)
          .json({ message: "An error occurred during saving" });
      }
    } catch (err) {
      return res.status(404).json({ message: "Bug not found" });
    }
    res.status(200).json({ message: "Bug status updated successfully" });
  }
);

router.delete(
  "/bugs/:bugId",
  authenticate,
  authorizeRoleForBug("MP"),
  async (req, res) => {
    const { bugId } = req.params;
    try {
      const bug = await Bug.findById(bugId);
      try {
        await Bug.findByIdAndDelete(bugId);
        await Project.updateOne(
          { "bugs.bugId": bugId },
          { $pull: { bugs: { bugId } } }
        );
        res.status(200).json({ message: "Bug deleted successfully" });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "An error occurred during deletion" });
      }
    } catch (err) {
      return res.status(404).json({ message: "Bug not found" });
    }
  }
);

export default router;
