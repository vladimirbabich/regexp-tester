import './../styles/Leaderboard.scss';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useGetAllTestsForModeQuery } from '../features/api/apiSlice';
import { ITestResult } from '../models/objectModels';
import { setUserToken } from '../features/global/globalSlice';
import { useAppDispatch } from '../app/hooks';
import { metaTageController } from '../controllers/MetaTagsController';

export default function Leaderboard({
  mode = 'all-questions',
}: {
  mode: string;
}) {
  const [limit, setLimit] = useState<number>(20);
  const dispatch = useAppDispatch();
  const [activeMode, setActiveMode] = useState<string>(mode);
  const {
    data: fetchedData,
    error: fetchedDataError,
    isLoading: fetchedDataIsLoading,
  } = useGetAllTestsForModeQuery({ modeName: activeMode, limit });

  const [results, setResults] = useState<ITestResult[]>([]);
  const [testsCount, setTestsCount] = useState<number>(0);
  useEffect(() => {
    metaTageController.setTitle(`Leaderboard - Retester`);
  }, []);

  useEffect(() => {}, [results]);

  useEffect(() => {
    if (fetchedData && (fetchedData.tests.length === 0 || !fetchedData.tests)) {
      setResults([]);
      setTestsCount(0);
    }
    if (fetchedData && fetchedData?.tests?.length > 0) {
      if (fetchedData?.token) {
        //update token
        dispatch(setUserToken(fetchedData.token));
      }
      setTestsCount(fetchedData.count);
      const tableData: ITestResult[] = [...fetchedData.tests];
      setResults([
        ...tableData.map((el: ITestResult) => {
          const ansDiff = parseFloat(el.ansDiff).toFixed(2);
          const skpDiff =
            el.skpDiff == null ? '-' : parseFloat(el.skpDiff).toFixed(2);
          const createdAt = el.createdAt.split('T')[0];
          const ITestResult: ITestResult = {
            id: el.id,
            username: el.username,
            score: el.score,
            createdAt,
            timeSpent: el.timeSpent,
            ansCount: el.ansCount,
            ansDiff,
            skpCount: el.skpCount,
            skpDiff,
            version: el.version,
          };
          return ITestResult;
        }),
      ]);
    }
  }, [fetchedData]);

  const restartRoute = `/${activeMode}`;

  const modes = [
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

  return (
    <div className="leaderboard">
      <h1 className="h1Title">{`Leaderboard: ${
        modes[modes.map((el) => el.id).indexOf(activeMode)]?.label ||
        'All questions'
      }`}</h1>
      <div className="leaderboardContent">
        <div
          className="leaderboardSettings"
          onChange={async (e: FormEvent<HTMLDivElement>) => {
            const mode = (e.target as HTMLButtonElement).value;
            console.log('mode');
            console.log(mode);

            setActiveMode((prev) => {
              // setData(fetchedData);

              return mode;
            });
          }}>
          <span className="settingsTitle">Modes:</span>
          {modes.map((mode) => (
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
        {fetchedDataIsLoading && (
          <p className="leaderboardNotification">
            Loading...{`${fetchedDataIsLoading} - ${fetchedDataError}`}
          </p>
        )}
        {!fetchedDataIsLoading && fetchedDataError && (
          <p className="leaderboardNotification">
            Connection error, try again!{' '}
            {Object.keys(fetchedDataError).map(
              (el) =>
                `${el}: ${
                  fetchedDataError[el as keyof typeof fetchedDataError]
                }`
            )}
          </p>
        )}
        {results?.length > 0 && !fetchedDataError ? (
          <LeaderboardTable
            data={results}
            dataOnServerCount={testsCount}
            setLimit={setLimit}></LeaderboardTable>
        ) : (
          !fetchedDataError && (
            <p className="leaderboardNotification">No results were found!</p>
          )
        )}
      </div>
    </div>
  );
}
