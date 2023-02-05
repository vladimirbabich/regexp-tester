import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import TestForm from "./components/TestForm";
import TestStart from "./components/TestStart";

function App() {
  const [isTestMode, setIsTestMode] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {isTestMode ? (
          <TestForm />
        ) : (
          <TestStart setIsTestMode={setIsTestMode} />
        )}
      </header>
      <footer className="App-footer">
        <span>
          2023 &copy;{" "}
          <a
            href="https://github.com/vladimirbabich"
            target="_blank"
            className="link"
          >
            vladimirbabich
          </a>(Github)
        </span>
      </footer>
    </div>
  );
}

export default App;
