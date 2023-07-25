import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateCurrentUserAnswer } from '../features/quizForm/quizFormSlice';
import './../styles/QuizForm.scss';
import QuizOptions from './QuizOptions';

export default function QuizFormBody({ isDataLoading }: any) {
  const question = useAppSelector((state) => state.quizForm.currentQuestion);

  const dispatch = useAppDispatch();

  function handleInputClick(e: MouseEvent) {
    const { id: answerId } = e.target as HTMLElement;
    const type = (e.target as HTMLElement)['type' as keyof HTMLElement];
    dispatch(updateCurrentUserAnswer({ answerId, type }));
  }

  if (!question)
    return (
      <div>
        {isDataLoading ? (
          <p className="question">Loading...</p>
        ) : (
          <p className="question">Questions not found, try later</p>
        )}
      </div>
    );

  return (
    <div className="quizFormBody">
      <p className="question">{question.question}?</p>
      <QuizOptions handleInputClick={handleInputClick} />
    </div>
  );
}
