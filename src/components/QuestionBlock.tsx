import React, { ChangeEvent, useEffect, useRef } from 'react';
import { IQuestionBlock } from '../models/componentModels';
import { Colors } from '../models/objectModels';
import './../styles/QuestionBlock.scss';

export default function QuestionBlock({
  question,
  questionId,
}: IQuestionBlock) {
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
        }}>
        #{questionId}
      </div>
      <div
        className="questionCard"
        style={{
          borderColor: question.userAnswer ? Colors.GREEN : Colors.RED,
          backgroundColor: question.userAnswer ? Colors.BGGREEN : Colors.BGRED,
        }}>
        <div className="columns">
          <div className="column">
            <p className="task">{question.task}</p>
            <span className="textBlock" role="textbox">
              {question.text ? (
                question.text
                  .split('\n')
                  .map((el, index) => <span key={index}>{el}</span>)
              ) : (
                <span>???</span>
              )}
            </span>
          </div>
          <div className="column">
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
        </div>
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
  );
}
