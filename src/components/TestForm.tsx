import React, { useEffect, useRef, useState } from 'react';
import './../App.scss';
import './../styles/TestForm.scss';
import Popup from './Popup';
import { expectedResult, getResult } from '../TestController';
import allQuestions from './../questions';
import Timer from './Timer';
import TestInput from './TestInput';
import { IDropDownPickerList, IQuestion, IResultMatch } from './../types';
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
  const [timerDuration, setTimerDuration] = useState(0);
  const [isActiveTimerDuration, setIsActiveTimerDuration] = useState(true);
  function getDefaultTimeAmount(mode: string) {
    return mode == 'allQuestions' ? 0 : mode == 'flags' ? 60 : 300;
  }
  useEffect(() => {
    console.log(isTimerActive);
    console.log(isActiveTimerDuration);
  });
  useEffect(() => {
    let timeInterval: NodeJS.Timer;
    if (isActiveTimerDuration) {
      timeInterval = setInterval(() => {
        setTimerDuration((prev) => prev + 1);
      }, 1000);
      return () => {
        clearInterval(timeInterval);
      };
    } else {
      return () => {
        clearInterval(timeInterval);
      };
    }
  }, []);
  useEffect(() => {
    console.log(timerDuration);
    if (timerDuration > 3) {
      setIsActiveTimerDuration(false);
      // setTimerDuration(0);
    }
  }, [timerDuration]);

  function restartTest() {
    console.log('ALL:');
    console.log(allQuestions);
    setQuestions([...allQuestions]);
    setTimeAmount(getDefaultTimeAmount(mode));
    setTimerDuration(0);
    setIsActiveTimerDuration(true);
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
      setTimerDuration(0);
      setIsActiveTimerDuration(true);
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
    setTimerDuration(0);
    setIsActiveTimerDuration(true);
  }

  function handleClickSkip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //finish test trigger
    dispatch(setAskedQuestions([...askedQuestions, { ...currentQuestion }]));
    setPattern('');
    setRandomQuestion();
    setTimerDuration(0);
    setIsActiveTimerDuration(true);
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
                className="hint--top hint--info"
                aria-label="solved questions">
                {askedQuestions.length - skippedQuestionsAmount}
              </span>
              (
              <span
                className="hint--top hint--info"
                aria-label="skipped questions">
                {skippedQuestionsAmount}
              </span>
              )/
              <span className="hint--top hint--info" aria-label="all questions">
                {questionsLength}
              </span>
            </span>
            <button
              onClick={handleClickSkip}
              disabled={isTestOver}
              className={
                !isActiveTimerDuration && isTimerActive
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
                  if (el.isUnique) classes += ' wrong hint--top hint--error';

                  return (
                    <span
                      key={i}
                      className={classes}
                      aria-label={
                        el.isUnique ? 'Not found in your result!' : ''
                      }>
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
                  if (el.isUnique) classes += ' wrong hint--top hint--error';
                  return (
                    <span
                      className={classes}
                      key={i}
                      aria-label={el.isUnique ? 'Not expected match!' : ''}>
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
