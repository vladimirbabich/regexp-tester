import "./../styles/Header.scss";
export default function Header() {
  return (
    <header className="header">
      <span className="logo">RegExp TESTER</span>
      <div className="navigation">
        <button >ALL questions test</button>
        <button disabled>5 minutes test</button>
        <button disabled>leaderboard</button>
      </div>
    </header>
  );
}
//style={{marginRight:'10px'}}