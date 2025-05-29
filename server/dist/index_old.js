"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
//const io = new Server(httpServer, { cors: { origin: '*' } })
// JSON + CORS
//app.use(cors())
//app.use(express.json())
// Monte le router /hello
//app.use('/hello', helloRouter)
// Sert le build React
const DIST_DIR = path_1.default.join(__dirname, '../../client/dist');
const INDEX_HTML = path_1.default.join(DIST_DIR, 'index.html');
app.use(express_1.default.static(DIST_DIR));
// Catch-all pour SPA (hors /socket.io)
app.get('*', (req, res, next) => {
    //if (req.url.startsWith('/socket.io')) {
    // Laisse passer le handshake et le polling WebSocket
    // return next()
    // }
    res.sendFile(INDEX_HTML);
});
/* // WebSocket handlers
io.on('connection', socket => {
  console.log('🔌 Client connecté:', socket.id)

  // Exemple : rebroadcast direct des actions
  socket.on('action', action => {
    socket.broadcast.emit('action', action)
  })

  socket.on('disconnect', () => {
    console.log('❌ Client déconnecté:', socket.id)
  })
}) */
const httpServer = (0, http_1.createServer)(app);
// Démarrage du serveur HTTP (Express + Socket.io)
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`⚡️ Server running on http://localhost:${PORT}`);
});
