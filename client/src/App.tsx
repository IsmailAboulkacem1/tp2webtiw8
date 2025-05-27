import React from 'react'
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import type { PublicEvent, Question } from './models'

import AppToolbar from './components/AppToolbar'
import EventPanel  from './components/EventPanel'

const initialEvents: PublicEvent[] = [
  {
    id: 1,
    name: 'Session A',
    questions: [
      { id: 'a1', author: 'Lucy',     content: 'Where should we be focusing our business development efforts?', votes: 72, color: '#3B82F6' },
      { id: 'a2', author: 'Rachel',   content: 'What is the status on the new organizational structure?',     votes: 23, color: '#8B5CF6' },
    ]
  },
  {
    id: 2,
    name: 'Session B',
    questions: [
      { id: 'b1', author: 'Peter',    content: 'Does the company support and cover the costs of external courses?', votes: 9, color: '#F59E0B' },
      { id: 'b2', author: 'Anonymous',content: 'Why do we invest so many resources in developing our own CRM?', votes: 7, color: '#6B7280' },
    ]
  }
]

export default function App() {
  return (
    <Routes>
      {/* par défaut, on redirige vers la session 1 */}
      <Route path="/" element={<Navigate to="/session/1" replace />} />

      {/* route dynamique, on affiche SessionPage */}
      <Route path="/session/:id" element={<SessionPage />} />

      {/* fallback 404 */}
      <Route path="*" element={<h2>Page non trouvée</h2>} />
    </Routes>
  )
}

function SessionPage() {
  // 1) Récupérer l'id depuis l'URL
  const { id } = useParams<'id'>()
  const sessionId = Number(id)
  const navigate  = useNavigate()

  // 2) Votre état global d’événements
  const [events, setEvents] = React.useState<PublicEvent[]>(initialEvents)

  // 3) Trouver l’événement courant
  const currentEvent = events.find(e => e.id === sessionId)
  if (!currentEvent) return <h2>Session « {id} » introuvable</h2>

  // 4) Vos handlers inchangés
  const handleAddQuestion = (newQ: Question) => {
    setEvents(evts =>
      evts.map(e =>
        e.id === sessionId ? { ...e, questions: [newQ, ...e.questions] } : e
      )
    )
  }

  const handleUpvote = (qid: string) => {
    setEvents(evts =>
      evts.map(e =>
        e.id === sessionId
          ? {
              ...e,
              questions: e.questions.map(q =>
                q.id === qid ? { ...q, votes: q.votes + 1 } : q
              )
            }
          : e
      )
    )
  }

  // 5) Quand on clique sur la toolbar, on navigue vers /session/X
  const handleSelectEvent = (eid: number) => {
    navigate(`/session/${eid}`)
  }

  // 6) Rendu final
  return (
    <div className="min-h-screen bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AppToolbar
          events={events}
          currentEventId={sessionId}
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
