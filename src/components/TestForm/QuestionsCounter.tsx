import { useAppDispatch } from '../../app/hooks';
import { setNotificationText } from '../../features/global/globalSlice';
import { IQuestionsCounter } from '../../models/componentModels';
import QuestionAmount from './QuestionAmount';

export default function QuestionsCounter({
  questionAmounts,
}: IQuestionsCounter) {
  const dispatch = useAppDispatch();
  return (
    <span className="questionsCount">
      {questionAmounts.map(({ text, amount }, index) => {
        return (
          <QuestionAmount
            key={index}
            text={text}
            amount={amount}
            isLastEl={!(questionAmounts.length - index - 1)}
          />
        );
      })}
    </span>
  );
}
