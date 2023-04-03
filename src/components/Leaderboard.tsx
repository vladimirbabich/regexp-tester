import './../styles/Leaderboard.scss';
import { testData, testData2 } from '../leaderboard';
import LeaderboardTable from './LeaderboardTable';
import { Link } from 'react-router-dom';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';

export default function Leaderboard({
  title,
  defaultMode = 'min5',
}: {
  title: string;
  defaultMode: string;
}) {
  const [data, setData] = useState<Object[]>([
    ...testData2[defaultMode as keyof typeof testData],
  ]);

  const [activeMode, setActiveMode] = useState<string>(defaultMode);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const restartRoute = activeMode == 'min5' ? '/' : `/${activeMode}`;
  return (
    <div className="leaderboard">
      <h1 className="h1Title">{title}</h1>
      <div className="leaderboardContent">
        <div
          className="leaderboardSettings"
          onChange={(e: FormEvent<HTMLDivElement>) => {
            const mode = (e.target as HTMLButtonElement).value;
            setActiveMode((prev) => {
              setData(testData2[mode as keyof typeof testData]);
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
              checked={activeMode === 'min5'}
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
              checked={activeMode === 'all'}
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
              checked={activeMode === 'flags'}
            />
            <label htmlFor="flags">flags</label>
          </div>
        </div>
        {data?.length > 0 ? (
          <LeaderboardTable data={data}></LeaderboardTable>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
      <div className="restartBlock">
        <Link to={restartRoute}>Restart test</Link>
      </div>
    </div>
  );
}
