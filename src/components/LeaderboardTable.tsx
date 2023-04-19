import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import {
  setIsNotificationActive,
  setNotificationText,
} from '../features/global/globalSlice';
import './../styles/LeaderboardTable.scss';
import Notification from './Notification';

export default function LeaderboardTable({ data }: any) {
  const columnNames = [
    '#',
    'User',
    'Date',
    'Score',
    'Time spent',
    'NA',
    'AD',
    'NS',
    'AD',
    'Version',
  ];
  const columnDescriptions = [
    ,
    ,
    ,
    ,
    ,
    'Number of answered questions',
    'Average difficulty of answered questions',
    'Number of skipped questions',
    'Average difficulty of skipped questions',
    'Each time new questions are added, the version is updated',
  ];
  const subColumnNames = ['count', 'avg diff'];
  let answeredIndex;
  const dispatch = useAppDispatch();

  return (
    <div id="tableWrapper">
      <div id="tableScroll">
        <table className="leaderboardTable">
          <thead>
            <tr className="layoutedTR">
              {columnNames.map((el, index) => (
                <th
                  className={
                    columnDescriptions[index]
                      ? 'layoutedTH hasDescription'
                      : 'layoutedTH'
                  }
                  key={index}
                  onMouseEnter={() => {
                    dispatch(setNotificationText(columnDescriptions[index]));
                  }}
                  onMouseLeave={() => {
                    dispatch(setNotificationText(''));
                  }}>
                  {el}
                </th>
              ))}
            </tr>
            {/* <tr>

            <span
                className="hint--top hint--info"
                aria-label="skipped questions">
                {skippedQuestionsAmount}
              </span>

              <th key={'empty'}></th>
              {subColumnNames.map((el, index) => (
                // el == 'Answered' || el == 'Skipped' ? (
                <th key={index}>{el}</th>
              ))}
              {subColumnNames.map((el, index) => (
                // el == 'Answered' || el == 'Skipped' ? (
                <th key={index}>{el}</th>
              ))}
            </tr> */}
          </thead>
          <tbody>
            {data.map((record: any, index: number) => {
              return (
                <tr className="layoutedTR" key={index}>
                  <th className="layoutedTH" key={index + 1}>
                    {index}
                  </th>
                  <th className="layoutedTH" key="username">
                    {record.username}
                  </th>
                  <th className="layoutedTH" key="createdAt">
                    {record.createdAt}
                  </th>
                  <th className="layoutedTH" key="score">
                    {record.score}
                  </th>
                  <th className="layoutedTH" key="timeSpent">
                    {record.timeSpent}
                  </th>
                  <th className="layoutedTH" key="ansCount">
                    {record.ansCount}
                  </th>
                  <th className="layoutedTH" key="ansDiff">
                    {record.ansDiff}
                  </th>
                  <th className="layoutedTH" key="skpCount">
                    {record.skpCount}
                  </th>
                  <th className="layoutedTH" key="skpDiff">
                    {record.skpDiff}
                  </th>
                  <th className="layoutedTH" key="version">
                    {record.version}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
