import './../App.scss';
// import './s.css'
import './../styles/Footer.scss';
import Information from './Information';
// import './../styles/'
export default function Footer() {
  return (
    <div className="footer">
      <Information></Information>
      <span className="about">
        2023&copy;&nbsp; BBCH (
        <a
          href="https://github.com/vladimirbabich"
          target="_blank"
          rel="noopener noreferrer"
          className="link">
          Github
        </a>
        )
      </span>
    </div>
  );
}
