import React, { useEffect, useState, useRef, useMemo } from 'react';
// import './../../App.scss';
import './../../styles/TestForm.scss';
import Popup from '../Popup';
import { getResult } from '../../controllers/TestController';
import Timer from '../Timer';
import TestInput from '../TestInput';
import { IQuestion, IResultMatch } from '../../models/objectModels';
import { getFlagsString } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  resetFlags,
  setAskedQuestions,
  setCurrentQuestion,
  setIsTestOver,
  setSelectedFunction,
} from '../../features/testForm/testFormSlice';
import TestScore from '../TestScore';
import {
  setActiveMode,
  setDataOfTest,
  setNotificationText,
  setUserToken,
} from '../../features/global/globalSlice';
import { useGetAllQuestionsForModeQuery } from '../../features/services/apiSlice';
import { LocalStorageController } from '../../controllers/StorageController';
import { ITestForm } from '../../models/componentModels';
import { metaTagsController } from '../../controllers/MetaTagsController';
import { restartTestSlice } from '../../features/testForm/testFormSlice';
import StartMenu from '../StartMenu';
import { useGetSkippedQuestionAmount } from './hooks';
import QuestionsCounter from './QuestionsCounter';

const SKIP_ANIMATION_TIME_AMOUNT = 25; //seconds

export default function TestForm({ title, mode }: ITestForm) {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[] | null>([]);

  const [expectedResult, setExpectedResult] = useState<IResultMatch[]>([]);
  const [userResult, setUserResult] = useState<IResultMatch[]>([]);

  // const user
  const [pattern, setPattern] = useState<string>('');
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeAmount, setTimeAmount] = useState<number>(
    getDefaultTimeAmount(mode)
  );

  const [testStart, setTestStart] = useState<number>(
    new Date().getTime() / 1000
  );

  const [skipAnimationDuration, setSkipAnimationDuration] = useState(0);
  const [isActiveSkipAnimation, setIsActiveSkipAnimation] = useState(false);

  const {
    data: questionsDB,
    error: questionsDBError,
    isLoading: questionsDBIsLoading,
  } = useGetAllQuestionsForModeQuery(mode);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  //selector
  const {
    isTestOver,
    flags,
    currentQuestion,
    selectedFunction,
    askedQuestions,
  } = useAppSelector(({ testForm }) => ({
    isTestOver: testForm.isTestOver,
    flags: testForm.flags,
    askedQuestions: testForm.askedQuestions,
    currentQuestion: testForm.currentQuestion,
    selectedFunction: testForm.selectedFunction,
  }));

  const skippedQuestionsAmount = useGetSkippedQuestionAmount(askedQuestions);

  useEffect(() => {
    if (questionsDBError) {
      if ('token' in questionsDBError) {
        dispatch(setUserToken(questionsDBError.token as string));
      }
      console.log(questionsDBError);
    }
  }, [dispatch, questionsDBError]);

  useEffect(() => {
    metaTagsController.setTitle(`Retester mode: ${mode}`);
  }, []);

  function getDefaultTimeAmount(mode: string) {
    return mode === 'all-questions' ? 0 : mode === 'only-flags' ? 60 : 300;
  }

  useEffect(() => {
    if (!questionsDB) return;
    if (questionsDB?.token) {
      dispatch(setUserToken(questionsDB.token as string));
    }
    setQuestions(questionsDB.questions);
  }, [dispatch, questionsDB]);

  useEffect(() => {
    let timeInterval: NodeJS.Timer;
    if (!isActiveSkipAnimation) {
      timeInterval = setInterval(() => {
        // if (skipAnimationDuration <= SKIP_ANIMATION_TIME_AMOUNT+1)
        setSkipAnimationDuration((prev) =>
          prev < SKIP_ANIMATION_TIME_AMOUNT ? prev + 1 : prev
        );
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [isActiveSkipAnimation]);

  useEffect(() => {
    if (skipAnimationDuration === SKIP_ANIMATION_TIME_AMOUNT) {
      setIsActiveSkipAnimation(true);
    }
  }, [skipAnimationDuration]);

  function handleStartBtnClick() {
    setIsTimerActive(true);
    if (inputRef?.current) inputRef.current.focus();
  }

  function prepareAndSendEndedTest() {
    if (!isTestOver) {
      dispatch(setIsTestOver(true));
    }
    if (
      askedQuestions.length > 0 &&
      askedQuestions.filter((el) => (el?.userAnswer ? 1 : 0)).length > 0
    ) {
      const testQuestions = askedQuestions.map((el) => ({
        questionId: el.id,
        difficulty: el.difficulty,
        userAnswer: el.userAnswer ? el.userAnswer : null,
      }));
      // if i will decide that default timeAmount is better in time modes - chalge timeSpent into finalTimeSpent
      // const finalTimeSpent = getDefaultTimeAmount(mode) || timeSpent;
      setTestStart(new Date().getTime() / 1000);

      const localStorageController = new LocalStorageController();
      const userId = localStorageController.getUsersKey('id');
      // alert(userId);
      const formdata = {
        testQuestions,
        timeSpent:
          getDefaultTimeAmount(mode) === 0
            ? timeAmount
            : getDefaultTimeAmount(mode) - timeAmount,
        modeName: mode,
        userId: typeof userId == 'number' ? userId : parseInt(userId),
      };
      dispatch(setDataOfTest(formdata));
    }
  }

  function restartTest() {
    dispatch(setCurrentQuestion(null));
    if (questionsDB) {
      setQuestions([...questionsDB.questions]);
      setTimeAmount(getDefaultTimeAmount(mode));
      setSkipAnimationDuration(0);
      setIsActiveSkipAnimation(false);
      dispatch(setAskedQuestions([]));
    }
  }
  useEffect(() => {
    console.log('useEffect: flags, pattern, selectedFunction');
    updateResults();
  }, [dispatch, flags, pattern, selectedFunction]);

  useEffect(() => {
    console.log('useEffect: questions');
    if (questions && questions?.length > 0) {
      if (!currentQuestion) setRandomQuestion();
    }
  }, [dispatch, questions]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPattern((prev) => {
      return e.target.value;
    });
  }
  function updateUserResult(match: string) {
    const notUniqueIndexes: number[] = [];
    const expectedResultCopy = expectedResult.map((expEl, initialIndex) => ({
      match: expEl.match,
      initialIndex,
    }));
    const resArr = match.split('|').map((el) => {
      const indexOfEl = expectedResultCopy
        .map((expEl) => expEl.match)
        .indexOf(el);
      if (indexOfEl > -1) {
        notUniqueIndexes.push(+expectedResultCopy[indexOfEl].initialIndex);
        expectedResultCopy.splice(indexOfEl, 1);
      }
      const isUnique = indexOfEl < 0;
      return { match: el, isUnique };
    });

    setUserResult(resArr);
    updateExpectedResult(notUniqueIndexes);
    return;
  }
  function updateExpectedResult(notUniqueIndexes?: number[]) {
    if (!notUniqueIndexes) {
      setExpectedResult((prev) =>
        prev.map((el) => ({ match: el.match, isUnique: true }))
      );
      return;
    }
    const updatedExpectedResult = expectedResult.map((el, index) => {
      if (notUniqueIndexes.includes(index)) return { ...el, isUnique: false };
      return { ...el, isUnique: true };
    });
    setExpectedResult(updatedExpectedResult);
  }

  function updateResults() {
    // if (!isTimerActive) setIsTimerActive(true); //mb need to add "&&timeAmount>0"
    if (!currentQuestion) return;
    if (pattern.length === 0) {
      updateExpectedResult();
      if (userResult) setUserResult([]);
      return;
    }
    const flagsString = getFlagsString(flags);
    const match: string | undefined = getResult(
      currentQuestion.text,
      selectedFunction,
      pattern,
      flagsString
    );

    if (match) {
      updateUserResult(match);
      return;
    }
    //else {
    setUserResult([]);
  }

  useEffect(() => {
    if (userResult.length < 1) return;
    if (!currentQuestion) return;
    const userResultStr = userResult.map((el) => el.match).join('|');
    if (userResultStr === currentQuestion.expectedResult) {
      setIsRightAnswer(true);
    }
  }, [dispatch, userResult]);

  function setRandomQuestion() {
    if (!questions) return;

    const randomIndex = Math.round(Math.random() * (questions.length - 1));
    const splicedQuestions = [...questions];
    const chosenQuestion = splicedQuestions.splice(randomIndex, 1)[0];
    setQuestions(splicedQuestions);

    if (questions.length < 1 && chosenQuestion === undefined) {
      setIsTimerActive(false);
      dispatch(setIsTestOver(true));
      dispatch(setCurrentQuestion(null));
      return;
    }
    dispatch(setSelectedFunction(chosenQuestion.functionName));
    dispatch(setCurrentQuestion(chosenQuestion));
    dispatch(resetFlags());
  }

  useEffect(() => {
    if (timeSpent > 0) prepareAndSendEndedTest(); // if test over - change dataOfTest in globalSlice and send it to the server
  }, [dispatch, timeSpent]);
  useEffect(() => {
    //resetTestForm
    if (isTestOver) {
      setTimeSpent(new Date().getTime() / 1000 - testStart);
    }
    if (!isTestOver) {
      setTimeSpent(0);
      restartTest();
      setTestStart(new Date().getTime() / 1000);
    }
  }, [dispatch, isTestOver]);

  useEffect(() => {
    metaTagsController.setTitle(`Retester mode: ${mode}`);
    setIsTimerActive(false);
    //restart test after mode change
    setPattern('');

    dispatch(setActiveMode(mode));
    setTimeSpent(0);
    dispatch(resetFlags());
    restartTest();
    setTestStart(new Date().getTime() / 1000);
    if (isTestOver) {
      dispatch(setIsTestOver(false));
    }
  }, [mode]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.expectedResult) {
      if (mode === 'only-flags') {
        setPattern(currentQuestion.expectedResult.split('/')[0]);
      } else setPattern('');
      setExpectedResult(
        currentQuestion?.expectedResult
          .split('|')
          .map((el) => ({ match: el, isUnique: true, isTest: true }))
      );
    }
  }, [currentQuestion]);
  useEffect(() => {
    if (isRightAnswer) {
      let completedQuestion = {
        userAnswer: `${pattern}/${getFlagsString(flags)}`,
        ...currentQuestion,
      } as IQuestion;
      dispatch(setAskedQuestions([...askedQuestions, completedQuestion]));
      setSkipAnimationDuration(0);
      setIsActiveSkipAnimation(false);
      const timeout = setTimeout(() => {
        setIsRightAnswer(false);
      }, 1000);
      setRandomQuestion();

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isRightAnswer]);

  function handleClickGiveUp(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setIsTimerActive(false);
    dispatch(setIsTestOver(true));

    dispatch(setCurrentQuestion(null));
    dispatch(setAskedQuestions([...askedQuestions]));
    setSkipAnimationDuration(0);
    setIsActiveSkipAnimation(false);
  }

  function handleClickSkip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //finish test trigger
    dispatch(setAskedQuestions([...askedQuestions, { ...currentQuestion }]));
    setPattern('');
    setRandomQuestion();
    setSkipAnimationDuration(0);
    setIsActiveSkipAnimation(false);
  }

  function handleRestartClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(restartTestSlice());
    setIsTimerActive(true);
  }

  if (questionsDBIsLoading) {
    return <h1 className="h1Title">Loading...</h1>;
  }
  if (questionsDBError) {
    return <h1 className="h1Title">Connection problem! try later please</h1>;
  }

  return (
    <form className="testForm">
      <div className="testInfo">
        <Timer
          timeAmount={timeAmount}
          setTimeAmount={setTimeAmount}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
          isCountDown={mode === 'all-questions' ? false : true}></Timer>
        {!(window.innerWidth < 880) && (
          <h1 className="formTitle">
            {currentQuestion &&
              currentQuestion.task.length > 0 &&
              currentQuestion.task}
          </h1>
        )}
        <div className="infoBtns">
          <QuestionsCounter
            questionAmounts={[
              {
                text: 'Number of answered questions',
                amount: askedQuestions.length - skippedQuestionsAmount,
              },
              {
                text: 'Number of skipped questions',
                amount: skippedQuestionsAmount,
              },
              {
                text: `This test contains ${questionsDB?.questions?.length} questions`,
                amount: questionsDB.questions?.length,
              },
            ]}
          />
          <button
            onClick={handleClickSkip}
            disabled={isTestOver}
            className={
              isActiveSkipAnimation && isTimerActive
                ? 'formBtn animated'
                : 'formBtn'
            }>
            Skip
          </button>
          <button
            onClick={handleClickGiveUp}
            disabled={isTestOver}
            className="formBtn">
            Give Up
          </button>
        </div>
      </div>
      {window.innerWidth < 880 && (
        <h1 className="formTitle">
          {currentQuestion &&
            currentQuestion.task.length > 0 &&
            currentQuestion.task}
        </h1>
      )}
      <TestInput
        value={pattern}
        handleChange={handleChange}
        inputRef={inputRef}
        mode={mode}></TestInput>
      <span className="textBlock" role="textbox">
        {currentQuestion?.text ? (
          currentQuestion?.text
            .split('\n')
            .map((el, index) => <span key={index}>{el}</span>)
        ) : (
          <span>...</span>
        )}
      </span>
      <div className="results">
        <div className="resultBlock">
          <div className="resultLabel">Expected result</div>
          <div className="wrapper">
            {currentQuestion &&
              expectedResult.map((el, i) => {
                let classes = 'matchElement';
                if (el.isUnique) classes += ' wrong';

                return (
                  <span
                    key={i}
                    onMouseEnter={() => {
                      if (el.isUnique)
                        dispatch(
                          setNotificationText(`Not found in your result`)
                        );
                    }}
                    onMouseLeave={() => {
                      if (el.isUnique) dispatch(setNotificationText(''));
                    }}
                    className={classes}>
                    {el.match
                      ? el.match
                          .split('\n')
                          .map((el, index) => <span key={index}>{el}</span>)
                      : 'NOT FOUND'}
                  </span>
                );
              })}
          </div>
        </div>
        <div className="resultBlock">
          <div className="resultLabel">Your result</div>
          {userResult.length < 1 ? (
            <span>No matches</span>
          ) : (
            <div className="wrapper">
              {userResult.map((el, i) => {
                let classes = 'matchElement';
                if (el.isUnique) classes += ' wrong';
                return (
                  <span
                    className={classes}
                    key={i}
                    onMouseEnter={() => {
                      if (el.isUnique)
                        dispatch(setNotificationText(`Not expected match`));
                    }}
                    onMouseLeave={() => {
                      if (el.isUnique) dispatch(setNotificationText(''));
                    }}>
                    {el.match}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {!isTestOver &&
        !isTimerActive &&
        timeAmount === getDefaultTimeAmount(mode) && (
          <StartMenu
            title="Regular expression open-ended test"
            text={[
              `Write a regular expression to get the expected result from the given text.`,
              mode === 'all-questions'
                ? 'The test is not time-limited.'
                : 'Test duration: 5 minutes.',
            ]}
            btnText="Start test"
            handleClick={handleStartBtnClick}></StartMenu>
        )}
      {isRightAnswer && <Popup></Popup>}
      {isTestOver && (
        <TestScore
          askedQuestions={askedQuestions}
          timeSpent={
            getDefaultTimeAmount(mode) === 0
              ? timeAmount
              : getDefaultTimeAmount(mode) - timeAmount
          }
          handleRestartClick={handleRestartClick}
        />
      )}
    </form>
  );
}
