import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import jwtDecode from 'jwt-decode';
import { useRegUserMutation } from '../features/services/apiService';
import './../App.scss';
import './../styles/SignPage.scss';
import SignNotification from './SignNotification';
import {
  setUserSessionDelay,
  setUserToken,
} from '../features/global/globalSlice';
import { ISign } from '../models/componentModels';
import { IDecodedUserToken } from '../models/objectModels';

export default function SignUp({
  handleChangeInput,
  handleSwitchClick,
}: ISign) {
  const nickRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const [isActiveSubmit, setIsActiveSubmit] = useState<boolean>(false);
  const [regUser] = useRegUserMutation();

  const [nickErrorText, setNickErrorText] = useState<string>('');
  const [passErrorText, setPassErrorText] = useState<string>('');

  const dispatch = useAppDispatch();

  function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const currentNick = nickRef?.current;
    const currentPass = passRef?.current;
    const currentEmail = emailRef?.current;
    if (!currentNick || !currentPass || !currentEmail) {
      return;
    }
    //clear errors
    currentNick.className = '';
    currentPass.className = '';
    setNickErrorText('');
    setPassErrorText('');

    //check clientside errors
    if (currentNick.value.length < 3) {
      currentNick.className = 'wrongInput';
      setNickErrorText('Nickname should have atleast 3 symbols');
    }
    if (currentPass.value.length < 6) {
      currentPass.className = 'wrongInput';
      setPassErrorText('Password should have atleast 6 symbols');
      return;
    }
    if (currentNick.value.length < 3 || currentPass.value.length < 6) {
      return;
    }

    regUser({
      nickname: currentNick.value,
      email: currentEmail.value || null,
      pass: currentPass.value,
    })
      .then((response: any) => {
        if ('data' in response) {
          //check server errors
          if ('nickError' in response.data) {
            currentNick.className = 'wrongInput';
            setNickErrorText(response.data.nickError);
          } else if ('passError' in response.data) {
            currentPass.className = 'wrongInput';
            setPassErrorText(response.data.passError);
          } else {
            if (!response.data.token) {
              setNickErrorText('Problem with registration, try later please');
              return;
            }

            const decodedUser: IDecodedUserToken = jwtDecode(
              response.data.token
            );
            const delay = (decodedUser.exp - decodedUser.iat) * 1000;
            if (delay < 1000) {
              setNickErrorText('Session timed out, sign in instead');
              return;
            }
            dispatch(setUserSessionDelay(delay));
            dispatch(setUserToken(response.data.token));
          }
        }
        if ('error' in response) console.log(response.error);
      })
      .catch((reason: Error) => console.log(reason));
  }

  return (
    <div className="signPage">
      <h1 className="h1Title"> Sign up</h1>
      <form className="signForm">
        <label className="important">
          <span className="field">Nickname</span>
          <input
            type="text"
            ref={nickRef as React.LegacyRef<HTMLInputElement>}
            onChange={() => {
              handleChangeInput(nickRef, passRef, setIsActiveSubmit);
            }}
          />
          {nickErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={nickErrorText}></SignNotification>
          )}
        </label>
        <label className="important">
          <span className="field">Password</span>
          <input
            type="password"
            ref={passRef as React.LegacyRef<HTMLInputElement>}
            onChange={() => {
              handleChangeInput(nickRef, passRef, setIsActiveSubmit);
            }}
          />
          {passErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={passErrorText}></SignNotification>
          )}
        </label>
        <label className="">
          <span>Email</span>
          <input
            type="email"
            ref={emailRef as React.LegacyRef<HTMLInputElement>}
          />
        </label>
        <button
          className="formBtn"
          style={{ marginTop: '9px' }}
          disabled={!isActiveSubmit}
          onClick={handleSubmitClick}>
          Create an account
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
