import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setIsTestOver } from '../features/testForm/testFormSlice';
import './../styles/Timer.scss';
function getFormattedTime(timestamp: number) {
  if (timestamp < 0) timestamp = 0;
  const date = new Date(timestamp * 1000);
  const offsetHours = date.getTimezoneOffset() / 60;
  const hours = date.getHours() + offsetHours;
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  if (hours === 0)
    return `${minutes.substring(
      minutes.length - 2,
      minutes.length
    )}:${seconds.substring(seconds.length - 2, seconds.length)}`;
  else {
    console.log('g2');
    return `${hours}:${minutes.substring(
      minutes.length - 2,
      minutes.length
    )}:${seconds.substring(seconds.length - 2, seconds.length)}`;
  }
}

type TimerProps = {
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  timeAmount: number;
  setTimeAmount: React.Dispatch<React.SetStateAction<number>>;
  isCountDown?: boolean;
};

export default function Timer({
  isTimerActive,
  setIsTimerActive,
  timeAmount,
  setTimeAmount,
  isCountDown,
}: TimerProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let timeInterval: NodeJS.Timer | undefined = undefined;
    if (!isTimerActive) {
      if (timeInterval) {
        return () => {
          clearInterval(timeInterval);
        };
      }
      return;
    }
    timeInterval = setInterval(() => {
      // console.warn(1);
      const timerTick = isCountDown ? -1 : 1;
      setTimeAmount((prev) => (prev += timerTick));
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [setTimeAmount, isTimerActive, isCountDown]);

  useEffect(() => {
    if (isCountDown && timeAmount < 1) {
      setIsTimerActive(false);
      dispatch(setIsTestOver(true));
    }
  }, [timeAmount]);

  return (
    <div
      className="timerBlock"
      onClick={(e) => {
        // if (timeAmount > 0) setIsTimerActive(!isTimerActive);
      }}>
      <span>Time{isCountDown && ' left'}:</span>
      <span style={{ marginLeft: '2px' }}>{getFormattedTime(timeAmount)}</span>
    </div>
  );
}
