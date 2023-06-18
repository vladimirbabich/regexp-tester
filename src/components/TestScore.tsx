import React, { useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestScore.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { ITestScore } from '../models/componentModels';
import { timeFormatController } from '../controllers/TimeFormatController';
import TestScoreController from '../controllers/TestScoreController';
import QuizScoreController from '../controllers/QuizScoreController';
import { LocalStorageController } from '../controllers/StorageController';
import { useSendUserQuizMutation } from '../features/api/apiSlice';

const localStorageController = new LocalStorageController();
export default function TestScore({
  askedQuestions,
  timeSpent,
  quizQuestions,
  handleRestartClick,
}: ITestScore) {
  const [sendUserQuiz] = useSendUserQuizMutation();

  const [quizScoreValues] = useState<QuizScoreController | undefined>(
    quizQuestions
      ? new QuizScoreController(quizQuestions, parseFloat(timeSpent.toFixed(8)))
      : undefined
  );
  useEffect(() => {
    if (quizScoreValues) {
      const formData = {
        userId: localStorageController.getUsersKey('id'),
        quizId: 1,
        timeSpent: timeSpent,
        score: quizScoreValues.score,
      };
      console.log(formData);
      sendUserQuiz(formData);
    }
  }, [quizScoreValues]);

  if (quizScoreValues) {
    return (
      <div className="appOverlay">
        <div className="testScore">
          <span className="title">Test "Regexp quiz" completed!</span>
          <div className="row">
            <span className="resultKey">Score:</span>
            <span className="resultValue">
              {Number.isNaN(quizScoreValues.score) ? 0 : quizScoreValues.score}
            </span>
          </div>
          <div className="row">
            <span className="resultKey">Time spent:</span>
            <span className="resultValue">
              {timeFormatController.getModifiedTimeSpent(timeSpent)}
            </span>
          </div>
          <div className="row">
            <span className="resultKey">Correct answers:</span>
            <span className="resultValue">{quizScoreValues.rightAmount}</span>
          </div>
          <div className="row">
            <span className="resultKey">Partially correct answers:</span>
            <span className="resultValue">
              {quizScoreValues.partiallyAmount}
            </span>
          </div>

          <div className="rowHandlers">
            <Link to="/leaderboard" className="link">
              Leaderboard
            </Link>
            <span className="link" onClick={handleRestartClick}>
              Start again
            </span>
            <Link to="/results" className="link">
              Watch answers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (askedQuestions) {
    const testScoreValues = new TestScoreController(
      askedQuestions,
      parseFloat(timeSpent.toFixed(8))
    );

    return (
      <div className="appOverlay">
        <div className="testScore">
          <span className="title">
            Test {testScoreValues.ansCount > 0 ? 'completed' : 'over'}!
          </span>
          <div className="row">
            <span className="resultKey">Score:</span>
            <span className="resultValue">
              {Math.round(
                Number.isNaN(testScoreValues.score) ? 0 : testScoreValues.score
              )}
            </span>
          </div>
          <div className="row">
            <span className="resultKey">Time spent:</span>
            <span className="resultValue">
              {timeFormatController.getModifiedTimeSpent(timeSpent)}
            </span>
          </div>
          <div className="row">
            <span className="resultKey">Answered questions:</span>
            <span className="resultValue">{testScoreValues.ansCount}</span>
          </div>
          <div className="row">
            <span className="resultKey">Average difficulty:</span>
            <span className="resultValue">{testScoreValues.ansDiff}</span>
          </div>
          <div className="row">
            <span className="resultKey">Skipped questions:</span>
            <span className="resultValue">{testScoreValues.skpCount}</span>
          </div>
          <div className="row">
            <span className="resultKey subKey">Average difficulty:</span>
            <span className="resultValue">{testScoreValues.skpDiff}</span>
          </div>
          <div className="rowHandlers">
            <Link to="/leaderboard" className="link">
              Leaderboard
            </Link>
            <span className="link" onClick={handleRestartClick}>
              Start again
            </span>
            <Link
              to="/results"
              className={
                testScoreValues.ansCount > 0 ? 'link' : 'link btnDisabled'
              }>
              Watch answers
            </Link>
          </div>
        </div>
      </div>
    );
  }
  console.log(askedQuestions);
  return (
    <div className="appOverlay">
      <div className="testScore">
        <div>Questions not found!</div>
      </div>
    </div>
  );
}
