import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import config from "./../config/config";
const moment = require("moment");

import { User } from "../entity/User";

class AuthController {
    static signUp = async (req: Request, res: Response) => {
        // Get parammeters from the body
        let { username, password } = req.body;
        let user = new User();
        user.username = username;
        user.password = password;
        user.createdAt = moment().format("MM/DD/YYYY HH:mm:ss");
        user.updatedAt = moment().format("MM/DD/YYYY HH:mm:ss");

        // Validate if the parammeter are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).send(errors);
        };

        // Hash the password, to securely store on DB
        user.hashPassword();

        // Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).send("username already in use");
        };

        // If all ok, send 201 response
        return res.status(201).send("Sign up successfully");
    };

    static signIn = async (req: Request, res: Response) => {
        // Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send();
        };

        // Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: { username }});
        } catch (error) {
            return res.status(401).send();
        };

        // Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send();
        };

        // Sing jwt
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: config.tokenLifetime }
        );

        // Send the jwt in the response
        res.setHeader("auth", token);
        return res.send("Sign in successfully");
    };
};

export default AuthController;
