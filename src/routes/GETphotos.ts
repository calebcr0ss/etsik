import type { IncomingMessage, ServerResponse } from "node:http";
import { uploadPhoto } from "../controllers/photos.js";

function PhotosRouter(req: IncomingMessage, res: ServerResponse) {
    if (req.method === "GET" && req.url ==="/api/photos") {
        uploadPhoto(req, res);
        return true;
    }
    return false;
}

export { PhotosRouter };