import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Analyzer from './Analyzer';
import Leaderboard from './Leaderboard';
import SignPage from './SignPage';
import { Stats } from './Stats';
import TestForm from './TestForm';
import QuizForm from './QuizForm';

export default function AppRouter() {
  const activeMode = useAppSelector((state) => state.global.activeMode);
  const userToken = localStorage.getItem('userToken');
  const privateRoutes = [
    {
      path: '/test',
      key: '/test',
      element: (
        <>
          test
          {/* <TestForm mode="flags" title="Only flags" />
          <Leaderboard mode={activeMode}></Leaderboard> */}
        </>
      ),
    },
  ];

  const testFormRoutes = [
    {
      path: '/all-questions',
      element: (
        <TestForm
          mode="all-questions"
          title={`Complete as many tasks as you can.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/all-questions',
      element: (
        <TestForm
          mode="all-questions"
          title={`Complete as many tasks as you can.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/',
      element: (
        <TestForm
          mode="minutes-5"
          title={`Complete as many tasks as you can in five minutes.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/minutes-5',
      element: (
        <TestForm
          mode="minutes-5"
          title={
            'Complete as many tasks as you can in five minutes.\nWrite a regular expression to get the expected result.'
          }
        />
      ),
    },
  ];
  const quizFormRoutes = [
    {
      path: '/quiz',
      element: <QuizForm mode={'quiz'} />,
    },
  ];
  const routes = [
    {
      path: '/leaderboard',
      element: <Leaderboard mode={activeMode} />,
    },
    {
      path: '/results',
      element: <Analyzer title="Test results" />,
    },
    {
      path: '/sign',
      element: <SignPage />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace={true} />,
    },

    // {
    //   path: '/stats',
    //   element: <Stats />,
    // },
  ];
  return (
    <Routes>
      {routes.map((el) => (
        <Route path={el.path} key={el.path} element={el.element}></Route>
      ))}
      {userToken &&
        privateRoutes.map((el) => (
          <Route path={el.path} key={el.path} element={el.element}></Route>
        ))}
      {testFormRoutes.map((el) => (
        <Route path={el.path} key={el.path} element={el.element}></Route>
      ))}
      {quizFormRoutes.map((el) => (
        <Route path={el.path} key={el.path} element={el.element}></Route>
      ))}
    </Routes>
  );
}
