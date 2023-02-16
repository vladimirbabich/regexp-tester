import React, { useEffect, useState } from "react";
import "./../App.scss";
function getFormattedTime(timestamp: number) {
  if (timestamp < 0) timestamp = 0;
  const date = new Date(timestamp * 1000);
  const offsetHours = date.getTimezoneOffset() / 60;
  const hours = date.getHours() + offsetHours;
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  if (hours === 0)
    return `${minutes.substring(
      minutes.length - 2,
      minutes.length
    )}:${seconds.substring(seconds.length - 2, seconds.length)}`;
  else
    return `${hours}:${minutes.substring(
      minutes.length - 2,
      minutes.length
    )}:${seconds.substring(seconds.length - 2, seconds.length)}`;
}

type TimerProps = {
  isTimerActive: boolean;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
  timeAmount: number;
  setTimeAmount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Timer({
  isTimerActive,
  setIsTimerActive,
  timeAmount,
  setTimeAmount,
}: TimerProps) {
  //   const [timeAmount, setTimeAmount] = useState<number>(5); //300sec
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  //   let startTime: undefined | number = undefined;
  useEffect(() => {
    let timeInterval: NodeJS.Timer | undefined = undefined;
    if (!isTimerActive) {
      if (timeInterval) {
        console.log("here");
        return () => {
          clearInterval(timeInterval);
        };
      }
      return;
    }
    timeInterval = setInterval(() => {
      // console.log(timeAmount);
      setTimeAmount((prev) => (prev -= 1));
      //   console.log(isTimerActive);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [isTimerActive]);
  useEffect(() => {
    if (timeAmount < 1) setIsTimerActive(false);
  }, [timeAmount]);
  //   useEffect(() => {
  //     console.log(0);
  //     if (isTimerActive === false) return;
  //     if (startTime === undefined) return;
  //     console.log(1);
  //     const currentTime = Date.now();
  //     const difference = currentTime - startTime;
  //     if (difference < 1) return;
  //     setStartTime(currentTime);
  //     setTimeAmount((prev) => (prev -= difference));
  //   });

  return (
    <div
      onClick={(e) => {
        console.log("ok");
        if (timeAmount > 0) setIsTimerActive(!isTimerActive);
      }}
    >
      Time left: {getFormattedTime(timeAmount)}
    </div>
  );
}
