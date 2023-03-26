import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import TestForm from './components/TestForm';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppDispatch } from './app/hooks';
import store from './app/store';
import { setIsFlagsBlockOpen } from './features/testInput/testInputSlice';
import Leaderboard from './components/Leaderboard';
import Analyzer from './components/Analyzer';

function App() {
  const dispatch = useAppDispatch();

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
    <div className="global">
      <div className="app" onClick={handleClick}>
        <div className="main">
          <Header />
          <div className="content">
            <Routes>
              <Route
                path="/all"
                element={
                  <TestForm mode="allQuestions" title="allQuestions" />
                }></Route>
              <Route
                path="/"
                element={<TestForm mode="min5" title="min5" />}></Route>
              <Route
                path="/flags"
                element={<TestForm mode="flags" title="flags" />}></Route>
              <Route
                path="/leaderboard"
                element={
                  <Leaderboard
                    title="Leaderboard"
                    defaultMode="min5"></Leaderboard>
                }></Route>
              <Route
                path="/test"
                element={
                  <>
                    <TestForm mode="min5" title="min5" />
                    {/* Test your RegExp knowledge! */}
                    <TestForm mode="allQuestions" title="all" />
                    <TestForm mode="flags" title="only flags" />
                  </>
                }></Route>
              <Route
                path="/results"
                element={<Analyzer title="Test results" />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
