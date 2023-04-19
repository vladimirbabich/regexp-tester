import './../styles/Leaderboard.scss';
import { testData, testData2 } from '../leaderboard';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import {
  useGetAllTestsForModeQuery,
  useLazyGetAllTestsForModeQuery,
} from '../features/api/apiSlice';
import { TestResult } from '../Models';

export default function Leaderboard({
  title,
  mode = 'min5',
}: {
  title: string;
  mode: string;
}) {
  const [activeMode, setActiveMode] = useState<string>(mode);
  const {
    data: fetchedData,
    error: fetchedDataError,
    isLoading: fetchedDataIsLoading,
  } = useGetAllTestsForModeQuery(activeMode);
  const [results, setResults] = useState<TestResult[]>([]);
  useEffect(() => {
    // setData(fetchedData);
    console.log(fetchedData);
    if (fetchedData && fetchedData.length > 0) {
      const sortedData: TestResult[] = [...fetchedData];
      sortedData.sort((a: any, b: any) => {
        console.log(a, b);
        return a.score > b.score ? -1 : 1;
      });
      console.log(sortedData);
      console.log(fetchedData);
      setResults([
        ...sortedData.map((el: any) => {
          const ansDiff = parseFloat(el.ansDiff).toFixed(2);
          const skpDiff =
            el.skpDiff == null ? '-' : parseFloat(el.skpDiff).toFixed(2);
          console.log(el);
          const createdAt = el.createdAt.split('T')[0];
          console.log(el.skpDiff == null);
          console.log(el.skpDiff);
          const testResult: TestResult = {
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
          return testResult;
        }),
      ]);
    }
  }, [fetchedData]);
  useEffect(() => {
    console.log('activeMode: ' + activeMode);
    console.log(fetchedData);
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
          <LeaderboardTable data={results}></LeaderboardTable>
        ) : (
          !fetchedDataError && (
            <p className="leaderboardNotification">No results were found!</p>
          )
        )}
      </div>
      <div className="restartBlock">
        <Link to={restartRoute}>Restart test</Link>
      </div>
    </div>
  );
}
