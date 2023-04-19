import React, { useEffect, useRef, useState } from 'react';
import './../App.scss';
import './../styles/TestForm.scss';
import Popup from './Popup';
import { expectedResult, getResult } from '../TestController';
import allQuestions from './../questions';
import Timer from './Timer';
import TestInput from './TestInput';
import { IDropDownPickerList, IQuestion, IResultMatch } from '../Models';
import { defaultTimeAmount, getDiverseMatches, getFlagsString } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetFlags,
  setAskedQuestions,
  setCurrentQuestion,
  setIsTestOver,
  setSelectedFunction,
} from '../features/testForm/testFormSlice';
import TestScore from './TestScore';
import { setFlagsFromString } from 'v8';
import { setNotificationText } from '../features/global/globalSlice';

const SKIP_ANIMATION_TIME_AMOUNT = 25; //seconds

export default function TestForm({ title, mode }: any) {
  const dispatch = useAppDispatch();
  const flags = useAppSelector((state) => state.testForm.flags);
  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );

  const questionsLength = allQuestions.length;
  const [questions, setQuestions] = useState<IQuestion[] | null>([
    ...allQuestions,
  ]);
  const currentQuestion = useAppSelector(
    (state) => state.testForm.currentQuestion
  );

  const [expectedResult, setExpectedResult] = useState<IResultMatch[]>([]);
  const [userResult, setUserResult] = useState<IResultMatch[]>([]);

  const selectedFunction = useAppSelector(
    (state) => state.testForm.selectedFunction
  );
  const [pattern, setPattern] = useState<string>('');
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeAmount, setTimeAmount] = useState<number>(
    getDefaultTimeAmount(mode)
  );
  const [skipAnimationDuration, setSkipAnimationDuration] = useState(0);
  const [isActiveSkipAnimation, setIsActiveSkipAnimation] = useState(false);
  function getDefaultTimeAmount(mode: string) {
    return mode == 'allQuestions' ? 0 : mode == 'flags' ? 60 : 300;
  }
  useEffect(() => {
    // console.log(isTimerActive);
    // console.log(isActiveSkipAnimation);
  });
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
  }, []);
  useEffect(() => {
    // console.log(skipAnimationDuration);
    if (skipAnimationDuration == SKIP_ANIMATION_TIME_AMOUNT) {
      setIsActiveSkipAnimation(true);
    }
  }, [skipAnimationDuration]);

  function restartTest() {
    console.log('ALL:');
    console.log(allQuestions);
    setQuestions([...allQuestions]);
    setTimeAmount(getDefaultTimeAmount(mode));
    setSkipAnimationDuration(0);
    setIsActiveSkipAnimation(false);
    console.log(defaultTimeAmount);
    // setPattern(
    //   mode == 'flags' ? currentQuestion?.possibleAnswer.split('/')[0] : ''
    // );
    dispatch(setAskedQuestions([]));
  }
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  useEffect(() => {
    updateResults();
    // console.log(flags);
  }, [flags, pattern, selectedFunction]);

  useEffect(() => {
    setRandomQuestion();
  }, [questions]);

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
    if (!isTimerActive) setIsTimerActive(true); //mb need to add &&timeAmount>0
    if (!currentQuestion) return;
    if (pattern.length == 0) {
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
  }, [userResult]);

  function setRandomQuestion() {
    if (!questions) return;

    const randomIndex = Math.round(Math.random() * (questions.length - 1));
    const chosenQuestion = questions.splice(randomIndex, 1)[0];

    if (questions.length < 1 && chosenQuestion === undefined) {
      setIsTimerActive(false);
      dispatch(setIsTestOver(true));
      return;
    }
    dispatch(setSelectedFunction(chosenQuestion.functionName));
    dispatch(setCurrentQuestion(chosenQuestion));
    dispatch(resetFlags());
  }

  useEffect(() => {
    //resetTestForm
    if (!isTestOver) restartTest();
    console.log('isTestOver: ' + isTestOver);
  }, [isTestOver]);

  useEffect(() => {
    //restart test after mode change
    restartTest();
    if (isTestOver) {
      dispatch(setIsTestOver(false));
    }
    setIsTimerActive(true);
    dispatch(resetFlags());
  }, [mode]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.expectedResult) {
      if (mode == 'flags') {
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

  return (
    <>
      <h1 className="h1Title">{title}</h1>
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
            isCountDown={mode == 'allQuestions' ? false : true}></Timer>
          <h2 className="task">
            {currentQuestion
              ? currentQuestion.task
              : 'error: question not found!'}
          </h2>
          <div>
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
                  dispatch(
                    setNotificationText(
                      `This test contains ${questionsLength} questions`
                    )
                  );
                }}
                onMouseLeave={() => {
                  dispatch(setNotificationText(''));
                }}>
                {questionsLength}
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
        <TestInput
          value={pattern}
          handleChange={handleChange}
          mode={mode}></TestInput>
        <textarea
          className="textBlock"
          disabled={true}
          value={currentQuestion?.text}>
          {currentQuestion && currentQuestion.text}
        </textarea>
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
                      {el.match}
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
