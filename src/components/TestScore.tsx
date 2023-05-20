import React from 'react';
import './../App.scss';
import './../styles/TestScore.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { restartTest } from '../features/testForm/testFormSlice';
import { ITestScore } from '../models/componentModels';

export default function TestScore({ skippedAmount, solvedAmount }: ITestScore) {
  const dispatch = useAppDispatch();
  function handleStartTestClick(e: React.MouseEvent) {
    e.preventDefault();
    // console.log(isTestOver);
    dispatch(restartTest());
    return 1;
  }
  const solvedPercent = parseInt(
    ((solvedAmount / (solvedAmount + skippedAmount)) * 100).toFixed(0)
  );
  return (
    <div className="testScore">
      <span className="title">Test completed!</span>
      <div className="row">
        <span className="resultKey">solved questions:</span>
        <span className="resultValue">{solvedAmount}</span>
      </div>
      {!isNaN(solvedPercent) ? (
        <div className="row">
          <span className="resultKey">solved questions percent</span>
          <span className="resultValue">{solvedPercent}%</span>
        </div>
      ) : null}
      <div className="row">
        <span className="resultKey">skipped questions:</span>
        <span className="resultValue">{skippedAmount}</span>
      </div>
      <div className="rowHandlers">
        <Link to="/leaderboard" className="link">
          Leaderboard
        </Link>
        <span className="link" onClick={handleStartTestClick}>
          Start again
        </span>
        <Link
          to="/results"
          className={
            skippedAmount + solvedAmount === 0 ? 'link btnDisabled' : 'link'
          }>
          Watch answers
        </Link>
      </div>
    </div>
  );
}
