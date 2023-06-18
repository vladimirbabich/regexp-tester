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

  const privateRoutes = [
    {
      path: '/test',
      key: '/test',
      element: (
        <>
          {/* <TestForm mode="min5" title="min5" /> */}
          {/* Test your RegExp knowledge! */}
          {/* <TestForm mode="all" title="all" /> */}
          <TestForm mode="flags" title="Only flags" />
          <Leaderboard mode={activeMode}></Leaderboard>
        </>
      ),
    },
  ];

  const testFormRoutes = [
    {
      path: '/all-questions',
      key: '/all-questions',
      element: (
        <TestForm
          mode="all-questions"
          title={`Complete as many tasks as you can.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/all-questions',
      key: '/all-questions',
      element: (
        <TestForm
          mode="all-questions"
          title={`Complete as many tasks as you can.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/',
      key: '/',
      element: (
        <TestForm
          mode="minutes-5"
          title={`Complete as many tasks as you can in five minutes.\nWrite a regular expression to get the expected result.`}
        />
      ),
    },
    {
      path: '/minutes-5',
      key: '/minutes-5',
      element: (
        <TestForm
          mode="minutes-5"
          title={
            'Complete as many tasks as you can in five minutes.\nWrite a regular expression to get the expected result.'
          }
        />
      ),
    },
    // { - will add if create 30+ questions
    //   path: '/only-flags',
    //   key: '/only-flags',
    //   element: <TestForm mode="only-flags" title="flags" />,
    // },
  ];
  const quizFormRoutes = [
    {
      path: '/quiz',
      key: '/quiz',
      element: <QuizForm mode={'quiz'}/>,
    },
  ];
  const routes = [
    {
      path: '/leaderboard',
      key: '/leaderboard',
      element: <Leaderboard mode={activeMode} />,
    },
    {
      path: '/results',
      key: '/results',
      element: <Analyzer title="Test results" />,
    },
    {
      path: '/sign',
      key: '/sign',
      element: <SignPage />,
    },
    {
      path: '*',
      key: '*',
      element: <Navigate to="/" replace={true} />,
    },

    // {
    //   path: '/stats',
    //   key: '/stats',
    //   element: <Stats />,
    // },
  ];
  return (
    <Routes>
      {routes.map((el) => (
        <Route path={el.path} key={el.key} element={el.element}></Route>
      ))}
      {privateRoutes.map((el) => (
        <Route path={el.path} key={el.key} element={el.element}></Route>
      ))}
      {testFormRoutes.map((el) => (
        <Route path={el.path} key={el.key} element={el.element}></Route>
      ))}
      {quizFormRoutes.map((el) => (
        <Route path={el.path} key={el.key} element={el.element}></Route>
      ))}
    </Routes>
  );
}
