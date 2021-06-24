import { Router } from "express";
import auth from "./auth";
import task from "./task";
import user from "./user";
import assign from "./assign";

const routes = Router();

routes.use("/auth", auth);
routes.use("/task", task);
routes.use("/user", user);
routes.use("/assign", assign);

export default routes;
