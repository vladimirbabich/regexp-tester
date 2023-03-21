import React, { useEffect, useRef, useState } from 'react';
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
            <span className="text">{question.text}</span>
          </div>
          <div className="expectedBlock">
            <span className="key">Expected result:</span>
            <span className="value">{question.expectedResult}</span>
          </div>
        </div>
        <div className="row">
          <div className="answerBlock">
            <span className="answerKey">
              Possible answer: {question.possibleAnswer}
            </span>
          </div>
        </div>
        <div className="row">
          {question?.userAnswer && (
            <div className="answerBlock">
              <span className="answerKey">
                Your answer: {question.userAnswer}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
