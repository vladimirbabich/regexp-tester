import './../styles/Leaderboard.scss';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import {
  useLazyGetTestsForModeQuery,
  useLazyGetUserQuizzesForModeQuery,
} from '../features/api/apiSlice';
import {
  ILeaderboardColumnSetting,
  ILeaderboardFetchInfo,
  IQuizResult,
  ITestResult,
} from '../models/objectModels';
import { setUserToken } from '../features/global/globalSlice';
import { useAppDispatch } from '../app/hooks';
import { metaTagsController } from '../controllers/MetaTagsController';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { callApi, callbacks } from '../controllers/LeaderboardUpdateController';

const defaultLimit = 3;
export default function Leaderboard({
  mode = 'all-questions',
}: {
  mode: string;
}) {
  const [limit, setLimit] = useState<number>(defaultLimit);
  const dispatch = useAppDispatch();
  const [activeMode, setActiveMode] = useState<string>(mode);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log('limit: ' + limit);
    if (activeMode === 'quiz') {
      callApi(
        getUserQuizzes,
        { id: 1, limit },
        callbacks.responseUserQuizzes(setResults, setRecordsAmount),
        callbacks.errorUserQuizzes(setResults)
      );
    } else {
      callApi(
        getTests,
        { modeName: activeMode, limit },
        callbacks.responseTests(setResults, setRecordsAmount),
        callbacks.errorTests(setResults)
      );
    }
  }, [limit]);
  const [
    getTests,
    {
      data: fetchedTestData,
      error: fetchedTestError,
      isLoading: fetchedTestIsLoading,
    },
  ] = useLazyGetTestsForModeQuery();
  const [
    getUserQuizzes,
    {
      data: fetchedQuizData,
      error: fetchedQuizError,
      isLoading: fetchedQuizIsLoading,
    },
  ] = useLazyGetUserQuizzesForModeQuery();

  const [results, setResults] = useState<ITestResult[] | IQuizResult[]>();
  const [recordsAmount, setRecordsAmount] = useState<number>(0);

  useEffect(() => {
    console.log('results');
    console.log(results);
  }, [results]);

  useEffect(() => {
    if (fetchedQuizIsLoading || fetchedTestIsLoading) {
      setIsDataLoading(true);
      console.log('true');
    } else setIsDataLoading(false);
  }, [fetchedQuizIsLoading, fetchedTestIsLoading]);

  useEffect(() => {
    setLimit(defaultLimit);
    if (activeMode === 'quiz') {
      callApi(
        getUserQuizzes,
        { id: 1, defaultLimit },
        callbacks.responseUserQuizzes(setResults, setRecordsAmount),
        callbacks.errorUserQuizzes(setResults)
      );
    } else {
      callApi(
        getTests,
        { modeName: activeMode, defaultLimit },
        callbacks.responseTests(setResults, setRecordsAmount),
        callbacks.errorTests(setResults)
      );
    }
  }, [activeMode]);

  const restartRoute = `/${activeMode}`;

  const testModes = [
    {
      id: 'all-questions',
      label: 'All questions',
    },
    {
      id: 'minutes-5',
      label: '5 minutes',
    },
    // {
    //   id: 'only-flags',
    //   label: 'Only flags',
    // },
  ];
  const quizModes = [
    {
      id: 'quiz',
      label: 'All questions',
    },
  ];
  const defaultColumns: ILeaderboardColumnSetting[] = [
    {
      name: 'User',
      description: undefined,
      attribute: 'username',
    },
    {
      name: 'Date',
      description: undefined,
      attribute: 'createdAt',
    },
    { name: 'Score', description: undefined, attribute: 'score' },
  ];
  const additionalTestColumns: ILeaderboardColumnSetting[] = [
    {
      name: 'Time spent',
      description: undefined,
      attribute: 'timeSpent',
    },
    {
      name: 'AQ',
      description: 'Number of answered questions',
      attribute: 'ansCount',
    },
    {
      name: 'AD',
      description: 'Average difficulty of answered questions',
      attribute: 'ansDiff',
    },
    {
      name: 'SQ',
      description: 'Number of skipped questions',
      attribute: 'skpCount',
    },
    {
      name: 'SD',
      description: 'Average difficulty of skipped questions',
      attribute: 'skpDiff',
    },
  ];
  const additionalQuizColumns: ILeaderboardColumnSetting[] = [
    {
      name: 'Time spent',
      description: 'Does not affect score',
      attribute: 'timeSpent',
    },
  ];

  return (
    <div className="leaderboard">
      <h1 className="h1Title">{`Leaderboard: ${
        testModes[testModes.map((el) => el.id).indexOf(activeMode)]?.label ||
        quizModes[quizModes.map((el) => el.id).indexOf(activeMode)]?.label ||
        'Incorrect mode, try reload!'
      }`}</h1>
      <div className="leaderboardContent">
        <div
          className="leaderboardSettings"
          onChange={async (e: FormEvent<HTMLDivElement>) => {
            const mode = (e.target as HTMLButtonElement).value;
            setResults(undefined);
            setIsDataLoading(true);
            setActiveMode(mode);
          }}>
          <span className="settingsTitle">Test modes:</span>
          {testModes.map((mode) => (
            <div className="radioItem" key={mode.id}>
              <input
                className="radioBtn"
                id={mode.id}
                type="radio"
                name="radio"
                value={mode.id}
                defaultChecked={activeMode === mode.id}
              />
              <label htmlFor={mode.id}>{mode.label}</label>
            </div>
          ))}
          <span className="settingsTitle">Quiz modes:</span>
          {quizModes.map((mode) => (
            <div className="radioItem" key={mode.id}>
              <input
                className="radioBtn"
                id={mode.id}
                type="radio"
                name="radio"
                value={mode.id}
                defaultChecked={activeMode === mode.id}
              />
              <label htmlFor={mode.id}>{mode.label}</label>
            </div>
          ))}

          <div className="restartBlock">
            <Link to={restartRoute}>Restart test</Link>
          </div>
        </div>
        <LeaderboardTable
          data={results}
          isDataLoading={isDataLoading}
          columns={
            activeMode === 'quiz'
              ? [...defaultColumns, ...additionalQuizColumns]
              : [...defaultColumns, ...additionalTestColumns]
          }
          dataOnServerCount={recordsAmount}
          setLimit={setLimit}></LeaderboardTable>
      </div>
    </div>
  );
}
