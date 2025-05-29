// src/store/middleware/socketMiddleware.ts
import { io } from 'socket.io-client'
import type { Middleware } from '@reduxjs/toolkit'

// 1) Créez la connexion Socket.io (une seule fois)
const socket = io('http://localhost:3000')

// 2) Middleware WebSocket
export const socketMiddleware: Middleware = storeAPI => {
  // 2.a) Abonnez-vous ici, storeAPI est défini
  //filtrage des actions
  socket.on('action', (action) => {
    storeAPI.dispatch(action)
  })

  // 2.b) Retournez la fonction d’interception
  return next => action => {
    // 1) laissez Redux traiter l’action
    const result = next(action)
    // 2) puis envoyez-la au serveur
    socket.emit('action', action)
    return result
  }
}
