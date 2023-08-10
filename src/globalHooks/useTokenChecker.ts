import { useEffect } from 'react';
import { useLazyCheckAuthQuery } from '../features/services/apiService';
import { useAppDispatch } from '../app/hooks';
import { setUserToken } from '../features/global/globalSlice';

export function useTokenChecker() {
  const [checkAuth] = useLazyCheckAuthQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //if token -> check auth after big amount of time
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const authInterval = setInterval(() => {
        checkAuth('check')
          .then((res: any) => {
            if ('data' in res && res.data?.token) {
              dispatch(setUserToken(res.data.token));
            } else {
              dispatch(setUserToken(''));
            }
          })
          .catch((e: Error) => {
            dispatch(setUserToken(''));
            console.log(e);
          });
      }, 604800000);

      return () => {
        clearInterval(authInterval);
      };
    }
  }, []);
}
