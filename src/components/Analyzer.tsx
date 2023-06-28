import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { metaTagsController } from '../controllers/MetaTagsController';
import { IAnalyzer } from '../models/componentModels';
import './../App.scss';
import './../styles/Analyzer.scss';
import QuestionBlock from './QuestionBlock';
import QuizBlock from './QuizBlock';
export default function Analyzer({ title }: IAnalyzer) {
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );
  const activeMode = useAppSelector((state) => state.global.activeMode);
  const quizQuestions = useAppSelector((state) => state.quizForm.questions);

  useEffect(() => {
    metaTagsController.setTitle(`Test results - Retester`);
  }, []);

  const restartRoute = `/${activeMode}`;

  return (
    <div className="analyzer">
      <h1 className="h1Title">{title}</h1>
      {askedQuestions.length > 0 &&
        askedQuestions.map((question, i) => (
          <QuestionBlock question={question} questionId={i + 1}></QuestionBlock>
        ))}

      {quizQuestions.length > 0 &&
        quizQuestions.map((question, i) => {
          const prepQuestion = {
            ...question,
            userAnswer: question.userAnswer
              ?.map((str) => str.replaceAll('*b', '\\'))
              .map((str) => str.replaceAll('*p', '|'))
              .map((str) => str.replaceAll('*s', '/')),
          };
          console.log(i);
          return (
            <QuizBlock question={prepQuestion} questionId={i + 1}></QuizBlock>
          );
        })}
      {!(quizQuestions.length > 0) && !(askedQuestions.length > 0) && (
        <div>No correct answers found, try again!</div>
      )}
      <div className="restartBlock">
        <Link to={restartRoute}>Restart test</Link>
      </div>
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
