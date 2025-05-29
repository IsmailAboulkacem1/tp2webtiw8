// src/components/EventPanel.tsx

import type { PublicEvent, Question } from '../models'
import QuestionCard from './QuestionCard'
import AddQuestionForm from './AddQuestionForm'

interface Props {
  event: PublicEvent
  onAdd: (q: Question) => void
  onUpvote: (id: string) => void
}

export default function EventPanel({ event, onAdd, onUpvote }: Props) {
  return (
    <section className="rounded-2xl p-6 bg-blue-600">
      {/* En-tête « Top questions » */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">Top questions</h2>
        <span className="questions-count">{event.questions.length+1}</span>
      </div>

      {/* Conteneur blanc pour les cartes */}
      <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
        {event.questions.map(q => (
          <div key={q.id} className="p-4">
            <QuestionCard
              question={q}
              onUpvote={() => onUpvote(q.id)}
            />
          </div>
        ))}
      </div>

      {/* Séparateur « Latest question » */}
      <div className="latest-separator">
        Latest question
      </div>

      {/* Carte blanche pour la dernière question */}
      {event.questions.length > 0 && (
        <div className="bg-white rounded-xl shadow p-4">
          <QuestionCard
            question={event.questions[event.questions.length - 1]}
            onUpvote={() =>
              onUpvote(event.questions[event.questions.length - 1].id)
            }
          />
        </div>
      )}

      {/* Formulaire d’ajout */}
      <div className="mt-6">
        <AddQuestionForm onAdd={onAdd} />
      </div>
    </section>
  )
}
