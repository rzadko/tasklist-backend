import { Router } from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
} from "../controllers/taskController";

const router: Router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.put("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;
