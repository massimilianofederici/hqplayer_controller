import * as express from "express";
import log from "loglevel";
import {addToQueue, play} from "../middleware/hqplayer";

export const register = (app: express.Application) => {
    app.post("/api/commands/queue", async (req: any, response, next) => {
        const path = req.query.path;
        log.info(`Queueing items at ${path}`);
        addToQueue(path)
            .then(play)
            .then(() => {
                response.setHeader('Content-Type', 'application/json');
                response.status(204)
                response.send({})
            })
            .catch(err => next(err));
    });
};
