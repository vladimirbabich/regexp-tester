import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch } from '../app/hooks';
import { useLoginUserMutation } from '../features/api/apiSlice';
import { setNotificationText } from '../features/global/globalSlice';
import './../App.scss';
import './../styles/SignPage.scss';
import SignNotification from './SignNotification';

export default function SignIn({ nickname, handleSwitchClick }: any) {
  const nickEmailRef = useRef<any>();
  const passRef = useRef<any>();
  const [isActiveSubmit, setIsActiveSubmit] = useState<boolean>(true); //false);

  const [loginUser, response] = useLoginUserMutation();

  const [nickErrorText, setNickErrorText] = useState<string>('');
  const [passErrorText, setPassErrorText] = useState<string>('');
  const dispatch = useAppDispatch();

  function handleChange({ target }: any) {
    // console.log(target.value);
    // if (nickEmailRef.current.value && passRef.current.value) {
    //   setIsActiveSubmit(true);
    // } else {
    //   setIsActiveSubmit(false);
    // }
    // console.log(nickRef.current?.value.length);
  }

  function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    //clear errors
    nickEmailRef.current.className = '';
    passRef.current.className = '';
    setNickErrorText('');
    setPassErrorText('');

    //check client errors
    if (nickEmailRef?.current.value.length < 1) {
      nickEmailRef.current.className = 'wrongInput';
      setNickErrorText('Type your nickname of email');
    }
    if (passRef?.current.value < 1) {
      passRef.current.className = 'wrongInput';
      setPassErrorText('Type your password');
      return;
    }
    if (nickEmailRef?.current.value.length < 1 || passRef?.current.value < 1) {
      return;
    }

    loginUser({
      nicknameOrEmail: nickEmailRef?.current.value,
      pass: passRef?.current.value,
    })
      .then((response) => {
        if ('data' in response) {
          //check server errors
          if ('nickError' in response.data) {
            nickEmailRef.current.className = 'wrongInput';
            setNickErrorText(response.data.nickError);
          } else if ('passError' in response.data) {
            passRef.current.className = 'wrongInput';
            setPassErrorText(response.data.passError);
          } else {
            console.log(response.data.token);
            localStorage.setItem('userToken', response.data.token);
            //todo: some redirect here
          }
        }
        if ('error' in response) console.error(response.error);
      })
      .catch((reason: any) => console.log('reason'));
  }
  return (
    <div className="signPage">
      <h1 className="h1Title">Sing in</h1>
      <form className="signForm">
        <label>
          <span>Nickname or Email</span>
          <input type="text" ref={nickEmailRef} onChange={handleChange} />
          {nickErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={nickErrorText}></SignNotification>
          )}
        </label>
        <label>
          <span>Password</span>
          <input type="password" ref={passRef} onChange={handleChange} />
          {passErrorText.length > 0 && (
            <SignNotification
              className="errorNotification"
              text={passErrorText}></SignNotification>
          )}
        </label>
        <button
          className={'formBtn ' + (isActiveSubmit ? ' disabled' : '')}
          style={{ marginTop: '9px' }}
          disabled={!isActiveSubmit}
          onClick={handleSubmitClick}>
          Submit
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
