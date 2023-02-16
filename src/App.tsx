import React, { createContext, useEffect, useState } from "react";
import "./App.scss";
import TestForm from "./components/TestForm";
import Information from "./components/Information";
import { Footer } from "./components/Footer";
import Header from "./components/Header";

export const GlobalContext = createContext<{ clickedElementId: string }>({
  clickedElementId: "",
});

function App() {
  const [isTestMode, setIsTestMode] = useState(true);
  const [clickedElementId, setclickedElementId] = useState<string>("");

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const elementId = (e.target as HTMLElement).id;
    if (
      elementId.indexOf("flagsSelect") > -1 ||
      elementId.indexOf("flagsOption") > -1 ||
      elementId.indexOf("selectActivator") > -1
    ) {
      setclickedElementId(elementId);
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
      <div className="app" onClick={handleClick}>
        <Header />
        <div className="main">
          <h1 className="title">Test your RegExp knowledge!</h1>
          <TestForm />
        </div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
