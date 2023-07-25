import { MouseEvent, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import './../styles/QuizForm.scss';

export default function QuizOptions({ handleInputClick }: any) {
  const allOptions = useAppSelector(
    (state) => state.quizForm.currentQuestion?.allOptions
  );
  const ansCount = useAppSelector(
    (state) => state.quizForm.currentQuestion?.ansCount
  );

  if (!allOptions || !ansCount) return <div> No options found</div>;
  //actually should show next question if no options, but it can`t happen, so leave it as is

  return (
    <div className="options">
      {allOptions.map((option, index) => {
        return (
          <label className="option" key={index}>
            <input
              type={ansCount > 1 ? 'checkbox' : 'radio'}
              id={option}
              onClick={handleInputClick}
              name="quizOption"
              value={option}
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}
