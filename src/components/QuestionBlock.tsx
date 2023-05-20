import React, { ChangeEvent, useEffect, useRef } from 'react';
import { IQuestionBlock } from '../models/componentModels';
import './../styles/QuestionBlock.scss';

enum Colors {
  RED = 'rgb(255,2,0)',
  BGRED = 'rgb(255,2,0, 0.05)',
  GREEN = 'rgb(32, 193, 0)',
  BGGREEN = 'rgb(32,193,0,0.05)',
}

export default function QuestionBlock({
  question,
  questionId,
}: IQuestionBlock) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // this code used to restyle textarea after mount
    //todo: refactor
    if (textRef && textRef.current) {
      setTextAreaHeight(textRef.current);
    }
  }, []);

  function setTextAreaHeight(textArea: HTMLTextAreaElement) {
    // console.log(typeof textArea);
    textArea.style.lineHeight = '20px';
    textArea.style.height = '5px';
    textArea.style.height = textArea.scrollHeight + 5 + 'px';
  }
  const [possiblePattern, possibleFlags] = question.possibleAnswer
    ? question.possibleAnswer.split('/')
    : [null, null];

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
          backgroundColor: question.userAnswer ? Colors.BGGREEN : Colors.BGRED,
        }}>
        <div className="row">
          <div className="textBlock">
            <p className="task">{question.task}</p>
            <textarea
              className="text"
              // contentEditable={true}
              ref={textRef}
              onLoad={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                console.log(e)
              }
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                // console.log('change');
                setTextAreaHeight(e.target);
              }}
              disabled={true}
              value={question.text}></textarea>
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
              Possible answer:{' '}
              {possiblePattern ? (
                <>
                  {'/'}
                  <span className="answerText">{possiblePattern}</span>/
                  <span className="answerText">{possibleFlags}</span>
                </>
              ) : (
                '???'
              )}
            </span>
          </div>
        </div>
        {userPattern && (
          <div className="row">
            <div className="answerBlock">
              <span className="answerKey">
                Your answer: /<span className="answerText">{userPattern}</span>/
                <span className="answerText">{userFlags}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
