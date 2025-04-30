import { Request, Response } from "express";
import { createUser, deleteUser } from "../db/queries/users.js";
import { respondWithError, respondWithJSON } from "./json.js";
import { config } from "../config.js";

export async function handleCreateUser(req: Request, res: Response) {
  console.log(req.body);
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Email is not submit");
      return;
    }

    const result = await createUser({ email });
    if (!result) {
      throw new Error("Register user is failed");
      return;
    }

    respondWithJSON(res, 201, result);
  } catch (err) {
    console.error(err);
  }
}

export async function handleDeleteUser(req: Request, res: Response) {
  try {
    if (config.api.platform != "dev") {
      respondWithError(res, 403, "403 Forbidden");
    }

    const { email } = req.body;
    if (!email) {
      throw new Error("Email is not submit");
      return;
    }

    const result = await deleteUser(email);

    respondWithJSON(res, 200, result);
  } catch (err) {
    console.error(err);
  }
}
