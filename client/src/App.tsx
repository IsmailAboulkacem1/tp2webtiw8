// src/App.tsx
import React from 'react'
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import type { Question } from './models'
import Header from './components/Header'
import EventPanel from './components/EventPanel'
import AdminSession from './components/AdminSession'
import GestureCanvas from './components/GestureCanvas'

import { useAppSelector, useAppDispatch } from './store/hooks'
import {
  setCurrentEvent,
  createQuestion,
  upvoteQuestion,
  deleteQuestion
} from './slices/eventsSlice'

type Role = 'participant' | 'admin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/session/1" replace />} />
      <Route path="/session/:id" element={<SessionWrapper />} />
      <Route path="/admin/session/:id" element={<SessionWrapper />} />
      <Route path="*" element={<h2>Page non trouvée</h2>} />
    </Routes>
  )
}

function SessionWrapper() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const sessionId = Number(id)
  const { events, currentEventId } = useAppSelector(s => s.events)
  const currentEvent = events.find(e => e.id === sessionId)
  const isAdminRoute = window.location.pathname.startsWith('/admin')

  const [role, setRole] = React.useState<Role>(
    isAdminRoute ? 'admin' : 'participant'
  )

  // synchroniser URL ▶️ Redux
  React.useEffect(() => {
    if (currentEventId !== sessionId) {
      dispatch(setCurrentEvent(sessionId))
    }
  }, [sessionId, currentEventId, dispatch])

  if (!currentEvent) {
    return <h2>Session « {id} » introuvable</h2>
  }

  // handlers communs
  const handleAddQuestion = (q: Question) => dispatch(createQuestion(q))
  const handleUpvote       = (qid: string) => dispatch(upvoteQuestion(qid))
  const handleDelete       = (qid: string) => dispatch(deleteQuestion({ eventId: sessionId, questionId: qid }))

  // quand on change de session via le Header
  const handleSelectEvent = (eid: number) => {
    dispatch(setCurrentEvent(eid))
    navigate(`${role === 'admin' ? '/admin' : ''}/session/${eid}`)
  }

  // swipe gestures (si utilisé)
  const onSwipe = (g: string) => {
    if (g === '>') handleSelectEvent(sessionId % events.length + 1)
    else if (g === '<') handleSelectEvent((sessionId + events.length - 2) % events.length + 1)
  }

  return (
    <div className="min-h-screen bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header global */}
        <Header role={role} onRoleChange={r => {
          setRole(r)
          // bascule d’URL si on change de rôle
          const prefix = r === 'admin' ? '/admin' : ''
          navigate(`${prefix}/session/${sessionId}`)
        }} />

        {/* Vue principale */}
        {role === 'participant' 
        ? <EventPanel event={currentEvent} onAdd={handleAddQuestion} onUpvote={handleUpvote}/>
        : <AdminSession event={currentEvent} onDelete={handleDelete}/>
        }

        {/* Canvas gestuel en bas (optionnel) */}
        <div className="mt-8">
          <GestureCanvas onGestureRecognized={onSwipe} />
        </div>
      </div>
    </div>
  )
}
