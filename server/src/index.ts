  import path from 'path' // Ajouté pour gérer les chemins de fichier
  import express from 'express';
  import { HelloRouteur } from './routes/hello.router';

  const app = express();
  const port = process.env.PORT || 3000;

  // Chemins vers le build client
  const DIST_DIR  = path.join(__dirname, '../../client/dist')
  const HTML_FILE = path.join(DIST_DIR, 'index.html')

  // 1️⃣ Servir les fichiers statiques générés par Vite
  app.use(express.static(DIST_DIR))

  // 2️⃣ Catch-all : pour toute autre route, renvoyer l'index du client
  app.get(/.*/, (_req, res) => {
    res.sendFile(HTML_FILE)
  })

  app.listen(port, () => {
    process.stdout.write(`Server started on port: ${port}\n`);
  });
  // 3️⃣ Ajouter le routeur pour les requêtes Hello
  // Cela permet de gérer les requêtes vers /hello
  app.use('/hello', HelloRouteur);