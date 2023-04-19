import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  useCreateTestMutation,
  useGetAllTestsForModeQuery,
} from '../features/api/apiSlice';
import './../App.scss';
import './../styles/SignPage.scss';

export default function SignUp({
  isActiveSubmit,
  setIsActiveSubmit,
  nickRef,
  passRef,
  emailRef,
  handleSwitchClick,
}: any) {
  // const { data, error, isLoading } = useGetAllTestsForModeQuery('all');
  const [createTest, response] = useCreateTestMutation();
  const dispatch = useAppDispatch();
  function handleChange({ target }: any) {
    console.log(target.value);
    if (nickRef.current.value && passRef.current.value) {
      setIsActiveSubmit(true);
    } else {
      setIsActiveSubmit(false);
    }
    console.log(nickRef.current?.value.length);
  }

  function test(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault();
    // createTest({
    //   userId: 2,
    //   modeId: 2,
    //   timeSpent: '2222',
    //   testQuestions: [
    //     {
    //       questionId: 7,
    //       difficulty: 2,
    //       userAnswer: 'ABDC',
    //     },
    //     {
    //       questionId: 5,
    //       difficulty: 2,
    //       // userAnswer: '[A-Z]/gi',
    //     },
    //     {
    //       questionId: 6,
    //       difficulty: 2,
    //       // userAnswer: '[0-9]',
    //     },
    //   ],
    // })
    // .then((res) => {
    //   console.log(response);
    // })
    // .catch((error: Error) => {
    //   console.log(error);
    // });
    // console.log(data);
    // console.log(error);
    // console.log(isLoading);

    console.log(nickname);
  }

  const nickname = useAppSelector((state) => state.global.defaultNickname);
  return (
    <div className="signPage">
      <h1 className="h1Title">{nickname} Sign up</h1>
      <form className="signForm">
        <label className="important">
          <span>Nickname</span>
          <input type="text" ref={nickRef} onChange={handleChange} />
        </label>
        <label className="important">
          <span>Password</span>
          <input type="password" ref={passRef} onChange={handleChange} />
        </label>
        <label className="">
          <span>Email</span>
          <input type="email" ref={emailRef} onChange={handleChange} />
        </label>
        <button
          className={'formBtn ' + (isActiveSubmit ? ' disabled' : '')}
          // className={isActiveSubmit ? 'formBtn' : 'formBtn disabled'}
          disabled={!isActiveSubmit}>
          Submit
        </button>
        <div className="notification">
          Have an account?{' '}
          <span className="signSwitcher" onClick={test}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}
