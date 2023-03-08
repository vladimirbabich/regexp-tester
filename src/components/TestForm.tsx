import React, { useEffect, useRef, useState } from 'react';
import './../App.scss';
import './../styles/TestForm.scss';
import Popup from './Popup';
import { expectedResult, getResult } from '../TestController';
import allQuestions from './../questions';
import Timer from './Timer';
import TestInput from './TestInput';
import { IDropDownPickerList, ISolvedQuestion, IQuestion } from './../types';
import { getFlagsString } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  resetFlags,
  setCurrentQuestion,
  setSelectedFunction,
} from '../features/testForm/testFormSlice';
import TestScore from './TestScore';

export default function TestForm() {
  const dispatch = useAppDispatch();
  const flags = useAppSelector((state) => state.testForm.flags);
  const questionsLength = allQuestions.length;
  const [questions, setQuestions] = useState<IQuestion[] | null>([
    ...allQuestions,
  ]);
  const currentQuestion = useAppSelector(
    (state) => state.testForm.currentQuestion
  );
  const selectedFunction = useAppSelector(
    (state) => state.testForm.selectedFunction
  );
  const [pattern, setPattern] = useState<string>('');
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);

  const [solvedQuestions, setSolvedQuestions] = useState<
    Array<ISolvedQuestion>
  >([]);
  const [skippedQuestions, setSkippedQuestions] = useState<Array<IQuestion>>(
    []
  );

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeAmount, setTimeAmount] = useState<number>(333);
  const [isTestOver, setIsTestOver] = useState<boolean>(true);

  useEffect(() => {
    updateResult();
    // console.log(flags);
  }, [flags, pattern, selectedFunction]);

  useEffect(() => {
    // console.log('questions');
    // console.log(questions);
    setRandomQuestion();
    return () => {
      setQuestions(allQuestions);
    };
  }, [questions]);

  useEffect(() => {
    if (timeAmount < 1) {
      console.log('over');
      setIsTestOver(true);
      //finish test trigger
    }
  }, [timeAmount]);

  const [result, setResult] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPattern((prev) => {
      console.log(e.target.value);
      return e.target.value;
    });
  }
  function updateResult() {
    if (!isTimerActive) setIsTimerActive(true);
    if (!currentQuestion) return;
    if (pattern.length == 0) {
      if (result) setResult('');
      return;
    }
    const match: string | undefined = getResult(
      currentQuestion.text,
      pattern,
      selectedFunction,
      getFlagsString(flags)
    );
    if (match) {
      setResult(match);
      return;
    }
    //else {
    setResult('');
  }

  useEffect(() => {
    if (!currentQuestion) return;
    if (result === currentQuestion.expectedResult) {
      setIsRightAnswer(true);
    }
  }, [result]);

  function setRandomQuestion() {
    // console.log('RAND');
    if (!questions) return;
    if (questions.length < 1) {
      console.log('over');
      setIsTestOver(true);
      return;
    }
    const randomIndex = Math.round(Math.random() * (questions.length - 1));
    const chosenQuestion = questions.splice(randomIndex, 1)[0];
    console.log(questions);
    console.log(chosenQuestion);
    dispatch(setCurrentQuestion(chosenQuestion));

    dispatch(resetFlags());
    setPattern(chosenQuestion.possibleAnswer);
  }
  useEffect(() => {
    // console.log('currentQuestion');
    // console.log(currentQuestion);
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
      } as ISolvedQuestion;
      console.log(solvedQuestions);
      setSolvedQuestions((prev) => {
        return [...prev, completedQuestion];
      });
      console.log('tuta');
      console.log(solvedQuestions);
      console.log(completedQuestion);
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
    setIsTestOver(true);
  }

  function handleClickSkip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    //finish test trigger
    setSkippedQuestions((prev) => {
      return [...prev, { ...currentQuestion } as IQuestion];
    });
    setRandomQuestion();
  }
  return (
    <form className="testForm">
      {isTestOver && (
        <TestScore
          skippedAmount={skippedQuestions.length}
          solvedAmount={solvedQuestions.length}></TestScore>
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
            {solvedQuestions?.length}({skippedQuestions?.length})/
            {questionsLength}
          </span>
          <button onClick={handleClickSkip} className="formBtn">
            Skip
          </button>
          <button onClick={handleClickGiveUp} className="formBtn">
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
              currentQuestion.expectedResult.split('|').map((el, i) => (
                <span key={i} className="matchElement">
                  {el}
                </span>
              ))}
          </div>
        </div>
        <div className="resultBlock">
          <div className="resultLabel">Your result</div>
          {result == '' ? (
            <span>No matches</span>
          ) : (
            <div className="wrapper">
              {result.split('|').map((el, i) => (
                <span className="matchElement" key={i}>
                  {el}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {isRightAnswer ? <Popup></Popup> : null}
    </form>
  );
}
