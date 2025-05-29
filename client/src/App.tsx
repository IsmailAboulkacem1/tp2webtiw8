// src/App.tsx
// (via SessionWrapper), on  lis l’état (events, currentEventId) et dispatch-ez bien 
// les actions Redux à la place du state local.
import React from 'react'
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate
} from 'react-router-dom'
import type { Question } from './models'

// Redux : hooks typés + actions
import { useAppSelector, useAppDispatch } from './store/hooks'
import {
  setCurrentEvent,
  createQuestion,
  upvoteQuestion
} from './slices/eventsSlice'

import AppToolbar from './components/AppToolbar'
import EventPanel from './components/EventPanel'

export default function App() {
  return (
    <Routes>
      {/* / → redirige automatiquement vers la session 1 */}
      <Route path="/" element={<Navigate to="/session/1" replace />} />

      {/* route dynamique pour chaque session */}
      <Route path="/session/:id" element={<SessionWrapper />} />

      {/* fallback si aucune route ne matche */}
      <Route path="*" element={<h2>Page non trouvée</h2>} />
    </Routes>
  )
}

function SessionWrapper() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Lire l'id dans l'URL et le convertir en nombre
  const { id } = useParams<{ id: string }>()
  const sessionId = Number(id)

  // Récupérer l'état global depuis Redux
  const { events, currentEventId } = useAppSelector(state => state.events)

  // Trouver l'événement correspondant
  const currentEvent = events.find(e => e.id === sessionId)
  if (!currentEvent) {
    return <h2>Session « {id} » introuvable</h2>
  }

  // Synchroniser l'URL vers Redux (une seule fois ou quand id change)
  React.useEffect(() => {
    if (currentEventId !== sessionId) {
      dispatch(setCurrentEvent(sessionId))
    }
  }, [sessionId, currentEventId, dispatch])

  // Handler pour ajouter une question
  const handleAddQuestion = (newQ: Question) => {
    dispatch(createQuestion(newQ))
  }

  // Handler pour upvoter
  const handleUpvote = (qid: string) => {
    dispatch(upvoteQuestion(qid))
  }

  // Quand on sélectionne une autre session dans la toolbar
  const handleSelectEvent = (eid: number) => {
    dispatch(setCurrentEvent(eid))
    navigate(`/session/${eid}`)
  }

  return (
    <div className="min-h-screen bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AppToolbar
          events={events}
          currentEventId={currentEventId}
          onSelectEvent={handleSelectEvent}
        />
        <EventPanel
          event={currentEvent}
          onAdd={handleAddQuestion}
          onUpvote={handleUpvote}
        />
      </div>
    </div>
  )
}
