import { useRef, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { INotification } from '../models/componentModels';
import './../styles/Notification.scss';

const offset: number = 20;
function getIsEnoughSpace(
  coordPos: number,
  coordSize: number,
  notificationSize: number = 0
) {
  return coordPos + notificationSize + offset < coordSize;
}

export default function Notification({ position }: INotification) {
  const text = useAppSelector((state) => state.global.notificationText);
  const notificationRef = useRef<HTMLDivElement>(null);

  const [isEnoughSpaceHor] = useState<boolean>(() =>
    getIsEnoughSpace(position.x, window.innerWidth)
  );
  const [isEnoughSpaceVer] = useState<boolean>(() =>
    getIsEnoughSpace(position.y, window.innerHeight)
  );

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
    left: x + offset,
  }),
  horizontalRight: (rightOffset: number) => ({
    right: rightOffset + offset,
  }),
  verticalTop: (y: number) => ({
    top: y + offset,
  }),
  verticalBottom: (bottomOffset: number) => ({
    bottom: bottomOffset,
  }),
};
