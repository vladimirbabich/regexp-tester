import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import './../App.scss';
import './../styles/SignPage.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function SignPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const storedUser = localStorage.getItem('userToken');
  if (storedUser) return <Navigate to="/" replace={true} />;
  const nickname = localStorage.getItem('genUserNickname');
  // useEffect(() => {
  //   console.log(passRef);
  // }, [passRef, nickRef.current?.value, emailRef]);
  // console.log(isSignUp);
  function handleSwitchClick(e: any) {
    setIsSignUp(!isSignUp);
  }

  if (isSignUp)
    return <SignUp nickname={nickname} handleSwitchClick={handleSwitchClick} />;
  return <SignIn nickname={nickname} handleSwitchClick={handleSwitchClick} />;
}
