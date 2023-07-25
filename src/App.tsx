import { MouseEvent, useEffect, useRef, useState } from 'react';
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
import { setDataOfTest, setUserToken } from './features/global/globalSlice';
import Notification from './components/Notification';
import { setIsTestOver } from './features/testForm/testFormSlice';
import AppRouter from './components/AppRouter';
import checkAuthToken from './controllers/AuthorizationController';
import { localStorageController } from './controllers/StorageController';
//test git
//test git2
function App() {
  //should be only if not
  const [sendTest] = useSendTestMutation();
  const [
    checkAuth,
    { data: authData, error: authError, isLoading: authIsLoading },
  ] = useLazyCheckAuthQuery();
  const userToken = useAppSelector((state) => state.global.userToken);

  useEffect(() => {
    if (userToken) {
      //checkAuth each 23 hours just because some users can get on site and do nothing for 24h,
      //then they will send test or new question, but it will not be added to their ID,
      //because token would be expired
      const authInterval = setInterval(() => {
        checkAuth('check').then((res) => {
          if ('data' in res)
            if (res.data?.token) {
              dispatch(setUserToken(res.data.token));
            }
        });
      }, 82800000);

      return () => {
        clearInterval(authInterval);
      };
    }
  }, []);

  const dataOfTest = useAppSelector((state) => state.global.dataOfTest);

  useEffect(() => {
    if (dataOfTest != null) {
      const request = sendTest(dataOfTest);
      request.then((res) => {
        if ('data' in res) {
          localStorageController.updateGenUserId(res.data.userId);
        }

        if ('data' in res) {
          if (res.data?.token) {
            dispatch(setUserToken(res.data.token));
          }
        }
        // if(res?.data?.token)
      });
      dispatch(setDataOfTest(null));

      // return () => {
      //   request.abort();
      // };
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
  useEffect(() => {
    if (userToken) {
      checkAuthToken(dispatch, userToken);
    }
  }, [userToken]);

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
    }
  }, [location.pathname]);

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
      </div>
    </div>
  );
}

export default App;
