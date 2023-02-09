import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TestForm from "./components/TestForm";
import Information from "./components/Information";

export const GlobalContext = createContext<{ clickedElementId: string }>({
  clickedElementId: "",
});
function App() {
  const [isTestMode, setIsTestMode] = useState(true);
  const [clickedElementId, setclickedElementId] = useState<string>("");

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log("class: " + (e.target as HTMLElement).id);
    const elementId = (e.target as HTMLElement).id;
    if (
      elementId.indexOf("flagsSelect") > -1 ||
      elementId.indexOf("flagsOption") > -1 ||
      elementId.indexOf("selectActivator") > -1
    ) {
      setclickedElementId(elementId);
      console.log("flagsOption:" + (e.target as HTMLElement).id);
      return;
    }
    if (clickedElementId.length > 0) {
      setclickedElementId("");
    }
  }

  useEffect(() => {
    console.log(`clickedElementId: ${clickedElementId}`);
  }, [clickedElementId]);
  return (
    <GlobalContext.Provider value={{ clickedElementId }}>
      <div className="App" onClick={handleClick}>
        <header className="navigation">
          <button>full test</button>
          <button disabled>5 minutes test</button>
          <button disabled>test</button>
        </header>
        <div className="App-header">
          <h1>REGEXP TESTER</h1>
          <TestForm />
          <Information></Information>
        </div>
        <footer className="App-footer">
          <span>
            2023 &copy;
            <a
              href="https://github.com/vladimirbabich"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              &nbsp;vladimirbabich
            </a>
            (Github)
          </span>
        </footer>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
