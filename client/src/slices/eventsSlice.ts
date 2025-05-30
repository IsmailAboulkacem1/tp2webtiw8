// src/slices/eventsSlice.ts
//eventsSlice.ts contient  état initial et  reducers (setCurrentEvent, createQuestion, upvoteQuestion)
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PublicEvent, Question } from '../models'

const initialEvents: PublicEvent[] = [
  {
    id: 1,
    name: 'Session A',
    questions: [
      { id: 'a1', author: 'Lucy', content: 'Where should we be focusing our business development efforts?', votes: 72,  color: '#3B82F6' },
      { id: 'a2', author: 'Rachel', content: 'What is the status on the new organizational structure?', votes: 23, color: '#8B5CF6' },
    ]
  },
  {
    id: 2,
    name: 'Session B',
    questions: [
      { id: 'b1', author: 'Peter', content: 'Does the company support and cover the costs of external courses?', votes: 9,  color: '#F59E0B' },
      { id: 'b2', author: 'Anonymous', content: 'Why do we invest so many resources in developing our own CRM?', votes: 7, color: '#6B7280' },
    ]
  }
]
interface EventsState {
  events: PublicEvent[]
  currentEventId: number
}

const initialState: EventsState = {
  events: initialEvents,
  currentEventId: initialEvents[0].id,
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    //setCurrentEvent : change currentEventId pour indiquer la session active.
    setCurrentEvent(state, action: PayloadAction<number>) {
      state.currentEventId = action.payload
    },
    //createQuestion : ajoute une nouvelle question en tête du tableau de la session active.
    createQuestion(state, action: PayloadAction<Question>) {
      const ev = state.events.find(e => e.id === state.currentEventId)
      if (ev) ev.questions.unshift(action.payload)
    },
    //upvoteQuestion : trouve la question correspondante et incrémente son compteur votes.
    upvoteQuestion(state, action: PayloadAction<string>) {
      const ev = state.events.find(e => e.id === state.currentEventId)
      if (ev) {
        const q = ev.questions.find(q => q.id === action.payload)
        if (q) q.votes += 1
      }
    },
    deleteQuestion(state, action: PayloadAction<{ eventId: number, questionId: string }>) {
      const ev = state.events.find(e => e.id === action.payload.eventId)
      if (ev) {
        ev.questions = ev.questions.filter(q => q.id !== action.payload.questionId)
      }
    },
     decrementQuestion(state, action: PayloadAction<string>) {
      const ev = state.events.find(e => e.id === state.currentEventId)
      const q  = ev?.questions.find(q => q.id === action.payload)
      if (q && q.votes > 0) q.votes -= 1
    },
     editQuestion(state, action: PayloadAction<{ questionId: string; newContent: string }>) {
      const ev = state.events.find(e => e.id === state.currentEventId)
      const q  = ev?.questions.find(q => q.id === action.payload.questionId)
      if (q) q.content = action.payload.newContent
    },
  },
})

export const { setCurrentEvent, createQuestion, upvoteQuestion, deleteQuestion ,editQuestion,decrementQuestion, } = eventsSlice.actions
export default eventsSlice.reducer
