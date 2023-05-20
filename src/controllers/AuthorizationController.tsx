import jwtDecode from 'jwt-decode';
import { setUserToken } from '../features/global/globalSlice';
import { IDecodedUserToken } from '../models/objectModels';

export default function checkAuthToken(dispatch: any, userToken: string) {
  console.log('start checkAuth');
  if (!userToken) {
    console.log('Token was not found');
    return;
  }
  const decodedUser: IDecodedUserToken = jwtDecode(userToken);
  console.log('\\\\');
  console.log(decodedUser.exp);
  console.log(decodedUser.iat);
  var delay = (decodedUser.exp - decodedUser.iat) * 1000;
  const timeNow = Math.floor(Date.now() / 1000);
  const timeLeft = decodedUser.exp - timeNow;
  console.log(timeNow);
  console.log(timeLeft);
  console.log(delay);
  if (delay < 1000 || timeLeft < 1) {
    console.log('Session timed out');
    console.log(`TestForm questionsDBError set: empty`);
    dispatch(setUserToken(''));
    return;
  }
  setTimeout(() => {
    console.log('delay ends');
    //     if(!token) return;
    //     get delay
    //     if(delay>1000)
    checkAuthToken(dispatch, userToken);
  }, delay);
}
