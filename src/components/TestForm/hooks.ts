import { useMemo } from 'react';
import { AskedQuestion } from '../../models/objectModels';

const arr = { a: 2 };
const useGetSkippedQuestionAmount = (askedQuestions: AskedQuestion[]) => {
  return useMemo(
    () =>
      askedQuestions.filter((el) => {
        return 'userAnswer' in el ? 0 : 1;
      }).length,
    [askedQuestions]
  );
};

export { useGetSkippedQuestionAmount };
