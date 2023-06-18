import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import './../styles/Timer.scss';

export default function QuestionsStatus() {
  const questionsAmount = useAppSelector(
    (state) => state.quizForm.questions.length
  );
  const currentQuestionIndex = useAppSelector(
    (state) => state.quizForm.currentQuestionIndex
  );
  return (
    <div className="questionStatus">
      <span style={{ marginRight: '5px' }}>Completed:</span>
      <span>{currentQuestionIndex !== -1 ? currentQuestionIndex : '?'}</span>/
      <span>{currentQuestionIndex !== -1 ? questionsAmount : '?'}</span>
    </div>
  );
}
