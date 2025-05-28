# TP1 Web - Stack Vite + React + Express (TypeScript)

> Projet réalisé pour le TP1 de l’UE TIW8.  
> **Auteur : Ismail Aboulkacem**

---

## 📦 Environnement utilisé

| Technologie | Version     |
|-------------|-------------|
| Node.js     | v23.8.0     |
| Yarn        | v1.22.22    |
| Express     | v5.1.0      |
| TypeScript  | v5.8.3      |
| Vite        | v6.3.5      |
| React       | v19.1.0     |

---

## 🧭 Structure du projet

\`\`\`
tp1webtiw8/

├── server/    → Serveur Express + TypeScript

│   ├── src/

│   │   ├── index.ts

│   │   └── routes/hello.router.ts

│   ├── dist/

│   ├── tsconfig.json

│   └── package.json

│
├── client/    → Application React + Vite + TypeScript

│   ├── src/

│   ├── dist/

│   ├── tsconfig.json

│   └── package.json

│
├── .gitignore

└── README.md
\`\`\`

---

## 🚀 Lancer le projet localement

### 1. Cloner le dépôt

```bash
git clone https://github.com/IsmailAboulkacem1/tp1webtiw8.git
  ```
```bash
cd tp1webtiw8
  ```

---

### 2. Côté serveur (`/server`)

```bash
cd server
yarn install

# En développement avec ts-node
yarn dev

# Ou version compilée
yarn build     # génère dist/
yarn start     # exécute dist/index.js
```

---

### 3. Côté client (`/client`)

```bash
cd ../client
yarn install

# Développement avec hot-reload
yarn dev

# Production build
yarn build
```

---

### 4. Intégrer client + serveur

Dans `server/src/index.ts`, ajoute ces lignes :

```ts
import path from 'path';

const DIST_PATH = path.join(__dirname, '../../client/dist');
app.use(express.static(DIST_PATH));
app.get('/', (_, res) => res.sendFile(path.join(DIST_PATH, 'index.html')));
```

---

## 📄 Remarques importantes

- Le code TypeScript est compilé dans `/server/dist/`
- React est buildé avec Vite dans `/client/dist/`
- Le projet est compatible pour un déploiement via **VM + NGINX** ou **GitLab CI**
- Le fichier `.gitignore` exclut bien `node_modules/` et `dist/`

---

## ✨ Auteur

**Ismail Aboulkacem**
