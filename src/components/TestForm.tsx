import React, { useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestForm.scss';
import Popup from './Popup';
import { getResult } from '../controllers/TestController';
import Timer from './Timer';
import TestInput from './TestInput';
import { IQuestion, IResultMatch } from '../models/objectModels';
import { getFlagsString } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetFlags,
  setActiveMode,
  setAskedQuestions,
  setCurrentQuestion,
  setIsTestOver,
  setSelectedFunction,
} from '../features/testForm/testFormSlice';
import TestScore from './TestScore';
import {
  setDataOfTest,
  setNotificationText,
  setUserToken,
} from '../features/global/globalSlice';
import { useGetAllQuestionsForModeQuery } from '../features/api/apiSlice';
import { LocalStorageController } from '../controllers/StorageController';
import { ITestForm } from '../models/componentModels';
import { metaTageController } from '../controllers/MetaTagsController';

const SKIP_ANIMATION_TIME_AMOUNT = 25; //seconds

export default function TestForm({ title, mode }: ITestForm) {
  const dispatch = useAppDispatch();
  const {
    data: questionsDB,
    error: questionsDBError,
    isLoading: questionsDBIsLoading,
  } = useGetAllQuestionsForModeQuery(mode);

  const [timeSpent, setTimeSpent] = useState<number>(0);

  useEffect(() => {
    if (questionsDBError) {
      if ('token' in questionsDBError) {
        console.log(
          `TestForm questionsDBError set: ${questionsDBError.token as string}`
        );
        dispatch(setUserToken(questionsDBError.token as string));
      }
      console.log(questionsDBError);
    }
  }, [dispatch, questionsDBError]);

  const flags = useAppSelector((state) => state.testForm.flags);
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );

  const [questions, setQuestions] = useState<IQuestion[] | null>([]);
  const currentQuestion = useAppSelector(
    (state) => state.testForm.currentQuestion
  );

  const [expectedResult, setExpectedResult] = useState<IResultMatch[]>([]);
  const [userResult, setUserResult] = useState<IResultMatch[]>([]);

  const selectedFunction = useAppSelector(
    (state) => state.testForm.selectedFunction
  );
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

  const localStorageController = new LocalStorageController();

  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  useEffect(() => {
    metaTageController.setTitle(`Retester mode: ${mode}`);
  }, []);

  function getDefaultTimeAmount(mode: string) {
    return mode === 'all-questions' ? 0 : mode === 'only-flags' ? 60 : 300;
  }

  useEffect(() => {
    // console.log('questionsDB is loaded:');
    if (!questionsDB) return;
    // console.log(questionsDB);
    if (questionsDB?.token) {
      dispatch(setUserToken(questionsDB.token as string));
      console.log(`TestForm questionsDB set: ${questionsDB.token || ''}`);
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
    // console.log(skipAnimationDuration);
    if (skipAnimationDuration === SKIP_ANIMATION_TIME_AMOUNT) {
      setIsActiveSkipAnimation(true);
    }
  }, [skipAnimationDuration]);

  // useEffect(() => {
  //   console.log('testStart:' + testStart.toString());
  // }, [testStart]);

  function prepareAndSendEndedTest() {
    if (!isTestOver) {
      dispatch(setIsTestOver(true));
    }
    if (
      askedQuestions.length > 0 &&
      askedQuestions.filter((el) => (el?.userAnswer ? 1 : 0)).length > 0
    ) {
      console.log('prepareAndSendEndedTest');
      const testQuestions = askedQuestions.map((el) => ({
        questionId: el.id,
        difficulty: el.difficulty,
        userAnswer: el.userAnswer ? el.userAnswer : null,
      }));
      // if i will decide that default timeAmount is better in time modes - chalge timeSpent into finalTimeSpent
      // const finalTimeSpent = getDefaultTimeAmount(mode) || timeSpent;
      setTestStart(new Date().getTime() / 1000);
      console.log('timeSpent');
      console.log(timeSpent);

      const userId = localStorageController.getUsersKey('id');
      // alert(userId);
      const formdata = {
        testQuestions,
        timeSpent: Math.round(timeSpent).toString(), // ? how to get it in
        //App.tsx to update global.dataOfTest and send on the server
        modeName: mode, //?
        userId: typeof userId == 'number' ? userId : parseInt(userId),
      };
      console.log(formdata);
      dispatch(setDataOfTest(formdata));
    }
  }

  function restartTest() {
    dispatch(setCurrentQuestion(null));
    if (questionsDB) {
      setQuestions([...questionsDB.questions]);
      // console.log('rand');
      setTimeAmount(getDefaultTimeAmount(mode));
      setSkipAnimationDuration(0);
      setIsActiveSkipAnimation(false);
      dispatch(setAskedQuestions([]));
    }
  }
  useEffect(() => {
    updateResults();
    // console.log(flags);
  }, [dispatch, flags, pattern, selectedFunction]);

  useEffect(() => {
    // console.log('qq');
    // console.log(questions);
    // console.log(currentQuestion);
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
    if (!isTimerActive) setIsTimerActive(true); //mb need to add "&&timeAmount>0"
    if (!currentQuestion) return;
    if (pattern.length === 0) {
      updateExpectedResult();
      if (userResult) setUserResult([]);
      return;
    }
    const match: string | undefined = getResult(
      currentQuestion.text,
      pattern,
      selectedFunction,
      getFlagsString(flags)
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
    if (expectedResult.length < 1) {
      console.error('Error! expected result not found.');
      return;
    }
  }, [dispatch, userResult]);

  function setRandomQuestion() {
    // console.log('questions!');
    // console.log(questions);
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
    // console.log('isTestOver: ' + isTestOver);
  }, [dispatch, isTestOver]);

  useEffect(() => {
    metaTageController.setTitle(`Retester mode: ${mode}`);
    //restart test after mode change
    setPattern('');

    dispatch(setActiveMode(mode));
    setTimeSpent(0);
    dispatch(resetFlags());
    restartTest();
    setTestStart(new Date().getTime() / 1000);
    if (isTestOver) {
      console.log('isTestOver true');
      dispatch(setIsTestOver(false));
    }
    setIsTimerActive(true);
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
  /**
   * ! Does not abort current timeout
   * TODO fix return
   */
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
        // console.log("time");
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
    dispatch(setAskedQuestions([...askedQuestions, { ...currentQuestion }]));
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

  const skippedQuestionsAmount = askedQuestions.filter((el) => {
    return 'userAnswer' in el ? 0 : 1;
  }).length;
  if (questionsDBIsLoading) {
    return <h1 className="h1Title">Loading...</h1>;
  }
  if (questionsDBError) {
    return <h1 className="h1Title">Connection problem! try later please</h1>;
  }
  const splitedTitle = title.split('\n');
  return (
    <>
      <h1 className="h1Title">
        {splitedTitle.map((line, id) => (
          <span key={id}>
            {line}
            <br />
          </span>
        ))}
      </h1>
      <form className="testForm">
        {isTestOver && (
          <TestScore
            skippedAmount={skippedQuestionsAmount}
            solvedAmount={
              askedQuestions.length - skippedQuestionsAmount
            }></TestScore>
        )}
        <div className="testInfo">
          <Timer
            timeAmount={timeAmount}
            setTimeAmount={setTimeAmount}
            isTimerActive={isTimerActive}
            setIsTimerActive={setIsTimerActive}
            isCountDown={mode === 'all-questions' ? false : true}></Timer>
          {!(window.innerWidth < 670) && (
            <p className="task">
              {currentQuestion &&
                currentQuestion.task.length > 0 &&
                currentQuestion.task}
            </p>
          )}
          <div className="infoBtns">
            <span className="questionsCount">
              <span
                onMouseEnter={() => {
                  dispatch(setNotificationText('Number of answered questions'));
                }}
                onMouseLeave={() => {
                  dispatch(setNotificationText(''));
                }}>
                {askedQuestions.length - skippedQuestionsAmount}
              </span>
              (
              <span
                onMouseEnter={() => {
                  dispatch(setNotificationText('Number of skipped questions'));
                }}
                onMouseLeave={() => {
                  dispatch(setNotificationText(''));
                }}>
                {skippedQuestionsAmount}
              </span>
              )/
              <span
                style={{ display: 'inline-block' }}
                onMouseEnter={() => {
                  // console.log(questionsDB);
                  dispatch(
                    setNotificationText(
                      `This test contains ${questionsDB?.questions?.length} questions`
                    )
                  );
                }}
                onMouseLeave={() => {
                  dispatch(setNotificationText(''));
                }}>
                {questionsDB.questions?.length}
              </span>
            </span>
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
        {window.innerWidth < 670 && (
          <p className="task">
            {currentQuestion &&
              currentQuestion.task.length > 0 &&
              currentQuestion.task}
          </p>
        )}
        <TestInput
          value={pattern}
          handleChange={handleChange}
          mode={mode}></TestInput>
        <span className="textBlock" role="textbox">
          {currentQuestion?.text ? (
            currentQuestion?.text
              .split('\n')
              .map((el, index) => <span key={index}>{el}</span>)
          ) : (
            <span>Error</span>
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
        {/* {true && <Popup></Popup>} */}
        {isRightAnswer && <Popup></Popup>}
      </form>
    </>
  );
}
