# TP2 Web – Stack Vite + React + Express + Redux Toolkit + Socket.io (TypeScript)

> Projet réalisé pour le TP2 de l’UE TIW8 – Application de questions/réponses temps‐réel multi‐devices  
> **Auteurs : Ismail Aboulkacem & [Votre binôme]**

---

## 📦 Environnement

| Technologie         | Version     |
|---------------------|-------------|
| Node.js             | v18+        |
| Yarn / npm          | v1.22.22 / v9+ |
| Express             | v5.x        |
| socket.io           | v4.x        |
| TypeScript          | v5.x        |
| Vite                | v6.x        |
| React               | v18.x       |
| react-router-dom    | v6.x        |
| @reduxjs/toolkit    | v1.x        |
| react-redux         | v8.x        |
| react-device-detect (optionnel) | v2.x |
| OneDollar.js (gestures) | included local |

---

## 🗂️ Structure du projet



\`\`\`
tp2webtiw8/

├── server/ # Back-end Express + Socket.io

│ ├── src/

│ │ ├── index.ts # Serveur HTTP + WebSocket + SPA catch-all

│ │ └── routes/ # Web API routes (ex: hello.router.ts)

│ ├── dist/ # JS compilé

│ ├── package.json

│ └── tsconfig.json

│
├── client/ # Front-end React + Redux + Vite

│ ├── public/

│ ├── src/

│ │ ├── App.tsx # Routeur, SessionWrapper & rôle admin/participant

│ │ ├── main.tsx

│ │ ├── models.d.ts

│ │ ├── store/ # Redux Toolkit: store, hooks, slices, middleware

│ │ ├── components/ # AppToolbar, EventPanel, QuestionCard, AdminSession, Header, GestureCanvas…

│ │ ├── oneDollar.ts # Stub du $1-Recognizer

│ │ └── index.css / App.css

│ ├── dist/ # Build Vite

│ ├── package.json

│ └── tsconfig.json

│
├── .gitignore
└── README.md # ← Vous êtes ici !
\`\`\`

---

## 🚀 Lancer le projet localement

### 1. Cloner le dépôt

```bash
git clone https://github.com/IsmailAboulkacem1/tp2webtiw8.git
  ```
```bash
cd tp2webtiw8
  ```

---

### 2. Côté serveur (`/server`)

```bash
cd server
yarn install

# Ou version compilée

yarn start     # exécute dist/index.js
```

---

### 3. Côté client (`/client`) (Port 5173)

```bash
cd ../client
yarn install

# Développement avec hot-reload
yarn dev
```

---


---

### 4.  🛣️ Routes React

- /session/:id → interface participant
- /admin/session/:id → interface admin
- <Header> permet de basculer de rôle et de session
- Le state “currentEvent” se synchronise automatiquement via useParams, useNavigate et Redux

---
### 5.✅ Vérifications avant rendu

- README.md à jour

- package.json net (pas de dépendances inutiles)

- Routes React fonctionnelles

- Redux + DevTools ok

- WebSockets synchronisent entre onglets/appareils

- Canvas & gestes opérationnels

- Admin peut Ajouter/Éditer/Supprimer/Upvote/Downvote questions

- Linting & Typescript sans erreurs

- Déploiement statique (express + NGINX) testé
## ✨ Auteur

**Ismail Aboulkacem**
