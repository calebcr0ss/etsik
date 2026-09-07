import type { IncomingMessage, ServerResponse } from "node:http";


function PhotosRouter(req: IncomingMessage, res: ServerResponse) {
    if (req.method === "GET" && req.url ==="/api/photos") {

        return true;
    }
    return false;
}

export { PhotosRouter };