import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerCountRequests(req: Request, res: Response) {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(`Hits: ${config.fileserverHits}`);
  res.end();
}

export async function handlerResetMetrics(req: Request, res: Response) {
  config.fileserverHits = 0;
  res.end();
}
