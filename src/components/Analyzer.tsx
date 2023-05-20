import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { metaTageController } from '../controllers/MetaTagsController';
import { IAnalyzer } from '../models/componentModels';
import { IQuestion } from '../models/objectModels';
import './../App.scss';
import './../styles/Analyzer.scss';
import QuestionBlock from './QuestionBlock';
export default function Analyzer({ title }: IAnalyzer) {
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );

  useEffect(() => {
    metaTageController.setTitle(`Test results - Retester`);
  }, []);

  return (
    <div className="analyzer">
      <h1 className="h1Title">{title}</h1>
      {askedQuestions.length > 0 &&
        askedQuestions.map((question, i) => (
          <QuestionBlock question={question} questionId={i + 1}></QuestionBlock>
        ))}
      {/* {askedQuestions.length > 0 &&
        askedQuestions.map((question, i) => (
          <QuestionBlock question={question} questionId={i + 1}></QuestionBlock>
        ))}
      {askedQuestions.length > 0 &&
        askedQuestions.map((question, i) => (
          <QuestionBlock question={question} questionId={i + 1}></QuestionBlock>
        ))} */}
    </div>
  );
}
