import fs from "node:fs";
import fsp from "node:fs/promises";
import Busboy from "busboy";
import { pipeline } from "node:stream/promises";
import type { Readable } from "node:stream";

async function savePhoto(fieldname: string, stream: Readable, info: Busboy.FileInfo, stagingPath: string) {
        const filePath = `${stagingPath}/${info.filename}`;
        try {
                await fsp.access(filePath);
                stream.resume();
                return false;
        } catch {}

        const writeStream = fs.createWriteStream(filePath);
        await pipeline(stream, writeStream);
        return true;
}

export { savePhoto }