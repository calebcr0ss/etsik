import fs from "node:fs";
import fsp from "node:fs/promises";
import type { Readable } from "node:stream";

async function savePhoto(img: Readable, filename: string, mimeType: string) {
        const path = `/data/etsik/photos/${filename}`
        try {
                await fsp.access(path);
                console.log("File under that name exists");
                
                await new Promise<void>((resolve, reject) => {
                        resolve();
                }) 

                return false;   
        } catch {}
        
        const stream = fs.createWriteStream(path)

        img.pipe(stream); 

        await new Promise<void>((resolve, reject) => {
                stream.on("finish", resolve);
                stream.on("error", reject);
        })
        
        console.log(`Saved photo at "${path}"`);
        return true;
        
}

export { savePhoto }