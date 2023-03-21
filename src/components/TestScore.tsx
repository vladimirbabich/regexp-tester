import React, { useContext, useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestScore.scss';
import DropDownPicker from './DropDownPicker';
import { TestInputProps } from '../types';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppDispatch } from '../app/hooks';
import { restartTest } from '../features/testForm/testFormSlice';

export default function TestScore({ skippedAmount, solvedAmount }: any) {
  const [solvedPercent, setSolvedPercent] = useState<number>(
    parseInt(((solvedAmount / (solvedAmount + skippedAmount)) * 100).toFixed(0))
  );
  const dispatch = useAppDispatch();

  function handleStartTest(e: any) {
    e.preventDefault();
    dispatch(restartTest());
    return 1;
  }
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
      <div className="rowBtns">
        <button className="btn">Leaderboard</button>
        <button className="btn" onClick={handleStartTest}>
          Start again
        </button>
        <button className="btn">Watch answers</button>
      </div>
    </div>
  );
}
