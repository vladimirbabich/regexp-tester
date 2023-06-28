import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setNotificationText } from '../features/global/globalSlice';
import { LocalStorageController } from '../controllers/StorageController';
import './../styles/LeaderboardTable.scss';
import { ILeaderboardTable } from '../models/componentModels';
import { IQuizResult, ITestResult } from '../models/objectModels';
import { timeFormatController } from '../controllers/TimeFormatController';
if (navigator.userAgent.includes('Firefox')) {
  require('./../styles/FirefoxSpecificLeaderboardTable.scss');
}

export default function LeaderboardTable({
  data,
  setLimit,
  columns,
  dataOnServerCount,
  isDataLoading,
}: ILeaderboardTable) {
  const USERNAME_MAX_LENGTH = 9;

  const localStorageController = new LocalStorageController();
  const userNickname = localStorageController.getUsersKey('nickname');
  const dispatch = useAppDispatch();

  const lastRowRef = useRef(null);
  useEffect(() => {
    const currentLastRowRef = lastRowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLimit((prev: number) => {
            if (prev >= dataOnServerCount) return prev;
            return prev + 5;
          });
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (currentLastRowRef) {
      observer.observe(currentLastRowRef);
    }

    return () => {
      if (currentLastRowRef) {
        observer.unobserve(currentLastRowRef);
      }
    };
  }, [lastRowRef, data]);

  if (!data) {
    return (
      <div id="tableWrapper">
        <p>Loading...</p>
      </div>
    );
  }

  if (data && data.length < 1) {
    return (
      <div id="tableWrapper">
        <p>No records found.</p>
      </div>
    );
  }

  return (
    <div id="tableWrapper">
      <div id="tableScroll">
        <table className="leaderboardTable">
          <thead>
            <tr className="layoutedTR">
              <th className="layoutedTH" key={'rowindex'}>
                #
              </th>
              {columns.map(({ name }, index) => {
                return (
                  <th
                    className={
                      columns[index].description
                        ? 'layoutedTH hasDescription'
                        : 'layoutedTH'
                    }
                    key={index}
                    onMouseEnter={() => {
                      dispatch(setNotificationText(columns[index].description));
                    }}
                    onMouseLeave={() => {
                      dispatch(setNotificationText(''));
                    }}>
                    {name}
                    {columns[index].description && (
                      <span className="notificationTip">?</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((record: ITestResult | IQuizResult, index: number) => {
              return (
                <tr
                  className={
                    record.username === userNickname
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
                  {columns.map((column) => {
                    if (column.attribute === 'username') {
                      const recordAttribute =
                        record[column.attribute as keyof typeof record] + '';
                      return (
                        <th
                          className="layoutedTH"
                          key="username"
                          onMouseEnter={() => {
                            if (recordAttribute.length > USERNAME_MAX_LENGTH) {
                              dispatch(setNotificationText(recordAttribute));
                            }
                          }}
                          onMouseLeave={() => {
                            if (record.username.length > USERNAME_MAX_LENGTH) {
                              dispatch(setNotificationText(''));
                            }
                          }}>
                          {recordAttribute.length > USERNAME_MAX_LENGTH
                            ? record.username.substring(
                                0,
                                USERNAME_MAX_LENGTH - 3
                              ) + '...'
                            : record.username}
                        </th>
                      );
                    }
                    if (column.attribute === 'createdAt') {
                      const recordAttribute =
                        record[column.attribute as keyof typeof record] + '';
                      return (
                        <th className="layoutedTH" key="createdAt">
                          {timeFormatController.getDaysBetweenDates(
                            recordAttribute
                          )}
                        </th>
                      );
                    }
                    if (column.attribute === 'timeSpent') {
                      const recordAttribute =
                        record[column.attribute as keyof typeof record] + '';
                      return (
                        <th className="layoutedTH" key="timeSpent">
                          {timeFormatController.getModifiedTimeSpent(
                            recordAttribute
                          )}
                        </th>
                      );
                    } else {
                      const recordAttribute =
                        record[column.attribute as keyof typeof record] + '';
                      return (
                        <th className="layoutedTH" key={column.attribute}>
                          {recordAttribute}
                        </th>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
