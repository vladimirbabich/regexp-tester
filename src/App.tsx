import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import Popup from "./components/Popup";
import { initialText, expectedResult, getMatch } from "./tester";

function App() {
  const [result, setResult] = useState("");
  const [isRightAnswer, setIsRightAnswer] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (typeof e.target.value != "string" || e.target.value.length == 0) {
      if (result) setResult("");
      return;
    }

    let pattern = e.target.value || "";
    let flags = "";
    if (pattern.indexOf("/") > -1) [pattern, flags] = pattern.split("/");
    // console.log("flags: " + flags);

    const match: string | undefined = getMatch(initialText, pattern, flags);
    if (match) {
      setResult(match);
      return;
    }

  }
  useEffect(() => {
    console.log(`${result} == ${expectedResult}`);
    if (result == expectedResult) {
      setIsRightAnswer(true);
    }
  }, [result]);
  
  useEffect(() => {
    console.log("isRightAnswer: " + isRightAnswer);
    const timeout = setTimeout(() => {
      console.log("time");
      setIsRightAnswer(false);
    }, 1000000);
    // return clearTimeout(timeout)
  }, [isRightAnswer]);
  return (
    <div className="App">
      <header className="App-header">
        <Form className="container">
          <Form.Label>Initial text</Form.Label>
          <Form.Control
            as="textarea"
            className="readonly"
            id="initialTextInput"
            rows={4}
            readOnly={true}
            value={initialText}
          ></Form.Control>
          <Form.Label>Type regular expression</Form.Label>
          <Form.Control
            as="input"
            id="regexpInput"
            onChange={handleChange}
          ></Form.Control>
          <Row>
            <Col>
              <Form.Label>Expected result</Form.Label>
              <Form.Control
                as="input"
                className="readonly"
                id="expectedResult"
                readOnly={true}
                value={expectedResult}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Label>Your result</Form.Label>
              <Form.Control
                as="input"
                className="readonly"
                id="result"
                value={result}
              ></Form.Control>
            </Col>
          </Row>
          {isRightAnswer ? <Popup></Popup> : null}
        </Form>
      </header>
    </div>
  );
}

export default App;
