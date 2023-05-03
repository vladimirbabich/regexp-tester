import jwtDecode from 'jwt-decode';

export function Stats() {
  const storedUser = localStorage.getItem('userToken');
  let storedId = undefined;
  if (storedUser) {
    const decoded: any = jwtDecode(storedUser);
    storedId = decoded.id;
  }
  const userId = storedId || localStorage.getItem('genUserId');
  if (userId < 0)
    return <div className="statsBlock">User with that ID does not exists</div>;
  return (
    <div className="statsBlock">
      <h1>Statistics of `this user`</h1>
      some table of results
    </div>
  );
}
