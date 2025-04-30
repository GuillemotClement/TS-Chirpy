import express from "express";
import { handlerReadiness } from "./api/readiness.js"; // importation du handler
import { middlewareLogResponse, middlewareMetricsInc } from "./api/middleware.js"; // importation du middleware
import { handlerCountRequests } from "./api/metrics.js";
import { config } from "./config.js";
import { handlerChirpsValidate } from "./api/chirp.js";
import { errorHandler } from "./api/errorMiddleware.js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { handleCreateUser, handleDeleteUser } from "./api/users.js";
const migrationClient = postgres(config.db.url, { max: 1 });
// tente d'executer toutes les migrations au demarrage du serveur
await migrate(drizzle(migrationClient), config.db.migrationConfig);
const app = express();
// traitement des json
app.use(express.json());
app.use(middlewareLogResponse); // on ajoute le middleware sur toutes les requetes entrantes.
app.use("/app", middlewareMetricsInc, express.static("./src/app")); //definition du folder qui contient les fichiers statique
app.get("/api/healthz", handlerReadiness); // ajout d'un handler pour traiter les requetes sur l'url
app.get("/admin/metrics", handlerCountRequests);
app.post("/admin/reset", handleDeleteUser);
app.post("/api/validate_chirp", handlerChirpsValidate);
app.post("/api/users", handleCreateUser);
app.use(errorHandler);
// lancement du serveur
app.listen(config.api.port, () => {
    console.log(`Server is listen as http://localhost:${config.api.port}`);
});
