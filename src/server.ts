import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import config from "./config/config";

// Connect to databses
createConnection().then(async connection => {
    // create express app
    const app = express();
    
    // Call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    app.use("/", routes);

    // setup express app here
    // ...

    // start express server
    let port = process.env.PORT || config.APP_PORT;
    app.listen(port, () => {
        console.log(`Server started at port: ${port}`);
    });
}).catch(error => console.log(error));
