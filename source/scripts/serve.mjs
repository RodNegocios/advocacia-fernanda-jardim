import http from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain",
};
export function createSiteServer(port = 4173) {
  return http
    .createServer(async (req, res) => {
      try {
        let pathname = decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        );
        if (pathname === "/") pathname = "/index.html";
        if (
          !/^\/(index\.html|privacidade\.html|robots\.txt|assets\/[\w.-]+)$/.test(
            pathname,
          )
        ) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const content = await fs.readFile(path.join(root, pathname));
        res.setHeader(
          "Content-Type",
          mime[path.extname(pathname)] || "application/octet-stream",
        );
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
        );
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    })
    .listen(port, "127.0.0.1");
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createSiteServer();
  console.log("Production validation server on port 4173");
}
