import http from "node:http";
const port = process.env.PORT || 3000;
const handler = (_req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ ok: true, path: "/", ts: new Date().toISOString() }));
};
http.createServer(handler).listen(port, () => console.log(`up on :${port}`));
