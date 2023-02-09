import React, { useEffect, useRef, useState } from "react";
import "./../App.css";
import {
  Form,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Popup from "./Popup";
import { expectedResult, getMatch } from "../TestController";
import questions from "./../questions";
import Timer from "./Timer";
import TestInput from "./TestInput";
import { FlagsType } from "./../types";
import { getFlagsString } from "../utils";

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
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>(questions[3].text);
  const [pattern, setPattern] = useState<string>("");
  const [isShowExpectedResult, setIsExpectedResult] = useState<boolean>(false);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timeAmount, setTimeAmount] = useState<number>(300);

  useEffect(() => {
    updateResult();
  }, [flags, pattern]);
  const [result, setResult] = useState<string>(
    "a|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d|v|d"
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPattern((prev) => e.target.value);
  }
  function updateResult() {
    if (!isTimerActive) setIsTimerActive(true);
    if (!currentText) return;
    if (pattern.length == 0) {
      if (result) setResult("");
      return;
    }

    const match: string | undefined = getMatch(
      currentText,
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
    if (result === expectedResult) {
      setIsRightAnswer(true);
    }
  }, [result]);

  /**
   * ! Does not abort current timeout
   * TODO fix return
   */
  useEffect(() => {
    console.log("isRightAnswer: " + isRightAnswer);
    if (isRightAnswer) {
      const timeout = setTimeout(() => {
        // console.log("time");
        setIsRightAnswer(false);
      }, 1000);
      return () => {
        //not working for some reason, TODO fix later
        clearTimeout(timeout);
      };
    }
  }, [isRightAnswer]);
  return (
    <Form className="container-sm p-0">
      <Row className="no-gutters p-0 m-0">
        <Col>
          <Timer
            timeAmount={timeAmount}
            setTimeAmount={setTimeAmount}
            isTimerActive={isTimerActive}
            setIsTimerActive={setIsTimerActive}
          ></Timer>
        </Col>
        <Col>
          <Form.Label
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <p>{questions[0].task}</p>
            <span
              onMouseEnter={(e) => setIsExpectedResult(true)}
              // onMouseLeave={(e) => setIsExpectedResult(false)}
              className="lensIcon"
            >
              &#x1F50E;&#xFE0F;
            </span>
            {isShowExpectedResult && (
              <div className="expectedResult">
                <p className="expectedResultTitle">Expected result:</p>
                <div className=" wrapper">
                  {questions[3].expectedResult.split("").map((el) => (
                    <span className="matchElement">{el}</span>
                  ))}
                </div>
              </div>
            )}
          </Form.Label>
        </Col>
        <Col>
          <span className="questionsCount">0/{questions.length}</span>
          <Button>Try next</Button>
        </Col>
      </Row>
      <Row className="no-gutters p-0 m-0">
        <Col className="p-0 m-0">
          <TestInput
            handleChange={handleChange}
            flags={flags}
            setFlags={setFlags}
          ></TestInput>
        </Col>
      </Row>
      <Row className="no-gutters p-0 m-0">
        <Col className="p-0 m-0">
          <p className="textArea">{questions[3].text}</p>
        </Col>
        <Col className="p-0 m-0">
          {result == "" ? (
            <span>No matches</span>
          ) : (
            <div className="resultBlock">
              <div className="wrapper">
                {result.split("|").map((el) => (
                  <span className="matchElement">{el}</span>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
      {isRightAnswer ? <Popup></Popup> : null}
    </Form>
  );
}
