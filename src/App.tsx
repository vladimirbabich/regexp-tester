import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import TestForm from './components/TestForm';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppDispatch } from './app/hooks';
import store from './app/store';
import { setIsFlagsBlockOpen } from './features/testInput/testInputSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('tick');
  }, []);
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const testInputState = store.getState().testInput;
    const elementId = (e.target as HTMLElement).id;
    if (
      elementId.indexOf('flagsSelect') > -1 ||
      elementId.indexOf('flagsOption') > -1
    ) {
      if (!testInputState.isFlagsBlockOpen) {
        dispatch(setIsFlagsBlockOpen(true));
        return;
      }
      return;
    }
    if (elementId.indexOf('selectActivator') > -1) {
      dispatch(
        setIsFlagsBlockOpen(!store.getState().testInput.isFlagsBlockOpen)
      );
      return;
    }
    if (testInputState.isFlagsBlockOpen) {
      dispatch(setIsFlagsBlockOpen(false));
    }
  }
  return (
    <div className="app" onClick={handleClick}>
      {/* <button onClick={() => dispatch(removeClickedElementId())}>
        TESTREM
      </button>
      <button onClick={() => dispatch(setClickedElementId('testset'))}>
        TESTSET
      </button> */}
      <Header />
      <div className="main">
        <h1 className="title">Test your RegExp knowledge!</h1>
        <TestForm />
      </div>
      <Footer />
    </div>
  );
}

export default App;
