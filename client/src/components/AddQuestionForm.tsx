import React from 'react';
import { v4 as uuid } from 'uuid';
import type { Question } from '../models';
import '../App.css';  // Importez le CSS global

interface Props {
  onAdd: (q: Question) => void;
}

const AddQuestionForm: React.FC<Props> = ({ onAdd }) => {
  const [author, setAuthor] = React.useState('');
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;
    onAdd({
      id: uuid(),
      author,
      content: text,
      votes: 0,
      color: '#3B82F6'
    });
    setText('');
  };

  return (
    <form className="add-question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Votre nom"
        className="add-question-form__input"
      />
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Votre question"
        className="add-question-form__input"
      />
      <button type="submit" className="add-question-form__button">
        Ajouter
      </button>
    </form>
  );
};

export default AddQuestionForm;
