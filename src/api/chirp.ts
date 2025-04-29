import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;

  if (params.body.length > maxChirpLength) {
    respondWithError(res, 400, "Chirp is too long");
    return;
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
}
