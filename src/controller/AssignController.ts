import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import jwt_decode from "jwt-decode";
const moment = require("moment");

import { Task } from "../entity/Task";

class AssignController {
    static updateAssign = async (req: Request, res: Response) => {
        // Get task id from url
        const id = req.params.id;

        // Get user is assigned from the body
        let body = req.body;
        let { user } = body[0];
        let decoded : Object = await jwt_decode(req.headers.auth);        
        
        // Try to find user on database
        const taskRepository = getRepository(Task);
        let task: Task;
        try {
            task = await taskRepository.findOneOrFail(id);
        } catch (error) {
            // If not found, send a 404 response
            return res.status(404).send("Task not found");
        };
        
        if (user == decoded["userId"]) {
            return res.status(409).send("Request is incorrect");
        };

        // Validate the new values on model
        task.user = user;
        task.updatedAt = moment().format("MM/DD/YYYY HH:mm:ss");
        const errors = await validate(task);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        };

        // Try to safe, if fails, that means user id not exists
        try {
            await taskRepository.save(task);
        } catch (e) {
            return res.status(409).send("user id not exists");
        }

        // After all send a 204 (no content, but accepted) response
        return res.status(204).send();
    };
};

export default AssignController;
