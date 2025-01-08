import { Router } from "express";
import usersRouter from "./users.mjs";
import projectsRouter from "./projects.mjs";
import bugsRouter from "./bugs.mjs";

const router = Router();

router.use(usersRouter);
router.use(projectsRouter);
router.use(bugsRouter);

export default router;
