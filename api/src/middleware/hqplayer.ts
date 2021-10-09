import log from "loglevel";
import net from "net";
import * as xml_js from "xml-js";

export const addToQueue = (path: string): Promise<string> => {
    return sendCommand(`<PlaylistAdd uri="${path}"></PlaylistAdd>`);
};

export const play = (): Promise<string> => {
    return sendCommand("<Play></Play>");
};

const sendCommand = (command: string): Promise<string> => {
    const hqPlayerHost = process.env.HQPLAYER_HOST;
    const hqPlayerPort = Number(process.env.HQPLAYER_PORT);

    return new Promise(async (resolve, reject) => {
        const client = new net.Socket();
        log.debug(`Connecting to HQPlayer on ${hqPlayerHost}:${hqPlayerPort}`);
        try {
            client.on("data", data => {
                log.debug(`Received ${data}`);
                const response = xml_js.xml2js(data.toString());
                if (response.elements[0].attributes.result === "OK") {
                    resolve("");
                } else {
                    reject(`Received unexpected status ${data}`);
                }
            });
            client.on("error", err => {
                reject(err)
            })
            client.connect(hqPlayerPort, hqPlayerHost, () => {
                client.write(`<?xml version="1.0" encoding="UTF-8"?>${command}`);
            });

        } catch (e) {
            reject("Could no connect to HQPlayer instance");
        }
    });
};
