import type { IncomingMessage, ServerResponse } from "node:http";
import Busboy from "busboy";
import { savePhoto } from "../services/savePhoto.js";

function uploadPhoto(req: IncomingMessage, res: ServerResponse) {
        try {
                const busboy = Busboy({ headers: req.headers });
                req.pipe(busboy);
                const files: Record<string, boolean> = {};
                const saves: Promise<void>[] = [];

                busboy.on("file", (name, file, info) => {
                        const save = savePhoto(
                                file,
                                info.filename,
                                info.mimeType,
                        )

                        saves.push(
                                save.then(success => {
                                        files[info.filename] = success;
                                })
                        );

                });

                busboy.on("finish", async () => {
                        try {
                                await Promise.all(saves);

                                const faulty = Object.entries(files).filter(([_, success]) => !success).map(([name]) => name);

                                res.writeHead(200, {
                                        'Content-Type': 'application/json'
                                });
                                res.end(JSON.stringify({ message: "Upload successful", faulty }));

                        } catch {
                                res.writeHead(500, {
                                        "Content-Type": "application/json",
                                });

                                res.end(JSON.stringify({
                                        error: "Upload failed",
                                }));
                        }

                });
        } catch {
                res.writeHead(500, {
                        'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: "Upload failed" }));
        }
}

export { uploadPhoto };
