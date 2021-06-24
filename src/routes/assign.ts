import { Router } from "express";
import AssignController from "./../controller/AssignController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Assign task
router.patch("/:id([0-9]+)", [checkJwt], AssignController.updateAssign);

export default router;
