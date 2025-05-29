import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import helloRouter from './routes/hello.router'

const app = express()
//const io = new Server(httpServer, { cors: { origin: '*' } })

// JSON + CORS
//app.use(cors())
//app.use(express.json())

// Monte le router /hello
//app.use('/hello', helloRouter)

// Sert le build React
const DIST_DIR  = path.join(__dirname, '../../client/dist')
const INDEX_HTML = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))

// Catch-all pour SPA (hors /socket.io)
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  //if (req.url.startsWith('/socket.io')) {
    // Laisse passer le handshake et le polling WebSocket
   // return next()
 // }
  res.sendFile(INDEX_HTML)
})

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
const httpServer = createServer(app)

// Démarrage du serveur HTTP (Express + Socket.io)
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`⚡️ Server running on http://localhost:${PORT}`)
})
