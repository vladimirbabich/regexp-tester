import { useRef, useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { INotification } from '../models/componentModels';
import './../styles/Notification.scss';

const horOffset = 20;
const vertOffset = 20;
const borderSize = 2;
const browserScrollWidth = 20;
export default function Notification({ position }: INotification) {
  const text = useAppSelector((state) => state.global.notificationText);
  let elementWidth = 0;
  let elementHeight = 0;

  const [isEnoughSpaceHor, setIsEnoughSpaceHor] = useState<boolean>(false);
  const [isEnoughSpaceVer, setIsEnoughSpaceVer] = useState<boolean>(false);
  // console.log('position:');
  // console.log(position);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (notificationRef && notificationRef.current) {
      elementWidth = (notificationRef.current as HTMLElement).clientWidth;
      elementHeight = (notificationRef.current as HTMLElement).clientHeight;
      const elWidth = elementWidth > 0 ? elementWidth : 70;

      setIsEnoughSpaceHor(
        position.x + elWidth + horOffset + borderSize + browserScrollWidth <
          window.innerWidth
      );
      setIsEnoughSpaceVer(
        position.y + elementHeight + vertOffset < window.innerHeight
      );
    }
  }, [notificationRef, notificationRef.current]);

  return (
    <div
      className="notificationBlock"
      ref={notificationRef}
      style={{
        ...(isEnoughSpaceHor
          ? styles.horizontal(position.x)
          : styles.horizontal(
              position.x,
              elementWidth > 0 ? elementWidth : 90 + 40
            )),
        ...(isEnoughSpaceVer
          ? styles.vertical(position.y)
          : styles.vertical(position.y, elementHeight)),
      }}>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  horizontal: (x: number, elementWidth: number = 0) => ({
    left: x + horOffset - elementWidth,
  }),
  vertical: (y: number, elementHeight: number = 0) => ({
    top: y - elementHeight,
  }),
};
