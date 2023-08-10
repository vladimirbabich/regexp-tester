import { useState } from 'react';

export function useHandleMouseMove(notificationText: string) {
  const [notificationPosition, setNotificationPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!notificationText || notificationText.length < 1) return;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    setNotificationPosition({
      x: event.clientX + scrollLeft,
      y: event.clientY + scrollTop,
    });
  };
  return {
    notificationPosition,
    handleMouseMove,
  };
}
