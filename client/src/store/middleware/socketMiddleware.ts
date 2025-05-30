// src/store/middleware/socketMiddleware.ts

import { io } from 'socket.io-client'
import type { Middleware } from '@reduxjs/toolkit'

// 1) Créez la connexion Socket.io (une seule fois)
const socket = io('http://localhost:3000')

export const socketMiddleware: Middleware = storeAPI => {
  // 2.a) Quand le serveur rebroadcast une action, on la dispatche
  socket.on('action', (action: any) => {
    // On marque l’action comme “remote” pour ne pas la renvoyer
    storeAPI.dispatch({ 
      ...action, 
      meta: { ...(action.meta || {}), remote: true } 
    })
  })

  // 2.b) Fonction d’interception des dispatchs locaux
  return next => action => {
    // 1) Laissez Redux traiter l’action
    const result = next(action)

    // 2) Si l’action n’est *pas* taggée remote, on l’envoie au serveur
    const isRemote = (action as any).meta?.remote
    if (!isRemote) {
      socket.emit('action', action)
    }

    return result
  }
}
