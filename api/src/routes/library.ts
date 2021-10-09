import * as express from "express";
import log from "loglevel";
import {browse} from "../middleware/mediacenter";

export const register = (app: express.Application) => {

    app.get("/api/library/browse", async (req: any, res) => {
        const id = req.query.id;
        log.info(`Browsing remote library by ID ${id}`);
        try {
            const items = await browse(id);
            return res.json(items);
        } catch (err) {
            log.error(err);
        }
    });
};
