import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setQuestions,
  updateCurrentQuestionAnswer,
  setIsTestOver,
} from '../features/quizForm/quizFormSlice';
import './../styles/QuizForm.scss';
import QuestionsStatus from './QuestionsStatus';
import QuizFormBody from './QuizFormBody';
import TestScore from './TestScore';
import StartMenu from './StartMenu';
import Timer from './Timer';
import { setActiveMode, setUserToken } from '../features/global/globalSlice';
import { useGetQuestionsOfQuizQuery } from '../features/api/apiSlice';
import { metaTagsController } from '../controllers/MetaTagsController';
import { useNavigate } from 'react-router-dom';
import {
  FetchedQuizQuestion,
  FetchedQuizType,
  PreparedQuizQuestion,
} from '../models/objectModels';

export default function QuizForm({ mode, id = 1 }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate('/');
    // return;
    metaTagsController.setTitle(`Regular expression Quiz - Retester`);
    metaTagsController.setMeta(
      'description',
      `Test your knowledge of regular expressions. Choose right answer for each question of the quiz!`
    );
    metaTagsController.setMeta(
      'keywords',
      'quiz, simple test, regex test, test regex, Regular expressions, regexp, Regex, Pattern matching, String manipulation, Text processing, Search algorithms, Parsing, Syntax, Testing.'
    );
    return () => {
      console.log(123);
      metaTagsController.setDefault()
    };
  }, []);

  const {
    data: questionsDB,
    error: questionsDBError,
    isLoading: questionsDBIsLoading,
  } = useGetQuestionsOfQuizQuery<FetchedQuizType>(id);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const isTestOver = useAppSelector((state) => state.quizForm.isTestOver);
  const [timeAmount, setTimeAmount] = useState<number>(0);
  const isCountDown = false;
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const currentUserAnswer = useAppSelector(
    (state) => state.quizForm.currentUserAnswer
  );

  useEffect(() => {
    if (questionsDBError) {
      if ('token' in questionsDBError) {
        dispatch(setUserToken(questionsDBError.token as string));
      }
      console.log(questionsDBError);
    }
  }, [dispatch, questionsDBError]);

  useEffect(() => {
    dispatch(setActiveMode(mode));
  }, [mode]);

  useEffect(() => {
    if (!questionsDB) return;

    if (isTestOver === false) {
      dispatch(setQuestions(questionsDB));
      setTimeAmount(0);
    }
    if (isTestOver) {
      setIsTimerActive(false);
    }
  }, [questionsDB, isTestOver]);

  const [questions, currentQuestionIndex] = useAppSelector((state) => [
    state.quizForm.questions,
    state.quizForm.currentQuestionIndex,
  ]);

  function handleStartBtnClick() {
    setIsTimerActive(true);
  }

  function handleClickSubmit(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(
      updateCurrentQuestionAnswer(
        currentUserAnswer
          .map((str) => str.replaceAll('\\', '*b'))
          .map((str) => str.replaceAll('*p', '|'))
          .map((str) => str.replaceAll('*s', '/'))
      )
    );
    formRef.current?.reset();
  }
  function handleRestartClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(setIsTestOver(false));
    setIsTimerActive(true);
  }

  return (
    <form className="quizForm" ref={formRef}>
      <div className="quizFormHeader">
        <Timer
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
          timeAmount={timeAmount}
          setTimeAmount={setTimeAmount}
          isCountDown={isCountDown}></Timer>
        <QuestionsStatus />
      </div>
      {isTimerActive ? (
        <QuizFormBody isDataLoading={questionsDBIsLoading} />
      ) : (
        <div>
          <p className="question">Loading...</p>
        </div>
      )}
      <button
        type="submit"
        onClick={handleClickSubmit}
        disabled={currentUserAnswer.length === 0}
        className="formBtn quizBtn">
        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
      {!isTimerActive && timeAmount === 0 && (
        <StartMenu
          title="Regular expression quiz"
          text={[
            'Choose one or more options for every question.',
            'The quiz is not time-limited.',
          ]}
          btnText="Start quiz"
          handleClick={handleStartBtnClick}></StartMenu>
      )}
      {isTestOver && (
        <TestScore
          timeSpent={timeAmount}
          quizQuestions={questions}
          handleRestartClick={handleRestartClick}
        />
      )}
    </form>
  );
}
