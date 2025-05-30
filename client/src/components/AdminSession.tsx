// src/components/AdminSession.tsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  setCurrentEvent,
  deleteQuestion,
  upvoteQuestion,
  decrementQuestion,
  editQuestion,
} from '../slices/eventsSlice'
import '../app.css'

export default function AdminSession() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const sessionId = Number(id)

  // 1) Grab events from Redux
  const { events, currentEventId } = useAppSelector(s => s.events)
  const currentEvent = events.find(e => e.id === sessionId)
  if (!currentEvent) return <h2>Session « {id} » introuvable</h2>

  // 2) Sync URL → Redux
  React.useEffect(() => {
    if (currentEventId !== sessionId) {
      dispatch(setCurrentEvent(sessionId))
    }
  }, [sessionId, currentEventId, dispatch])

  // Local state for editing
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft]       = useState('')

  const startEdit = (qId: string, currentText: string) => {
    setEditingId(qId)
    setDraft(currentText)
  }
  const saveEdit = () => {
    if (editingId !== null) {
      dispatch(editQuestion({ questionId: editingId, newContent: draft }))
      setEditingId(null)
    }
  }

  return (
    <div className="admin-session-root">
      <div className="admin-session-container">

        {/* header with back-to-user view */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">
            Admin – {currentEvent.name}
          </h1>
          <button
            onClick={() => navigate(`/session/${sessionId}`)}
            className="px-4 py-2 rounded-full bg-white/30 text-white hover:bg-white/50 transition"
          >
            Vue User
          </button>
        </header>

        <ul className="admin-session-list">
          {currentEvent.questions.map(q => (
            <li key={q.id} className="flex items-center justify-between">
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className="font-medium"
                    style={{ color: q.color }}
                  >
                    {q.author}:
                  </span>

                  {/* either edit form or plain text */}
                  {editingId === q.id ? (
                    <input
                      type="text"
                      className="border rounded px-2"
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                    />
                  ) : (
                    <span className="ml-2">{q.content}</span>
                  )}
                </div>

                {/* votes +/– */}
                <div className="mt-2 flex items-center">
                   <button
                     className="btn btn--vote"
                     onClick={() => dispatch(decrementQuestion(q.id))}
                   >
                     –
                   </button>
                   <span className="mx-2">{q.votes} votes</span>
                   <button
                     className="btn btn--vote"
                     onClick={() => dispatch(upvoteQuestion(q.id))}
                   >
                     +
                   </button>
                  </div>
              </div>
              {/* edit / save / delete */}
                      <div className="flex items-center">
          {editingId === q.id ? (
            <button onClick={saveEdit} className="btn btn--edit">
              Enregistrer
            </button>
          ) : (
            <button onClick={() => startEdit(q.id, q.content)} className="btn btn--edit">
              Éditer
            </button>
          )}
          <button
            onClick={() => dispatch(deleteQuestion({ eventId: sessionId, questionId: q.id }))}
            className="btn btn--delete"
          >
            Supprimer
          </button>
        </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
