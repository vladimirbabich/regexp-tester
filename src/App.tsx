import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAppSelector } from './app/hooks';
import Notification from './components/Notification';
import AppRouter from './components/AppRouter';
import { useTokenChecker } from './globalHooks/useTokenChecker';
import { useHandleMouseMove } from './globalHooks/useHandleMouseMove';

function App() {
  const notificationText = useAppSelector(
    (state) => state.global.notificationText
  );

  useTokenChecker();

  const { notificationPosition, handleMouseMove } =
    useHandleMouseMove(notificationText);

  return (
    <div className="app">
      <div className="main" onMouseMove={handleMouseMove}>
        <Header />
        <AppRouter />
        <Footer />
        {notificationText?.length > 0 && (
          <Notification position={notificationPosition} />
        )}
      </div>
    </div>
  );
}

export default App;
