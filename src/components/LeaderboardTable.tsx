import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setNotificationText } from '../features/global/globalSlice';
import { LocalStorageController } from '../StorageController';
import './../styles/LeaderboardTable.scss';
import Notification from './Notification';

interface ILeaderboardTable {
  data: Object;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}
export default function LeaderboardTable({
  data,
  setLimit,
  dataOnServerCount,
}: any) {
  const USERNAME_MAX_LENGTH = 9;
  const columnNames = [
    '#',
    'User',
    'Date',
    'Score',
    'Time spent',
    'AQ',
    'AD',
    'SQ',
    'SD',
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
  ];

  const subColumnNames = ['count', 'avg diff'];
  const localStorageController = new LocalStorageController();
  const userNickname = localStorageController.getUsersKey('nickname');
  const dispatch = useAppDispatch();

  const lastRowRef = useRef(null);

  function getDaysBetweenDates(str: string) {
    var dateMillis = Date.parse(str);
    const todayMillis = Date.parse(new Date().toString());
    var diffMillis = Math.abs(dateMillis - todayMillis);
    var diffDays = Math.ceil(diffMillis / (1000 * 60 * 60 * 24));
    // if (diffDays == 0) return 'today';
    if (diffDays <= 2) return 'yesterday';
    if (diffDays < 32) return `${diffDays} day's ago`;
    return `${Math.floor(diffDays / 31)} month's ago`;
  }

  function getModifiedTimeSpent(str: string) {
    const time = new Date(parseInt(str) * 1000).toISOString().slice(11, 19);
    const [hours, minutes, seconds] = time.split(':');
    if (hours != '00') return `${hours}:${minutes}:${seconds}`;
    if (minutes != '00') return `${minutes}:${seconds}`;
    return `${
      seconds.startsWith('0') ? seconds.replace('0', '') : seconds
    } sec.`;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // console.log(limit, dataOnServerCount);
          // Changing limit to get more data from server
          setLimit((prev: number) => {
            if (prev >= dataOnServerCount) return prev;
            return prev + 10;
          });
          // !optimization: can get count of all rows in table, and check if limit> count - return
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (lastRowRef.current) {
      observer.observe(lastRowRef.current);
    }

    return () => {
      if (lastRowRef.current) {
        observer.unobserve(lastRowRef.current);
      }
    };
  }, [lastRowRef, data]);

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
                  {columnDescriptions[index] && (
                    <span className="notificationTip">?</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record: any, index: number) => {
              return (
                <tr
                  className={
                    record.username == userNickname
                      ? 'layoutedTR recordOwner'
                      : 'layoutedTR'
                  }
                  key={index}>
                  {index === data.length - 1 ? (
                    <th className="layoutedTH" ref={lastRowRef} key={index + 1}>
                      {index + 1}
                    </th>
                  ) : (
                    <th className="layoutedTH" key={index + 1}>
                      {index + 1}
                    </th>
                  )}
                  <th
                    className="layoutedTH"
                    key="username"
                    onMouseEnter={() => {
                      if (record.username.length > USERNAME_MAX_LENGTH) {
                        dispatch(setNotificationText(record.username));
                      }
                    }}
                    onMouseLeave={() => {
                      if (record.username.length > USERNAME_MAX_LENGTH) {
                        dispatch(setNotificationText(''));
                      }
                    }}>
                    {record.username.length > USERNAME_MAX_LENGTH
                      ? record.username.substr(0, USERNAME_MAX_LENGTH - 2) +
                        '..'
                      : record.username}
                  </th>
                  <th className="layoutedTH" key="createdAt">
                    {getDaysBetweenDates(record.createdAt)}
                  </th>
                  <th className="layoutedTH" key="score">
                    {record.score}
                  </th>
                  <th className="layoutedTH" key="timeSpent">
                    {getModifiedTimeSpent(record.timeSpent)}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
