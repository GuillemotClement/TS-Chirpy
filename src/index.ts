import express from "express";

import { handlerReadiness } from "./api/readiness.js"; // importation du handler
import { middlewareLogResponse } from "./api/middleware.js"; // importation du middleware

const app = express();
const PORT = 8080; // declaration du port ecouter par le serveur

app.use(middlewareLogResponse); // on ajoute le middleware sur toutes les requetes entrantes.

app.use("/app", express.static("./src/app")); //definition du folder qui contient les fichiers statique

app.get("/healthz", handlerReadiness); // ajout d'un handler pour traiter les requetes sur l'url

// lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is listen as http://localhost:${PORT}`);
});
