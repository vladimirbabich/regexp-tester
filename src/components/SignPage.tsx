import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import './../App.scss';
import './../styles/SignPage.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function SignPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isActiveSubmit, setIsActiveSubmit] = useState<boolean>(false);
  const nickRef = useRef<any>();
  const passRef = useRef<any>();
  const emailRef = useRef<any>();
  // useEffect(() => {
  //   console.log(passRef);
  // }, [passRef, nickRef.current?.value, emailRef]);
  function handleChange({ target }: any) {
    console.log(target.value);
    if (nickRef.current.value && passRef.current.value) {
      setIsActiveSubmit(true);
    } else {
      setIsActiveSubmit(false);
    }
    console.log(nickRef.current?.value.length);
  }
  function handleSwitchClick(e: any) {
    setIsSignUp(!isSignUp);
  }

  if (isSignUp)
    return (
      <SignUp
        setIsActiveSubmit={setIsActiveSubmit}
        isActiveSubmit={isActiveSubmit}
        nickRef={nickRef}
        passRef={passRef}
        emailRef={emailRef}
        handleSwitchClick={handleSwitchClick}
      />
    );
  return (
    <SignIn
      setIsActiveSubmit={setIsActiveSubmit}
      isActiveSubmit={isActiveSubmit}
      nickRef={nickRef}
      passRef={passRef}
      emailRef={emailRef}
      handleSwitchClick={handleSwitchClick}
    />
  );
}
