import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { metaTageController } from '../controllers/MetaTagsController';
import { handleChangeInputParamsType } from '../models/objectModels';
import './../App.scss';
import './../styles/SignPage.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function SignPage() {
  useEffect(() => {
    metaTageController.setTitle(`Sign page - Retester`);
  }, []);

  const [isSignUp, setIsSignUp] = useState(true);
  const userToken = useAppSelector((state) => state.global.userToken);
  if (userToken) {
    return <Navigate to="/" replace={true} />;
  }

  function handleSwitchClick(
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>
  ) {
    setIsSignUp(!isSignUp);
  }

  const handleChangeInput: handleChangeInputParamsType = (
    ref1,
    ref2,
    btnSetter
  ) => {
    if (!ref1?.current || !ref2.current) return;
    if (ref1.current.value && ref2.current.value) {
      btnSetter(true);
    } else {
      btnSetter(false);
    }
  };
  if (isSignUp)
    return (
      <SignUp
        handleChangeInput={handleChangeInput}
        handleSwitchClick={handleSwitchClick}
      />
    );
  return (
    <SignIn
      handleChangeInput={handleChangeInput}
      handleSwitchClick={handleSwitchClick}
    />
  );
}
