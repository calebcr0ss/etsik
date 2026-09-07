import type { IncomingMessage, ServerResponse } from "node:http";
import fsp from "node:fs/promises";
import fs from "node:fs"
import { randomUUID } from "node:crypto";
import Busboy from "busboy";
import { savePhoto } from "../services/savePhoto.js";


async function uploadPhoto(req: IncomingMessage, res: ServerResponse) {
        try {
                const busboy = Busboy({ headers: req.headers });
                req.pipe(busboy);
                const stagingID = randomUUID();

                const stagingPath = `${process.env.STAGING_DIR}/${stagingID}`;

                await fsp.mkdir(stagingPath, { recursive: true });

                const Promises: Promise<boolean>[] = [];
                const Files: string[] = [];

                busboy.on("file", async (fieldname, stream, info) => {
                        Promises.push(savePhoto(fieldname, stream, info, stagingPath));
                });

                busboy.on("field", (fieldname, value) => {
                        if (fieldname === "files" && Files.length !== 0) {
                                const parsed = JSON.parse(value);

                                if (!Array.isArray(parsed)) {
                                        res.writeHead(400, {
                                                'Content-Type': 'application/json'
                                        });
                                        res.end(JSON.stringify({ error: "Invalid request.", flag: { "update": true } }));
                                        return false;
                                }


                                parsed.forEach((file: string) => {
                                        Files.push(file);
                                });
                        }
                });

                busboy.on("finish", async () => {
                        await Promise.all(Promises);

                        if (Files.length === 0) {
                                res.writeHead(400, {
                                        'Content-Type': 'application/json'
                                });
                                res.end(JSON.stringify({ error: "No files selected.", flag: { "update": true } }));
                                return false;
                        }

                        Files.forEach(async(file) => {
                                try {
                                        await fsp.access(`${stagingPath}/${file}:original.*`);
                                        await fsp.access(`${stagingPath}/${file}:preview.*`);

                                        return false;
                                } catch {
                                        
                                }

                                
                        });
                });



        } catch {
                res.writeHead(500, {
                        'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: "Upload failed" }));
        }
}

export { uploadPhoto };
