import './../styles/Leaderboard.scss';
import { testData, testData2 } from '../leaderboard';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useGetAllTestsForModeQuery } from '../features/api/apiSlice';
import { ITestResult } from '../Models';

export default function Leaderboard({
  title,
  mode = 'min5',
}: {
  title: string;
  mode: string;
}) {
  const [limit, setLimit] = useState<number>(20);
  // useEffect(() => {
  // console.log(limit);
  // }, [limit]);

  const [activeMode, setActiveMode] = useState<string>(mode);
  const {
    data: fetchedData,
    error: fetchedDataError,
    isLoading: fetchedDataIsLoading,
  } = useGetAllTestsForModeQuery({ modeName: activeMode, limit });
  const [results, setResults] = useState<ITestResult[]>([]);
  useEffect(() => {
    // console.log('results');
    // console.log(results);
    // console.log(activeMode);
  }, [results]);
  const [testsCount, setTestsCount] = useState<number>(0);
  useEffect(() => {
    // console.log('fetchedData');
    // console.log(fetchedData);
    if (fetchedData && (fetchedData.tests.length == 0 || !fetchedData.tests)) {
      setResults([]);
      setTestsCount(0);
    }

    if (fetchedData && fetchedData?.tests?.length > 0) {
      console.log(fetchedData.token);
      if (fetchedData?.token) {
        //update token
        localStorage.setItem('userToken', fetchedData?.token);
      }
      setTestsCount(fetchedData.count);
      const sortedData: ITestResult[] = [...fetchedData.tests];
      sortedData.sort((a: any, b: any) => {
        return a.score > b.score ? -1 : 1;
      });
      setResults([
        ...sortedData.map((el: any) => {
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

  useEffect(() => {
    // console.log('activeMode: ' + activeMode);
    // console.log(fetchedData);
  }, [activeMode]);

  const restartRoute = activeMode == 'min5' ? '/' : `/${activeMode}`;
  return (
    <div className="leaderboard">
      <h1 className="h1Title">{title}</h1>
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
          <div className="radioItem">
            <input
              className="radioBtn"
              id="min5"
              type="radio"
              name="radio"
              value="min5"
              defaultChecked={activeMode === 'min5'}
            />
            <label htmlFor="min5">5 minutes</label>
          </div>
          <div className="radioItem">
            <input
              className="radioBtn"
              id="all"
              type="radio"
              name="radio"
              value="all"
              defaultChecked={activeMode === 'all'}
            />
            <label htmlFor="all">all questions</label>
          </div>
          <div className="radioItem">
            <input
              className="radioBtn"
              id="flags"
              type="radio"
              name="radio"
              value="flags"
              defaultChecked={activeMode === 'flags'}
            />
            <label htmlFor="flags">flags</label>
          </div>
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
            Connection error, try again!
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
