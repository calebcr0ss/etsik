import type { IncomingMessage, ServerResponse } from "node:http";
import Busboy from "busboy";

function FetchPhotos(req: IncomingMessage, res: ServerResponse) {
        try {
                const busboy = Busboy({ headers: req.headers });

                busboy.on("field", (name, val) => {
                        switch (name) {
                                case "photoUUID": 
                                        // handle photo uuid
                                        break;
                        }
                });


        } catch {}
}