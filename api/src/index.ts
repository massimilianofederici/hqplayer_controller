import express from 'express';
import dotenv from "dotenv";
import {register as libraryRoutes} from "./routes/library";
import {register as commandsRoutes} from "./routes/commands";
import log from "loglevel";
import cors from "cors";

dotenv.config();
log.enableAll()

const errorHandler = (err:Error, req:any, res:any, next:any): void => {
    log.error(err)
    res.setHeader('Content-Type', 'application/json');
    res.status(500)
        .send({
            statusCode: 500,
            message: err.message
        })
}

const app = express();
const options: cors.CorsOptions = {
    origin: "*"
};
app.use(cors(options));
const PORT = process.env.SERVER_PORT;
libraryRoutes(app);
commandsRoutes(app);
app.use(errorHandler)

app.get('/', (req,res) => res.send('Express + TypeScript Server change'));
app.listen(PORT, () => {
    log.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});