import React, {
  createContext,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import './App.scss';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import {
  useSendTestMutation,
  apiSlice,
  useLazyCheckAuthQuery,
} from './features/api/apiSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setDataOfTest } from './features/global/globalSlice';
import Notification from './components/Notification';
import { setIsTestOver } from './features/testForm/testFormSlice';
import AppRouter from './components/AppRouter';

function App() {
  //should be only if not
  const [generateUser, { data: _data, error: _error, isLoading: _isLoading }] =
    apiSlice.endpoints.getUniqueNickname.useLazyQuery();
  const [expiredInTest, setExpiredTest] = useState<any>(1000);
  const [sendTest, response] = useSendTestMutation();
  const [
    checkAuth,
    { data: authData, error: authError, isLoading: authIsLoading },
  ] = useLazyCheckAuthQuery();

  const askedQuestions = useAppSelector(
    (state) => state.testForm.askedQuestions
  );
  useEffect(() => {}, []);

  useEffect(() => {
    // this code here to generate User data if not authorized and not found genUserId
    const storedToken = localStorage.getItem('userToken');

    if (!storedToken && !localStorage.getItem('genUserId')) {
      generateUser('test').then((res) => {
        console.log('generateUser response');
        if (res?.data) {
          localStorage.setItem('genUserId', res.data.id);
          localStorage.setItem('genUserNickname', res.data.nickname);
        } else {
          localStorage.setItem('genUserId', '-1');
          localStorage.setItem('genUserNickname', 'You');
        }
      });
    }

    if (storedToken) {
      //checkAuth each 23 hours just because some users can get on site and do nothing for 24h,
      //then they will send test or new question, but it will not be added to their ID,
      //because token would be expired
      const authInterval = setInterval(() => {
        // console.log('ckechAuth');
        checkAuth('123S').then((res) => {
          if ('data' in res)
            if (res.data?.token)
              localStorage.setItem('userToken', res.data.token);
          // console.log(res);
        });
      }, 82800000);

      return () => {
        clearInterval(authInterval);
      };
    }
  }, []); //idk why it was without dependency array, should work like that

  const dataOfTest = useAppSelector((state) => state.global.dataOfTest);

  useEffect(() => {
    // console.log('POST API CALL useEffect');
    if (dataOfTest != null) {
      alert('POST API CALL');
      console.log(dataOfTest);
      sendTest(dataOfTest).then((res) => {
        console.log(res);
        if ('data' in res) {
          if (res.data?.token) {
            console.log(res.data.token);
            localStorage.setItem('userToken', res.data.token);
          }
        }
        // if(res?.data?.token)
      });
      dispatch(setDataOfTest(null));
    }
  }, [dataOfTest]);

  useEffect(() => {
    function handleBeforeUnload(ev: BeforeUnloadEvent) {
      ev.preventDefault();
      // prepareAndSendEndedTest();
      // return (ev.returnValue = 'Are you sure you want to close?');
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

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
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setNotificationPosition({
      x: event.clientX + scrollLeft,
      y: event.clientY + scrollTop,
    });
  };

  const location = useLocation();
  const paths = ['/', '/flags', '/all'];
  useEffect(() => {
    if (!paths.includes(location.pathname)) {
      //one of testForm are open
      dispatch(setIsTestOver(false));
      console.log('paths.includes:');
      console.log(paths.includes(location.pathname));
      // dispatch(setDataOfTest())
    }
  }, [location.pathname]);
  useEffect(() => {
    console.log('expiredInTest');
    console.log(expiredInTest);
  }, [expiredInTest]);
  return (
    <div className="global">
      <div className="app">
        <div className="main" onMouseMove={handleMouseMove}>
          <Header />
          <div className="content">
            <AppRouter></AppRouter>
          </div>
          <Footer />
          {notificationText?.length > 0 && (
            <Notification position={notificationPosition}></Notification>
          )}
        </div>
        {/* <button onClick={() => setExpiredTest((prev: any) => prev + 10000)}>
          CLICK
        </button> */}
      </div>
    </div>
  );
}

export default App;
