import { Router } from "express";
import UserController from "../controller/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Get all users
router.get("/", [checkJwt], UserController.listAll);


export default router;
