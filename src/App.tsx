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

function App() {
  //should be only if not
  const [generateUser] = apiSlice.endpoints.getUniqueNickname.useLazyQuery();
  const [sendTest] = useSendTestMutation();
  const [
    checkAuth,
    { data: authData, error: authError, isLoading: authIsLoading },
  ] = useLazyCheckAuthQuery();
  const userToken = useAppSelector((state) => state.global.userToken);

  useEffect(() => {
    // this code here to generate User data if not authorized and not found genUserId
    const genId = localStorage.getItem('genUserId');
    if (!userToken && (!genId || genId == '-1')) {
      generateUser('test').then((res) => {
        console.log('generateUser response');
        // alert(`res.data: ${res.data.id} ${res.data.nickname}`);

        if (res?.data) {
          localStorage.setItem('genUserId', res.data.id);
          localStorage.setItem('genUserNickname', res.data.nickname);
        } else {
          localStorage.setItem('genUserId', '-1');
          localStorage.setItem('genUserNickname', 'You');
        }
      });
    }

    if (userToken) {
      //checkAuth each 23 hours just because some users can get on site and do nothing for 24h,
      //then they will send test or new question, but it will not be added to their ID,
      //because token would be expired
      const authInterval = setInterval(() => {
        // console.log('ckechAuth');
        checkAuth('123S').then((res) => {
          if ('data' in res)
            if (res.data?.token) {
              console.log(`App delay set: ${res.data.token}`);
              dispatch(setUserToken(res.data.token));
            }
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
      // alert('POST API CALL');
      console.log(dataOfTest);
      sendTest(dataOfTest).then((res) => {
        console.log(res);
        if ('data' in res) {
          if (res.data?.token) {
            // console.log(res.data.token);
            console.log(`App dataOfTest set: ${res.data.token}`);
            dispatch(setUserToken(res.data.token));
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
      console.log('paths.includes:');
      console.log(paths.includes(location.pathname));
      // dispatch(setDataOfTest())
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
