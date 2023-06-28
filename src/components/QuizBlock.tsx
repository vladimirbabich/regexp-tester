import { useState, useEffect } from 'react';
import { IQuizBlock, IQuizFormBody } from '../models/componentModels';
import './../styles/QuizForm.scss';
import './../styles/QuizBlock.scss';
import { Colors, QuizResultOption } from '../models/objectModels';

export default function QuizBlock({ question, questionId }: IQuizBlock) {
  const [userAnswer] = useState<any>(question.userAnswer);

  const [options] = useState<QuizResultOption[]>(
    question.options
      .split('||')
      .map((str) => str.replaceAll('*b', '\\'))
      .map((str) => str.replaceAll('*p', '|'))
      .map((str) => str.replaceAll('*s', '/'))
      .map((str) => {
        if (userAnswer && userAnswer.includes(str))
          return { option: str, isSelected: true };
        return { option: str, isSelected: false };
      })
  );
  const [answers] = useState<QuizResultOption[]>(
    question.answers
      .split('||')
      .map((str) => str.replaceAll('*b', '\\'))
      .map((str) => str.replaceAll('*p', '|'))
      .map((str) => str.replaceAll('*s', '/'))
      .map((str) => {
        console.log('userAnswer2222');
        console.log(userAnswer);
        console.log(str);
        console.log(userAnswer.includes(str));
        if (userAnswer && userAnswer.includes(str))
          return { option: str, isSelected: true };
        return { option: str, isSelected: false };
      })
  );

  const isRightAnswer = useState<string>(checkIsRightAnswer(answers))[0];

  function checkIsRightAnswer(answers: QuizResultOption[]) {
    const answersSelection = answers.map((answer) =>
      answer.isSelected ? true : false
    );
    const optionsSelection = options.map((answer) =>
      answer.isSelected ? true : false
    );

    if (answersSelection.includes(false)) {
      if (answersSelection.includes(true)) return 'partially';
      return 'wrong';
    }
    if (optionsSelection.includes(true)) return 'partially';

    return 'right';
  }
  console.log(questionId);
  return (
    <div className="quizBlock" key={questionId}>
      <div
        className="questionId"
        style={{
          borderColor:
            isRightAnswer === 'right'
              ? Colors.GREEN
              : isRightAnswer === 'partially'
              ? Colors.YELLOW
              : Colors.RED,
          backgroundColor:
            isRightAnswer === 'right'
              ? Colors.BGGREEN
              : isRightAnswer === 'partially'
              ? Colors.BGYELLOW
              : Colors.BGRED,
          width: '30px',
        }}>
        #{questionId}
      </div>
      <div
        className="questionCard"
        style={{
          borderColor:
            isRightAnswer === 'right'
              ? Colors.GREEN
              : isRightAnswer === 'partially'
              ? Colors.YELLOW
              : Colors.RED,
          backgroundColor:
            isRightAnswer === 'right'
              ? Colors.BGGREEN
              : isRightAnswer === 'partially'
              ? Colors.BGYELLOW
              : Colors.BGRED,
        }}>
        <p className="question">{question.question}</p>
        <div className="options">
          {options.map(({ option, isSelected }) => {
            return (
              <label
                className={`option${isSelected ? ' selectedWrong' : ''}`}
                key={option}>
                <input
                  type={answers.length > 1 ? 'checkbox' : 'radio'}
                  // defaultChecked={answers.length > 1 && isSelected}
                  defaultChecked={isSelected}
                  id={option}
                  disabled={true}
                  name={`option-${questionId}`}
                  value={option}
                />
                {option}.
              </label>
            );
          })}
          {answers.map(({ option, isSelected }) => {
            return (
              <label
                className={`option rightAnswer${
                  isSelected ? ' selectedRight' : ''
                }`}
                key={option}>
                <input
                  type={answers.length > 1 ? 'checkbox' : 'radio'}
                  defaultChecked={isSelected}
                  id={option}
                  disabled={true}
                  name={`option-${questionId}`}
                  value={option}
                />
                {option}.
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
