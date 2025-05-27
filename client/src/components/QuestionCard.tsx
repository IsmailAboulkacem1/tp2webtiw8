import React from 'react';
import type { Question } from '../models';
import '../App.css';  // veillez à importer votre CSS global ici

interface Props {
  question: Question;
  onUpvote: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, onUpvote }) => (
  <div
    className="question-card"
    style={{ border: `2px solid ${question.color}` }}  // si vous gardez une bordure colorée
  >
    <div>
      <span
        className="question-card__author"
        style={{ color: question.color }}
      >
        {question.author}
      </span>
      <div className="question-card__content">
        {question.content}
      </div>
    </div>

    <button
      className="question-card__upvote"
      onClick={onUpvote}
    >
      👍 {question.votes}
    </button>
  </div>
);

export default QuestionCard;
