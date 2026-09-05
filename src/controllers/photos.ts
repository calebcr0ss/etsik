import type { IncomingMessage, ServerResponse } from "node:http";
import Busboy from "busboy";
import { savePhoto } from "../services/savePhoto.js";

function uploadPhoto(req: IncomingMessage, res: ServerResponse) {
        try {
                const busboy = Busboy({ headers: req.headers });
                req.pipe(busboy);
                let files: Record<string, boolean> = {};

                busboy.on("file", async (name, file, info) => {
                        let success: boolean = await savePhoto(
                                file,
                                info.filename,
                                info.mimeType,
                        );
                        console.log(`dev ${info.encoding} dev ${name}`);
                        if (success === false) {
                                files[info.filename] = success;
                        }
                });

                busboy.on("finish", () => {
                        const toDelete = [];
                        for (const [name, success] of Object.entries(files)) {
                                if (success) toDelete.push(name);
                        }
                        for (const key of toDelete) {
                                delete files[key];
                        }
                        res.writeHead(200, {
                                'Content-Type': 'application/json'
                        });
                        res.end(JSON.stringify({ message: "Upload successful", faulty: Object.keys(files)}));
                });
        } catch {
                res.writeHead(500, {
                        'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: "Upload failed" }));
        }
}

export { uploadPhoto };
