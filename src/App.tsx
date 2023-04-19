import React, {
  createContext,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import TestForm from './components/TestForm';
import Footer from './components/Footer';
import Header from './components/Header';
import store from './app/store';
import { setIsFlagsBlockOpen } from './features/testInput/testInputSlice';
import Leaderboard from './components/Leaderboard';
import Analyzer from './components/Analyzer';
import SignPage from './components/SignPage';
import { useGetNewNickNameQuery } from './features/api/apiSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setDefaultNickname } from './features/global/globalSlice';
import Notification from './components/Notification';

function App() {
  //should be only if not
  const { data, error, isLoading } = useGetNewNickNameQuery('all');
  useEffect(() => {
    // console.log('ggggg');
    // console.log(isLoading);
    if (isLoading == false) dispatch(setDefaultNickname(data.nickname));
  }, [isLoading]);
  const dispatch = useAppDispatch();
  // if
  const tableRef = useRef<HTMLDivElement>(null);
  const notificationText = useAppSelector(
    (state) => state.global.notificationText
  );
  const [notificationPosition, setNotificationPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const handleMouseMove = (event: MouseEvent) => {
    setNotificationPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div className="global">
      <div className="app">
        <div className="main" onMouseMove={handleMouseMove}>
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
                  <Leaderboard title="Leaderboard" mode="min5"></Leaderboard>
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
              <Route path="/sign" element={<SignPage />}></Route>
            </Routes>
          </div>
          <Footer />
          {notificationText?.length > 0 && (
            <Notification position={notificationPosition}></Notification>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
