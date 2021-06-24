import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
const moment = require("moment");

import { Task } from "../entity/Task";
import { STATUS } from "../config/TaskStatus";

class TaskController {
    static listAll = async (req: Request, res: Response) => {
        // Get task from database
        const taskRepository = getRepository(Task);
        const tasks = await taskRepository.find();

        // Send the tasks object
        return res.send(tasks);
    };

    static getOneById = async (req: Request, res: Response) => {
        // Get ID from url
        const id: number = req.params.id;

        // Get task from database
        const taskRepository = getRepository(Task);
        try {
            const task = await taskRepository.findOneOrFail(id);
            return res.send(task);
        } catch (error) {
            res.status(404).send("Task not found");
        };
    };
    
    static newTask = async (req: Request, res: Response) => {
        // Get parammeters from the body
        let { name, description, completeDate, status, user } = req.body;
        let task = new Task();
        task.name = name;
        task.description = description;
        task.completeDate = completeDate;
        task.status = status;
        task.user = user;
        task.createdAt = moment().format("MM/DD/YYYY HH:mm:ss")
        task.updatedAt = moment().format("MM/DD/YYYY HH:mm:ss")

        // Validate if the parammeter are ok
        
        if (status != STATUS.NEW) {
            return res.status(409).send("Status is incorrect");
        };
        const errors = await validate(task);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        };

        // Try to save. If fails, the user id not exists
        const taskRepository = getRepository(Task);
        try {
            await taskRepository.save(task);
        } catch (e) {
            return res.status(409).send("user id not exists");
        };

        // If all ok, send 201 response
        return res.status(201).send("Task created");
    };

    static updateTask = async (req: Request, res: Response) => {
        // Get ID from url
        let id = req.params.id;
        
        // Get value from the body
        let body = req.body;
        let { status } = body[0];

        // Try to find task on database
        let taskRepository = getRepository(Task);
        let task: Task;
        try {
            task = await taskRepository.findOneOrFail({ id: id, status: STATUS.NEW });
        } catch (error) {
            // If not found or completed, send a 404 response
            return res.status(404).send("Task is not found or is completed");
        };

        // Validate the new values on model
        task.status = status;
        task.updatedAt = moment().format("MM/DD/YYYY HH:mm:ss");
        if (status != STATUS.COMPLETE) {
            return res.status(409).send("Status is incorrect");
        };
        const errors = await validate(task);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        };

        // Try to safe, if fails, that means status equal NEW
        try {
            await taskRepository.save(task);
        } catch (e) {
            return res.status(409).send("Request is incorrect");
        };

        // After all send a 204 (no content, but accepted) response
        return res.status(204).send();
    };
    
    static deleteTask = async (req: Request, res: Response) => {
        // Get ID from url
        const id = req.params.id;
        
        // Try to find task on database
        const taskRepository = getRepository(Task);
        let task: Task;
        try {
            task = await taskRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).send("Task not found");
        };
        taskRepository.delete(id);
        
        // After all send a 204 (no content, but accepted) response
        return res.status(204).send();
    };
};

export default TaskController;
