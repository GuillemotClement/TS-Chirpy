import type { NextFunction, Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";
import { BadRequest } from "./errorClasse.js";

export async function handlerChirpsValidate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  type parameters = {
    body: string;
  };
  try {
    const params: parameters = req.body;

    const maxChirpLength = 140;

    if (params.body.length > maxChirpLength) {
      throw new BadRequest("Chirp is too long. Max length is 140");
    }

    const badWords = ["kerfuffle", "sharbert", "fornax"];

    // on transforme la string en tableau en indiquant un espace pour le separateur
    const words = params.body.split(" "); // recupere les elements de la requete

    // on parcourt la liste de mods dans le body
    const cleanWords = words.map((word) => {
      // si le mot est dans la liste des bad words alors on remplace, sinon on retourne le mot
      if (badWords.includes(word.toLowerCase())) {
        return "****";
      }
      return word;
    });

    // on transforme le tableau en string en ajoutant un espace comme separateur
    const stringWithGoodWords = cleanWords.join(" ");

    // on retourne la string en reponse
    respondWithJSON(res, 200, {
      cleanedBody: stringWithGoodWords,
    });
  } catch (err) {
    next(err);
  }
}
