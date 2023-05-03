import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import './../styles/Notification.scss';

const horOffset = 20;
const vertOffset = 20;
const borderSize = 2;
const browserScrollWidth = 20;
export default function Notification({ position }: any) {
  const text = useAppSelector((state) => state.global.notificationText);
  let elementWidth = 0;
  let elementHeight = 0;

  let isEnoughSpaceHor = true;
  let isEnoughSpaceVer = true;
  // console.log('position:');
  // console.log(position);
  const notificationRef = useRef(null);

  if (notificationRef && notificationRef.current) {
    elementWidth = (notificationRef.current as HTMLElement).clientWidth;
    elementHeight = (notificationRef.current as HTMLElement).clientHeight;

    isEnoughSpaceHor =
      position.x + elementWidth + horOffset + borderSize + browserScrollWidth <
      window.innerWidth;
    isEnoughSpaceVer =
      position.y + elementHeight + vertOffset < window.innerHeight;
  }
  return (
    <div
      className="notificationBlock"
      ref={notificationRef}
      style={{
        ...(isEnoughSpaceHor
          ? styles.horizontal(position.x)
          : styles.horizontal(position.x, elementWidth + 40)),
        ...(isEnoughSpaceVer
          ? styles.vertical(position.y)
          : styles.vertical(position.y, elementHeight)),
      }}>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  horizontal: (x: any, elementWidth: number = 0) => ({
    left: x + horOffset - elementWidth,
  }),
  vertical: (y: any, elementHeight: number = 0) => ({
    top: y - elementHeight,
  }),
};
