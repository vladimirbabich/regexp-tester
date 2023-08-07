import { useAppDispatch } from '../../app/hooks';
import { setNotificationText } from '../../features/global/globalSlice';
import { IQuestionAmount } from '../../models/componentModels';

export default function QuestionAmount({
  text,
  amount,
  isLastEl,
}: IQuestionAmount) {
  const dispatch = useAppDispatch();
  const handleMouseEvent = (e: React.MouseEvent) => {
    console.log(text);
    e.type === 'mouseenter'
      ? dispatch(setNotificationText(text))
      : dispatch(setNotificationText(''));
  };

  return (
    <>
      <span
        key={text}
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}>
        {amount}
        {!isLastEl && '/'}
      </span>
    </>
  );
}
