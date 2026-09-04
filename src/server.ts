import { createServer } from "node:http";
import Busboy from "busboy";
import fs from "fs";

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Seems fine",
      }),
    );

    return;
  } else if (req.method === "GET" && req.url === "/api/photos") {
    const busboy = Busboy({ headers: req.headers });

    busboy.on("field", (name, value) => {
      console.log(name, value); // get a string field
    });

    busboy.on("file", (name, file, info) => {
      console.log(name); // "image"
      console.log(info.filename); // "photo.jpg"
      console.log(info.mimeType); // "image/jpeg"

      file.pipe(fs.createWriteStream("/data/etsik/photos/"));
    });
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

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});
