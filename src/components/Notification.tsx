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
          ? styles.horizontalLeft(position.x)
          : styles.horizontalRight(window.innerWidth - position.x)),
        ...(isEnoughSpaceVer
          ? styles.verticalTop(position.y)
          : styles.verticalBottom(window.innerHeight - position.y)),
      }}>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  horizontalLeft: (x: number) => ({
    left: x + horOffset,
  }),
  horizontalRight: (rightOffset: number) => ({
    right: rightOffset + horOffset / 2,
  }),
  verticalTop: (y: number) => ({
    top: y + vertOffset,
  }),
  verticalBottom: (bottomOffset: number) => ({
    bottom: bottomOffset,
  }),
};
