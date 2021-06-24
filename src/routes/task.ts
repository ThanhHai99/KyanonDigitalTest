import { Router } from "express";
import TaskController from "../controller/TaskController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Get all task
router.get("/", [checkJwt], TaskController.listAll);

// Get a task by id
router.get("/:id([0-9]+)", [checkJwt], TaskController.getOneById);

//Create a new task
router.post("/", [checkJwt],TaskController.newTask);

// Update a task
router.patch("/:id([0-9]+)", [checkJwt], TaskController.updateTask);

// Delete a task
router.delete("/:id([0-9]+)", [checkJwt],TaskController.deleteTask);

export default router;
