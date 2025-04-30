import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerCountRequests(req: Request, res: Response) {
  res.set("Content-Type", "text/html; charset=utf-8");
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chirpy</title>
  </head>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileServerHits} times!</p>
  </body>
</html>`;

  res.send(html);
}

export async function handlerResetMetrics(req: Request, res: Response) {
  config.api.fileServerHits = 0;
  res.end();
}
