import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";

class UserController {
    static listAll = async (req: Request, res: Response) => {
        // Get user from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "createdAt", "updatedAt"] //I don't send the password on response
        });

        // Send the users object
        return res.send(users);
    };
};

export default UserController;
