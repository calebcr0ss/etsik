import { createServer } from "node:http";
import "dotenv/config";

import { PhotosRouter } from "./routes/POSTphotos.js"

const server = createServer((req, res) => {
        if (PhotosRouter(req, res)) {
                return
        }

        res.writeHead(404, {
                "Content-Type": "application/json",
        });

        res.end(
                JSON.stringify({
                        error: "Not Found",
                }),
        );
});
const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, "0.0.0.0", () => {
        console.log("Server running on http://localhost:3000");
});
