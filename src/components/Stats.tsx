import jwtDecode from 'jwt-decode';
import { useAppSelector } from '../app/hooks';
import { IDecodedUserToken } from '../models/objectModels';

export function Stats() {//future update(maybe)
  const userToken = useAppSelector((state) => state.global.userToken);
  let storedId = undefined;
  if (userToken) {
    const decoded: IDecodedUserToken = jwtDecode(userToken);
    storedId = decoded.id;
  }
  const userId = storedId || localStorage.getItem('genUserId');

  if (!userId || userId < 0)
    return <div className="statsBlock">User with that ID does not exists</div>;
  return (
    <div className="statsBlock">
      <h1>Statistics of `this user`</h1>
      some table of results
    </div>
  );
}
