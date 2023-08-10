import './../styles/Leaderboard.scss';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import {
  useLazyGetTestsForModeQuery,
  useLazyGetUserQuizzesForModeQuery,
} from '../features/services/apiService';
import {
  ILeaderboardColumnSetting,
  IQuizResult,
  ITestResult,
} from '../models/objectModels';
import { callApi, callbacks } from '../controllers/LeaderboardUpdateController';

const defaultLimit = 5;
export default function Leaderboard({
  mode = 'all-questions',
}: {
  mode: string;
}) {
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [activeMode, setActiveMode] = useState<string>(mode);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  useEffect(() => {
    if (limit <= defaultLimit) return;

    if (activeMode === 'quiz') {
      const abortionCallback = callApi(
        getUserQuizzes,
        { id: 1, limit },
        callbacks.responseUserQuizzes(setResults, setRecordsAmount),
        callbacks.errorUserQuizzes(setResults)
      );
      return abortionCallback;
    } else {
      const abortionCallback = callApi(
        getTests,
        { modeName: activeMode, limit },
        callbacks.responseTests(setResults, setRecordsAmount),
        callbacks.errorTests(setResults)
      );
      return abortionCallback;
    }
  }, [limit]);

  const [getTests, { isLoading: fetchedTestIsLoading }] =
    useLazyGetTestsForModeQuery();
  const [getUserQuizzes, { isLoading: fetchedQuizIsLoading }] =
    useLazyGetUserQuizzesForModeQuery();

  const [results, setResults] = useState<ITestResult[] | IQuizResult[]>();
  const [recordsAmount, setRecordsAmount] = useState<number>(0);

  useEffect(() => {
    if (fetchedQuizIsLoading || fetchedTestIsLoading) {
      setIsDataLoading(true);
    } else setIsDataLoading(false);
  }, [fetchedQuizIsLoading, fetchedTestIsLoading]);

  useEffect(() => {
    setLimit(defaultLimit);
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
  }, [activeMode]);

  const restartRoute = `/${activeMode}`;

  const testModes = [
    {
      id: 'all-questions',
      label: 'OE: All questions',
    },
    {
      id: 'minutes-5',
      label: 'OE: 5 minutes',
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
      description: 'Does not affect the score',
      attribute: 'timeSpent',
    },
  ];
  const [modeInfo, setModeInfo] = useState<{ name: string; label: string }>({
    name:
      testModes.map((el) => el.id).indexOf(activeMode) > -1
        ? 'Test'
        : quizModes.map((el) => el.id).indexOf(activeMode) > -1
        ? 'Quiz'
        : '???',

    label:
      testModes[testModes.map((el) => el.id).indexOf(activeMode)]?.label ||
      quizModes[quizModes.map((el) => el.id).indexOf(activeMode)]?.label ||
      'Incorrect mode, try reload!',
  });

  return (
    <div className="leaderboard">
      <h1 className="h1Title">{`Leaderboard of ${modeInfo.name}: ${modeInfo.label}`}</h1>
      <div className="leaderboardContent">
        <div
          className="leaderboardSettings"
          onChange={async (e: FormEvent<HTMLDivElement>) => {
            const mode = (e.target as HTMLButtonElement).value;
            setResults(undefined);
            setIsDataLoading(true);
            setActiveMode(mode);
            setModeInfo({
              name:
                testModes.map((el) => el.id).indexOf(mode) > -1
                  ? 'Test'
                  : quizModes.map((el) => el.id).indexOf(mode) > -1
                  ? 'Quiz'
                  : '???',

              label:
                testModes[testModes.map((el) => el.id).indexOf(mode)]?.label ||
                quizModes[quizModes.map((el) => el.id).indexOf(mode)]?.label ||
                'Incorrect mode, try reload!',
            });
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
            <Link to={restartRoute}>Start {modeInfo.name}</Link>
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
