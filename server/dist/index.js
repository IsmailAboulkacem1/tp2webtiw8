"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path")); // Ajouté pour gérer les chemins de fichier
const express_1 = __importDefault(require("express"));
const hello_router_1 = require("./routes/hello.router");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Chemins vers le build client
const DIST_DIR = path_1.default.join(__dirname, '../../client/dist');
const HTML_FILE = path_1.default.join(DIST_DIR, 'index.html');
// 1️⃣ Servir les fichiers statiques générés par Vite
app.use(express_1.default.static(DIST_DIR));
// 2️⃣ Catch-all : pour toute autre route, renvoyer l'index du client
app.get(/.*/, (_req, res) => {
    res.sendFile(HTML_FILE);
});
app.listen(port, () => {
    process.stdout.write(`Server started on port: ${port}\n`);
});
// 3️⃣ Ajouter le routeur pour les requêtes Hello
// Cela permet de gérer les requêtes vers /hello
app.use('/hello', hello_router_1.HelloRouteur);
