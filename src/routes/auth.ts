import {Router} from "express";
import AuthController from "./../controller/AuthController";

const router = Router();

// Sign up route
router.post("/signUp", AuthController.signUp);

// Sign in route
router.post("/signIn", AuthController.signIn);

export default router;
