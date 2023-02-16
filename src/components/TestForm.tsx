import React, { useEffect, useRef, useState } from "react";
import "./../App.scss";
import "./../styles/TestForm.scss";
import Popup from "./Popup";
import { expectedResult, getMatch } from "../TestController";
import allQuestions from "./../questions";
import Timer from "./Timer";
import TestInput from "./TestInput";
import { FlagsType, IGameQuestion, IQuestion } from "./../types";
import { getFlagsString } from "../utils";

console.log("outside");

export default function TestForm() {
  const [flags, setFlags] = useState<FlagsType[]>([
    {
      name: "g",
      description: "all matches",
      status: false,
    },
    {
      name: "i",
      description: "case insensitive",
      status: true,
    },
    {
      name: "m",
      description: "multiline",
      status: true,
    },
  ]);
  const [questions, setQuestions] = useState<IQuestion[] | null>(allQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [pattern, setPattern] = useState<string>("");

  const [isShowExpectedResult, setIsShowExpectedResult] =
    useState<boolean>(false);
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);

  const questionsOfCurTest: Array<IGameQuestion> = [];

  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeAmount, setTimeAmount] = useState<number>(300);

  useEffect(() => {
    updateResult();
  }, [flags, pattern]);

  useEffect(() => {
    console.log("here: " + questions);
    setRandomQuestion();
  }, [questions]);

  const [result, setResult] = useState<string>(
    "a|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d"
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPattern((prev) => e.target.value);
  }
  function updateResult() {
    if (!isTimerActive) setIsTimerActive(true);
    if (!currentQuestion) return;
    if (pattern.length == 0) {
      if (result) setResult("");
      return;
    }

    const match: string | undefined = getMatch(
      currentQuestion.text,
      pattern,
      getFlagsString(flags)
    );
    if (match) {
      setResult(match);
      return;
    }
    //else {
    setResult("");
  }

  useEffect(() => {
    if (!currentQuestion) return;
    if (result === currentQuestion.expectedResult) {
      setIsRightAnswer(true);
    }
  }, [result]);

  useEffect(() => {
    console.log("effect");
  }, []);
  function setRandomQuestion() {
    const randomIndex = Math.round(Math.random() * (allQuestions.length - 1));
    setCurrentQuestion({ ...allQuestions[randomIndex] });
    console.log("allQuestions[randomIndex].possibleAnswer");
    console.log(allQuestions[randomIndex].possibleAnswer);
    setPattern(allQuestions[randomIndex].possibleAnswer);
  }
  useEffect(() => {
    console.log("currentQuestion");
    console.log(currentQuestion);
  }, [currentQuestion]);
  /**
   * ! Does not abort current timeout
   * TODO fix return
   */
  useEffect(() => {
    console.log("isRightAnswer: " + isRightAnswer);
    if (isRightAnswer) {
      questionsOfCurTest.push({
        isDone: true,
        userAnswer: pattern,
        ...currentQuestion,
      } as IGameQuestion);
      console.log("tuta");
      console.log(questionsOfCurTest);
      const timeout = setTimeout(() => {
        // console.log("time");
        setIsRightAnswer(false);
      }, 1000);
      //TODO reset testform

      //TODO get new question

      return () => {
        //not working for some reason, TODO fix later
        clearTimeout(timeout);
      };
    }
  }, [isRightAnswer]);

  function handleClickSkip(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  return (
    <form className="testForm">
      <div className="testInfo">
        <Timer
          timeAmount={timeAmount}
          setTimeAmount={setTimeAmount}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        ></Timer>
        <h2
          className="task"
          // onMouseEnter={(e) => setIsShowExpectedResult(true)}
        >
          {currentQuestion
            ? currentQuestion.task
            : "error: question not found!"}
          &nbsp;
          <button
            onMouseEnter={(e) => setIsShowExpectedResult(true)}
            onMouseLeave={(e) => setIsShowExpectedResult(false)}
            className="expectedBtn"
          >
            ?
          </button>
        </h2>
        {isShowExpectedResult && currentQuestion && (
          <div className="expectedResult">
            <p className="expectedResultTitle">Expected result:</p>
            <div className="wrapper">
              {currentQuestion.expectedResult.split("").map((el) => (
                <span className="matchElement">{el}</span>
              ))}
            </div>
          </div>
        )}
        <div>
          <span className="questionsCount">0/{allQuestions.length}</span>
          <button onClick={handleClickSkip} className="skipBtn">
            Skip
          </button>
        </div>
      </div>
      <TestInput
        value={pattern}
        handleChange={handleChange}
        flags={flags}
        setFlags={setFlags}
      ></TestInput>
      <div className="texts">
        <p className="textBlock">{currentQuestion && currentQuestion.text}</p>
        <div className="resultBlock">
          {result == "" ? (
            <span>No matches</span>
          ) : (
            <div className="wrapper">
              {result.split("|").map((el) => (
                <span className="matchElement">{el}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {isRightAnswer ? <Popup></Popup> : null}
    </form>
  );
}
