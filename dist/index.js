import express from "express";
const app = express();
const PORT = 8080; // declaration du port ecouter par le serveur
app.use(express.static(".")); //definition du folder qui contient les fichiers statique
app.listen(PORT, () => {
    console.log(`Server is listen as http://localhost:${PORT}`);
});
