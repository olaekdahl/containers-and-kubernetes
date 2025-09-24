import http from "node:http";
import { createClient } from "redis";

const port = process.env.PORT || 3000;
const client = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });

client.on("error", (err) => console.error("Redis error:", err));
await client.connect();

http.createServer(async (_req, res) => {
  const hits = Number(await client.incr("hits"));
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ ok: true, hits }));
}).listen(port, "0.0.0.0", () => console.log(`up on :${port}`));

