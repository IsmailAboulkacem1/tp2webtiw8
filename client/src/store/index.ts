// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../slices/eventsSlice'
import { loggerMiddleware } from './middleware/loggerMiddleware'
import { socketMiddleware } from './middleware/socketMiddleware'

export const store = configureStore({
  reducer: { events: eventsReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(socketMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
