import { useState } from 'react';
import './../styles/LeaderboardTable.scss';

export default function LeaderboardTable({ data }: any) {
  return (
    <div id="tableWrapper">
      <div id="tableScroll">
        <table className="leaderboardTable">
          <thead>
            <tr>
              {Object.keys(data[0]).map((el) => (
                <th>
                  <span className="text">{el}</span>
                </th>
              ))}
            </tr>
          </thead>
          {data.map((record: any) => {
            return (
              <tr>
                {Object.values(record).map((value: any) => (
                  <th>{value}</th>
                ))}
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
