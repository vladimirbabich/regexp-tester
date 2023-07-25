import jwtDecode from 'jwt-decode';
import { setUserToken } from '../features/global/globalSlice';
import { IDecodedUserToken } from '../models/objectModels';

export default function checkAuthToken(dispatch: any, userToken: string) {
  if (!userToken) {
    return;
  }
  const decodedUser: IDecodedUserToken = jwtDecode(userToken);
  var delay = (decodedUser.exp - decodedUser.iat) * 1000;
  const timeNow = Math.floor(Date.now() / 1000);
  const timeLeft = decodedUser.exp - timeNow;
  if (delay < 1000 || timeLeft < 1) {
    dispatch(setUserToken(''));
    return;
  }
  setTimeout(() => {
    checkAuthToken(dispatch, userToken);
  }, delay);
}
