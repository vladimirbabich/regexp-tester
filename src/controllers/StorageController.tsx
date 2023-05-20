import jwtDecode from 'jwt-decode';
import { IUserToken } from '../models/objectModels';
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
    // for (let el in localStorage) {
    //   alert(el + ' ' + localStorage[el]);
    // }

    const genUserKey = localStorage.getItem(`genUser${camelCaseKey}`);
    // alert(`genKey:${genUserKey}`);
    if (genUserKey && genUserKey !== '-1') return genUserKey;
    return -2;
  }
}
