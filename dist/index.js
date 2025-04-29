import express from "express";
import { handlerReadiness } from "./api/readiness.js"; // importation du handler
import { middlewareLogResponse, middlewareMetricsInc } from "./api/middleware.js"; // importation du middleware
import { handlerCountRequests, handlerResetMetrics } from "./api/metrics.js";
import { handlerChirpsValidate } from "./api/chirp.js";
const app = express();
const PORT = 8080; // declaration du port ecouter par le serveur
// traitement des json
app.use(express.json());
app.use(middlewareLogResponse); // on ajoute le middleware sur toutes les requetes entrantes.
app.use("/app", middlewareMetricsInc, express.static("./src/app")); //definition du folder qui contient les fichiers statique
app.get("/api/healthz", handlerReadiness); // ajout d'un handler pour traiter les requetes sur l'url
app.get("/admin/metrics", handlerCountRequests);
app.post("/admin/reset", handlerResetMetrics);
app.post("/api/validate_chirp", handlerChirpsValidate);
// lancement du serveur
app.listen(PORT, () => {
    console.log(`Server is listen as http://localhost:${PORT}`);
});
