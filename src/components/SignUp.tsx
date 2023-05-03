import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import jwtDecode from 'jwt-decode';
import { useRegUserMutation } from '../features/api/apiSlice';
import './../App.scss';
import './../styles/SignPage.scss';
import SignNotification from './SignNotification';
import { setUserSessionDelay } from '../features/global/globalSlice';

export default function SignUp({ nickname, handleSwitchClick }: any) {
  const nickRef = useRef<any>();
  const passRef = useRef<any>();
  const emailRef = useRef<any>();
  const [isActiveSubmit, setIsActiveSubmit] = useState<boolean>(true);
  const [regUser, response] = useRegUserMutation();
  const notificationText = useAppSelector(
    (state) => state.global.notificationText
  );

  const [nickErrorText, setNickErrorText] = useState<string>('');
  const [passErrorText, setPassErrorText] = useState<string>('');

  const dispatch = useAppDispatch();
  const userSessionDelay = useAppSelector(
    (state) => state.global.userSessionDelay
  );

  function handleChange({ target }: any) {
    // console.log(target.value);
    if (passRef.current.value) {
      setIsActiveSubmit(true);
    } else {
      setIsActiveSubmit(false);
    }
    // console.log(nickRef.current?.value.length);
  }
  function checkAuth() {
    console.log('start checkAuth');
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.log('Token was not found');
      return;
    }
    const decodedUser: any = jwtDecode(token);
    var delay = (decodedUser.exp - decodedUser.iat) * 1000;
    if (delay < 1000) {
      console.log('Session timed out');
      return;
    }
    setTimeout(() => {
      console.log('delay ends');
      //     if(!token) return;
      //     get delay
      //     if(delay>1000)
      checkAuth();
    }, delay);
  }

  function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    //clear errors
    nickRef.current.className = '';
    passRef.current.className = '';
    setNickErrorText('');
    setPassErrorText('');

    //check client errors
    if (nickRef?.current.value.length < 1) {
      nickRef.current.className = 'wrongInput';
      setNickErrorText('Type your nickname');
    }
    if (nickRef?.current.value.length < 3) {
      nickRef.current.className = 'wrongInput';
      setNickErrorText('Nickname should have atleast 3 symbols');
    }
    if (passRef?.current.value < 6) {
      passRef.current.className = 'wrongInput';
      setPassErrorText('Password should have atleast 6 symbols');
      return;
    }
    if (nickRef?.current.value.length < 3 || passRef?.current.value < 1) {
      return;
    }

    regUser({
      nickname: nickRef?.current.value || nickname,
      email: emailRef?.current.value || null,
      pass: passRef?.current.value,
    })
      .then((response) => {
        if ('data' in response) {
          //check server errors
          if ('nickError' in response.data) {
            nickRef.current.className = 'wrongInput';
            setNickErrorText(response.data.nickError);
          } else if ('passError' in response.data) {
            passRef.current.className = 'wrongInput';
            setPassErrorText(response.data.passError);
          } else {
            //reg is completed, login user
            // console.log({
            //   nickname: nickRef?.current.value || nickname,
            //   email: emailRef?.current.value || null,
            //   pass: passRef?.current.value,
            // });
            if (!response.data.token)
              setNickErrorText('Problem with registration, try later please');

            const decodedUser: any = jwtDecode(response.data.token);
            const delay = (decodedUser.exp - decodedUser.iat) * 1000;
            if (delay < 2000) {
              setNickErrorText('Session timed out, sign in instead');
              return;
            }
            dispatch(setUserSessionDelay(delay));
            console.log(`delay: ${delay}`);
            localStorage.setItem('userToken', response.data.token);
            checkAuth();
          }
        }
        if ('error' in response) alert(response.error);
      })
      .catch((reason: any) => console.log(reason));
  }

  return (
    <div className="signPage">
      <h1 className="h1Title"> Sign up</h1>
      <form className="signForm">
        <label className="important">
          <span className="field">Nickname</span>
          <input type="text" ref={nickRef} onChange={handleChange} />
          {nickErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={nickErrorText}></SignNotification>
          )}
        </label>
        <label className="important">
          <span className="field">Password</span>
          <input type="password" ref={passRef} onChange={handleChange} />
          {passErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={passErrorText}></SignNotification>
          )}
        </label>
        <button
          onClick={() => {
            const delay = 5;
            console.log(`delay: ${delay}`);
            setTimeout(() => {
              console.log(`time is out`);
            }, delay);
          }}></button>
        <label className="">
          <span>Email</span>
          <input type="email" ref={emailRef} onChange={handleChange} />
        </label>
        <button
          className={'formBtn ' + (isActiveSubmit ? ' disabled' : '')}
          style={{ marginTop: '9px' }}
          disabled={!isActiveSubmit}
          onClick={handleSubmitClick}>
          Submit
        </button>
        <div className="notification">
          Have an account?{' '}
          <span className="signSwitcher" onClick={handleSwitchClick}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}
