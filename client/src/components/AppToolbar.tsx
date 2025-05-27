import React from 'react'
import type { PublicEvent } from '../models'

interface Props {
  events: PublicEvent[]
  currentEventId: number
  onSelectEvent: (id: number) => void
}

export default function AppToolbar({ events, currentEventId, onSelectEvent }: Props) {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-white">Live Q&A</h1>
      <nav className="flex space-x-2">
        {events.map(evt => (
          <button
            key={evt.id}
            onClick={() => onSelectEvent(evt.id)}
            className={`
              px-4 py-2 rounded-full font-medium transition
              ${evt.id === currentEventId
                ? 'bg-white text-blue-600 shadow-lg'
                : 'bg-white/30 text-white hover:bg-white/50'}
            `}
          >
            {evt.name}
          </button>
        ))}
      </nav>
    </header>
  )
}
