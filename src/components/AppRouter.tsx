import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Analyzer from './Analyzer';
import Leaderboard from './Leaderboard';
import SignPage from './SignPage';
import { Stats } from './Stats';
import TestForm from './TestForm';

export default function AppRouter() {
  const activeMode = useAppSelector((state) => state.testForm.activeMode);

  const privateRoutes = [
    {
      path: '/test',
      key: '/test',
      element: (
        <>
          {/* <TestForm mode="min5" title="min5" /> */}
          {/* Test your RegExp knowledge! */}
          {/* <TestForm mode="all" title="all" /> */}
          <TestForm mode="flags" title="only flags" />
          <Leaderboard title="Leaderboard" mode={activeMode}></Leaderboard>
        </>
      ),
    },
  ];

  const testFormRoutes = [
    {
      path: '/all',
      key: '/all',
      element: <TestForm mode="all" title="allQuestions" />,
    },
    { path: '/', key: '/', element: <TestForm mode="min5" title="min5" /> },
    {
      path: '/flags',
      key: '/flags',
      element: <TestForm mode="flags" title="flags" />,
    },
  ];

  const routes = [
    {
      path: '/leaderboard',
      key: '/leaderboard',
      element: <Leaderboard title="Leaderboard" mode={activeMode} />,
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
    </Routes>
  );
}
