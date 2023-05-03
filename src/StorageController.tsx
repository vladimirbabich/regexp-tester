import jwtDecode from 'jwt-decode';
import { IUserToken } from './Models';
export class LocalStorageController {
  removeGenUser() {
    localStorage.removeItem('genUserId');
    localStorage.removeItem('genUserNickname');
  }
  getUsersKey(key: string) {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const decoded: IUserToken = jwtDecode(userToken);
      //   console.log(decoded);
      if (key in decoded) return decoded[key as keyof IUserToken];
      else return -1;
    }
    const camelCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
    const genUserKey = localStorage.getItem(`genUser${camelCaseKey}`);
    if (genUserKey && genUserKey != '-1') return genUserKey;
    return -1;
  }
}