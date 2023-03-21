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
  setIsTestRestarted,
  setSelectedFunction,
} from '../features/testForm/testFormSlice';
import TestScore from './TestScore';

export default function TestForm({ title }: any) {
  let firstMount = true;
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
  const [timeAmount, setTimeAmount] = useState<number>(22222);

  useEffect(() => {
    console.log('currentQuestion update');
    console.log(currentQuestion?.expectedResult);
    console.log(expectedResult);
    if (!currentQuestion) return;
  }, [currentQuestion]);
  useEffect(() => {
    // alert(expectedResult.join('|'));
    console.warn(expectedResult);
  }, [expectedResult]);

  const isTestRestarted = useAppSelector(
    (state) => state.testForm.isTestRestarted
  );

  useEffect(() => {
    if (isTestRestarted) {
      console.log('ISTESTREST: ' + isTestRestarted);
      restartTest();
      dispatch(setIsTestRestarted(false));
    }
  }, [isTestRestarted]);
  function restartTest() {
    console.log('ALL:');
    console.log(allQuestions);
    setQuestions([...allQuestions]);
    setTimeAmount(defaultTimeAmount);
    console.log(defaultTimeAmount);
    setPattern('');
    dispatch(setAskedQuestions([]));
  }
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  useEffect(() => {
    updateResults();
    // console.log(flags);
  }, [flags, pattern, selectedFunction]);

  useEffect(() => {
    // console.log('questions');
    // console.log(questions);
    if (firstMount) {
      firstMount = false;
      return;
    }

    setRandomQuestion();
  }, [questions]);

  useEffect(() => {
    // console.log('timeAmount: ' + timeAmount);
    if (timeAmount < 1) {
      // console.log('over');

      setIsTimerActive(false);
      dispatch(setIsTestOver(true));
      //finish test trigger
    }
  }, [timeAmount]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPattern((prev) => {
      console.log(e.target.value);
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
      console.log('indexOfEl: ' + indexOfEl);
      if (indexOfEl > -1) {
        notUniqueIndexes.push(+expectedResultCopy[indexOfEl].initialIndex);
        console.log('before');
        console.log(expectedResultCopy);
        expectedResultCopy.splice(indexOfEl, 1);
        console.log('after');
        console.log(expectedResultCopy);
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
    if (!isTimerActive) setIsTimerActive(true);
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
      console.log('Error! expected result not found.');
      return;
    }
    // updateUniqueness(userResult, expectedResult);

    // function updateUniqueness(arr1: IResultMatch[], arr2: IResultMatch[]) {
    //   set;
    // }
  }, [userResult]);

  useEffect(() => {
    if (expectedResult.length < 1) return;
    console.log('no need for expectedResult: ');
    console.log(expectedResult);
  }, [expectedResult]);

  function setRandomQuestion() {
    if (!questions) return;

    const randomIndex = Math.round(Math.random() * (questions.length - 1));
    const chosenQuestion = questions.splice(randomIndex, 1)[0];

    if (questions.length < 1 && chosenQuestion === undefined) {
      setIsTimerActive(false);
      dispatch(setIsTestOver(true));
      return;
    }
    dispatch(setCurrentQuestion(chosenQuestion));

    dispatch(resetFlags());

    // setPattern(chosenQuestion.possibleAnswer);
  }

  useEffect(() => {
    if (currentQuestion && currentQuestion.expectedResult) {
      // alert('here)');
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
    // console.log('isRightAnswer: ' + isRightAnswer);
    if (isRightAnswer) {
      let completedQuestion = {
        userAnswer: `${pattern}/${getFlagsString(flags)}`,
        ...currentQuestion,
      } as IQuestion;
      dispatch(setAskedQuestions([...askedQuestions, completedQuestion]));
      const timeout = setTimeout(() => {
        // console.log("time");
        setIsRightAnswer(false);
      }, 1000);
      setRandomQuestion();

      return () => {
        //not working for some reason, TODO fix later
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
  }

  function handleClickSkip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //finish test trigger
    dispatch(setAskedQuestions([...askedQuestions, { ...currentQuestion }]));
    setPattern('');
    setRandomQuestion();
  }

  useEffect(() => {
    if (currentQuestion) {
      // console.log(userResult);
      // console.log(expectedResult);
    }
  });

  const skippedQuestionsAmount = askedQuestions.filter((el) => {
    return 'userAnswer' in el ? 0 : 1;
  }).length;
  console.log(skippedQuestionsAmount);
  console.log(askedQuestions);
  return (
    <>
      <h1 className="title">{title}</h1>
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
            setIsTimerActive={setIsTimerActive}></Timer>
          <h2 className="task">
            {currentQuestion
              ? currentQuestion.task
              : 'error: question not found!'}
          </h2>
          <div>
            <span className="questionsCount">
              {askedQuestions.length - skippedQuestionsAmount}(
              {skippedQuestionsAmount})/
              {questionsLength}
            </span>
            <button
              onClick={handleClickSkip}
              disabled={isTestOver}
              className="formBtn">
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
        <TestInput value={pattern} handleChange={handleChange}></TestInput>
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
                expectedResult.map((el, i) => (
                  <span
                    key={i}
                    className={
                      el.isUnique ? 'matchElementWrong' : 'matchElement'
                    }>
                    {el.match}
                  </span>
                ))}
            </div>
          </div>
          <div className="resultBlock">
            <div className="resultLabel">Your result</div>
            {userResult.length < 1 ? (
              <span>No matches</span>
            ) : (
              <div className="wrapper">
                {userResult.map((el, i) => (
                  <span
                    className={
                      el.isUnique ? 'matchElementWrong' : 'matchElement'
                    }
                    key={i}>
                    {el.match}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {isRightAnswer ? <Popup></Popup> : null}
      </form>
    </>
  );
}
