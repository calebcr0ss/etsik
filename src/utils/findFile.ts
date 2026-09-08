import fsp from "node:fs/promises"

async function findFile(folder: string, StartsWith: string) {
        const files = await fsp.readdir(folder);
        
        return files.find(name => {
                name.startsWith(`${StartsWith}`)
        })
        
}

export { findFile }
