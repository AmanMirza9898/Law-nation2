// src/index.ts
import http from "http";
import app from "@/modules/app/app.js";

const PORT = process.env.PORT ?? 4000;

// create http server from express app
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});