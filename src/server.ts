import { createServer } from "node:http";

const server = createServer((req, res) => {
	if (req.method === "GET" && req.url === "/api/health") {
		res.writeHead(200, {
			"Content-Type": "application/json"
		});

		res.end(JSON.stringify({
			message: "Seems fine"
		}));

		return;
	} else if (req.method === "GET" && req.url === "/api/photos") {
		
	}

	res.writeHead(404, {
		"Content-Type": "application/json"
	});

	res.end(JSON.stringify({
		error: "Not Found"
	}));
});

server.listen(3000, '0.0.0.0', () => {
	console.log("Server running on http://localhost:3000");
});


