import React, { useContext, useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestScore.scss';
import DropDownPicker from './DropDownPicker';
import { Link } from 'react-router-dom';
import { TestInputProps } from '../Models';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { restartTest } from '../features/testForm/testFormSlice';

export default function TestScore({ skippedAmount, solvedAmount }: any) {
  const [solvedPercent, setSolvedPercent] = useState<number>(
    parseInt(((solvedAmount / (solvedAmount + skippedAmount)) * 100).toFixed(0))
  );
  const [userName, setUserName] = useState('');
  const defaultName = 'user';
  const dispatch = useAppDispatch();
  const genUserName = useAppSelector((state) => state.global.defaultNickname);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  function handleStartTest(e: any) {
    e.preventDefault();
    console.log(isTestOver);
    dispatch(restartTest());
    return 1;
  }
  function handleNickChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setUserName(target.value);
    console.log(userName);
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
      <div className="rowHandlers">
        <Link to="/leaderboard" className="link">
          Leaderboard
        </Link>
        <a className="link" onClick={handleStartTest}>
          Start again
        </a>
        <Link to="/results" className="link">
          Watch answers
        </Link>
      </div>
      <div className="saveNotification">
        <span>Saving result as: </span>
        <input
          className="nickChanger"
          onChange={handleNickChange}
          value={userName}
          placeholder={genUserName || defaultName}></input>
      </div>
    </div>
  );
}
