import React, { useEffect, useState } from "react";
import "./../App.css";
import { Form, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import Popup from "./Popup";
import { expectedResult, getMatch } from "../TestController";
import questions from "./../questions";
export default function Tester() {
  const [result, setResult] = useState<string>("");
  const [isRightAnswer, setIsRightAnswer] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>(questions[10].text);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!currentText) return;
    if (typeof e.target.value != "string" || e.target.value.length === 0) {
      if (result) setResult("No matches");
      return;
    }

    const answer: string = e.target.value;
    let pattern: string | undefined = undefined,
      flags: string | undefined = undefined;
    if (e.target.value.indexOf("/") > -1) [pattern, flags] = answer.split("/");

    const match: string | undefined = getMatch(
      currentText,
      pattern || answer,
      flags
    );
    if (match) {
      setResult(match);
      return;
    }
    //else {
    setResult("No matches");
  }
  useEffect(() => {
    // console.log(`currentText: ${currentText}`);
    // console.log(`${result} == ${expectedResult}`);
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
    <Form className="container">
      <Row>
        <Form.Label>{questions[10].task}</Form.Label>
        <Form.Control
          as="input"
          id="regexpInput"
          placeholder="Type regular expression"
          onChange={handleChange}
        ></Form.Control>
      </Row>
      <Row>
        <Col>
          <Form.Control
            as="textarea"
            className="readonly"
            id="initialTextInput"
            rows={4}
            // readOnly={true}
            value={currentText}
            onChange={(e) => {
              setCurrentText(e.target.value);
            }}
          ></Form.Control>
        </Col>
        <Col>
          <Form.Control
            as="textarea"
            className="readonly"
            placeholder="Your result"
            id="initialTextInput"
            rows={4}
            // readOnly={true}
            value={result}
          ></Form.Control>
        </Col>
      </Row>
      <Row>
        <Form.Label>Expected result</Form.Label>
        <Form.Control
          as="input"
          className="readonly"
          id="expectedResult"
          readOnly={true}
          value={questions[10].expectedResult}
        ></Form.Control>
      </Row>
      {isRightAnswer ? <Popup></Popup> : null}
      <h1>Don`t know regular expression? Learn here:</h1>
      <ListGroup>
        <ListGroupItem>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp"
            target="_blank"
            rel="noopener noreferrer"
          >
            MDN web docs
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a
            href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            W3 schools
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <a
            href="https://docs.python.org/3/library/re.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Python docs
          </a>
        </ListGroupItem>
      </ListGroup>
    </Form>
  );
}
