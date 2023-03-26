import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FormEvent,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from '../app/hooks';
import './../App.scss';
import './../styles/QuestionBlock.scss';
enum Colors {
  RED = '#b90404',
  BGRED = 'rgb(185, 4, 4, 0.1)',
  GREEN = '#126d00',
  BGGREEN = 'rgb(18, 109, 0, 0.1)',
}

export default function QuestionBlock({ question, questionId }: any) {
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  // useEffect(() => {
  //   console.log(textValue);
  // }, [textValue]);
  useEffect(() => {
    console.log(textRef.current);
    if (textRef && textRef.current) {
      setTextAreaHeight(textRef.current);
    }
  });

  function setTextAreaHeight(textArea: HTMLTextAreaElement) {
    console.log(typeof textArea);
    textArea.style.lineHeight = '20px';
    textArea.style.height = '5px';
    textArea.style.height = textArea.scrollHeight + 5 + 'px';
  }
  const [possiblePattern, possibleFlags] = question.possibleAnswer.split('/');

  const [userPattern, userFlags] = question?.userAnswer?.split('/') || [
    null,
    null,
  ];

  return (
    <div className="questionBlock" key={questionId}>
      <div
        className="questionId"
        style={{
          borderColor: question.userAnswer ? Colors.GREEN : Colors.RED,
          backgroundColor: question.userAnswer ? Colors.BGGREEN : Colors.BGRED,
          //   bakc
        }}>
        #{questionId}
      </div>
      <div
        className="questionCart"
        style={{
          borderColor: question.userAnswer ? Colors.GREEN : Colors.RED,
        }}>
        <div className="row">
          <div className="textBlock">
            <span className="task">{question.task}</span>
            <textarea
              className="text"
              contentEditable={true}
              ref={textRef}
              onLoad={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                console.log(e)
              }
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                // console.log('change');
                setTextAreaHeight(e.target);
              }}
              disabled={true}
              value={question.text}
              ></textarea>
          </div>
          <div className="expectedBlock">
            <span className="key">Expected result:</span>
            <div className="wrapper">
              {(question.expectedResult as string).split('|').map((el, i) => {
                return (
                  <span className="value" key={i}>
                    {el}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="answerBlock">
            <span className="answerKey">
              Possible answer: /
              <span className="answerText">{possiblePattern}</span>/
              <span className="answerText">{possibleFlags}</span>
            </span>
          </div>
        </div>
        <div className="row">
          {userPattern && (
            <div className="answerBlock">
              <span className="answerKey">
                Your answer: /<span className="answerText">{userPattern}</span>/
                <span className="answerText">{userFlags}</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
