import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useLoginUserMutation } from '../features/api/apiSlice';
import { setUserToken } from '../features/global/globalSlice';
import { ISign } from '../models/componentModels';
import './../App.scss';
import './../styles/SignPage.scss';
import SignNotification from './SignNotification';

export default function SignIn({
  handleChangeInput,
  handleSwitchClick,
}: ISign) {
  const nickEmailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const [isActiveSubmit, setIsActiveSubmit] = useState<boolean>(false);

  const [loginUser] = useLoginUserMutation();

  const [nickErrorText, setNickErrorText] = useState<string>('');
  const [passErrorText, setPassErrorText] = useState<string>('');
  const dispatch = useAppDispatch();

  function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const currentNickEmail = nickEmailRef?.current;
    const currentPass = passRef?.current;
    if (!currentNickEmail || !currentPass) {
      return;
    }
    //clear errors
    if (currentNickEmail) currentNickEmail.className = '';
    if (currentPass) currentPass.className = '';
    setNickErrorText('');
    setPassErrorText('');

    //check clientside errors
    if (currentNickEmail.value.length < 1) {
      currentNickEmail.className = 'wrongInput';
      setNickErrorText('Type your nickname or email');
    }
    if (currentPass.value.length < 1) {
      currentPass.className = 'wrongInput';
      setPassErrorText('Type your password');
    }
    if (currentNickEmail.value.length < 1 || currentPass.value.length < 1) {
      //if one of them is empty - return instead of login request
      return;
    }

    loginUser({
      nicknameOrEmail: currentNickEmail.value,
      pass: currentPass.value,
    })
      .then((response) => {
        if ('data' in response) {
          //check server errors
          console.log('data');
          if ('nickError' in response.data) {
            console.log('ttt');
            currentNickEmail.className = 'wrongInput';
            setNickErrorText(response.data.nickError);
          } else if ('passError' in response.data) {
            currentPass.className = 'wrongInput';
            setPassErrorText(response.data.passError);
          } else {
            if (!response.data.token) {
              setNickErrorText('Problem with registration, try later please');
              return;
            }
            console.log(response.data.token);
            console.log(`Sign in set: ${response.data.token}`);
            dispatch(setUserToken(response.data.token));
          }
        }
        if ('error' in response)
          if ('data' in response.error) {
            const data = response.error.data as {
              nickError?: string;
              passError?: string;
            };
            if ('nickError' in data && data.nickError) {
              currentNickEmail.className = 'wrongInput';
              setNickErrorText(data.nickError);
            } else if ('passError' in data && data.passError) {
              currentPass.className = 'wrongInput';
              setPassErrorText(data.passError);
            }
          }
      })
      .catch((reason: Error) => console.log('reason'));
  }
  return (
    <div className="signPage">
      <h1 className="h1Title">Sing in</h1>
      <form className="signForm">
        <label>
          <span>Nickname or Email</span>
          <input
            type="text"
            ref={nickEmailRef as React.LegacyRef<HTMLInputElement>}
            onChange={() => {
              handleChangeInput(nickEmailRef, passRef, setIsActiveSubmit);
            }}
          />
          {nickErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={nickErrorText}></SignNotification>
          )}
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            ref={passRef as React.LegacyRef<HTMLInputElement>}
            onChange={() => {
              handleChangeInput(nickEmailRef, passRef, setIsActiveSubmit);
            }}
          />
          {passErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={passErrorText}></SignNotification>
          )}
        </label>
        <button
          className="formBtn"
          style={{ marginTop: '9px' }}
          disabled={!isActiveSubmit}
          onClick={handleSubmitClick}>
          Sign in
        </button>
        <div className="notification">
          Don`t have an account?{' '}
          <span className="signSwitcher" onClick={handleSwitchClick}>
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}
