import './../styles/Leaderboard.scss';
import { testData } from '../leaderboard';
import LeaderboardTable from './LeaderboardTable';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';

export default function Leaderboard({
  title,
  defaultMode = 'min5',
}: {
  title: string;
  defaultMode: string;
}) {
  const [data, setData] = useState<Object[]>([
    ...testData[defaultMode as keyof typeof testData],
  ]);
  const [activeMode, setActiveMode] = useState<string>(defaultMode);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="leaderboard">
      <h1 className="title">{title}</h1>
      <div className="leaderboardContent">
        <div
          className="leaderboardSettings"
          onChange={(e: FormEvent<HTMLDivElement>) => {
            const mode = (e.target as HTMLButtonElement).value;
            setActiveMode((prev) => {
              setData(testData[mode as keyof typeof testData]);
              return mode;
            });
          }}>
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
              id="noflags"
              type="radio"
              name="radio"
              value="noflags"
              checked={activeMode === 'noflags'}
            />
            <label htmlFor="noflags">no flags</label>
          </div>
        </div>
        {data?.length > 0 ? (
          <LeaderboardTable data={data}></LeaderboardTable>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </div>
  );
}
