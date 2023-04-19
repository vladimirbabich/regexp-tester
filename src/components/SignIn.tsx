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

export default function SignIn({
  isActiveSubmit,
  setIsActiveSubmit,
  nickRef,
  passRef,
  emailRef,
  handleSwitchClick,
}: any) {
  function handleChange({ target }: any) {
    console.log(target.value);
    if (nickRef.current.value && passRef.current.value) {
      setIsActiveSubmit(true);
    } else {
      setIsActiveSubmit(false);
    }
    console.log(nickRef.current?.value.length);
  }

  return (
    <div className="signPage">
      <h1 className="h1Title">Sing in</h1>
      <form className="signForm">
        <label>
          <span>Nickname or Email</span>
          <input type="text" ref={nickRef} onChange={handleChange} />
        </label>
        <label>
          <span>Password</span>
          <input type="password" ref={passRef} onChange={handleChange} />
        </label>
        <button
          className={'formBtn ' + (isActiveSubmit ? ' disabled' : '')}
          // className={isActiveSubmit ? 'formBtn' : 'formBtn disabled'}
          disabled={!isActiveSubmit}>
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
