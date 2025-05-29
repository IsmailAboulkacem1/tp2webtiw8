// src/store/middleware/loggerMiddleware.ts
import type { Middleware } from 'redux'
import type { PayloadAction } from '@reduxjs/toolkit'

export const loggerMiddleware: Middleware = storeAPI => next => action => {
  const act = action as PayloadAction
  console.group(`🚦 ${act.type}`)
  console.log('Prev state:', storeAPI.getState())
  console.log('Action      :', action)
  const result = next(action)
  console.log('Next state :', storeAPI.getState())
  console.groupEnd()
  return result
}
