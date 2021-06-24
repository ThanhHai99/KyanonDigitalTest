import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "./../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    // Get the jwt token from the head
    const token = <string>req.headers["auth"];
    let jwtPayload;
    let jwtSecret = process.env.jwtSecret || config.jwtSecret;

    // Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // If token is not valid, response with 401 (unauthorized)
        return res.status(401).send();
    };

    // We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, jwtSecret, {
        expiresIn: config.tokenLifetime
    });
    res.setHeader("token", newToken);

    // Call the next request
    next();
};
