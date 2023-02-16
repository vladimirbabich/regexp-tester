import "./../styles/Information.scss";

export default function Information() {
  return (
    <div className="information">
      <span>Don`t know regular expressions? Learn here:</span>
      <div className="links">
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          MDN web docs
        </a>
        <a
          href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          W3 schools
        </a>
        <a
          href="https://docs.python.org/3/library/re.html"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Python docs
        </a>
      </div>
    </div>
  );
}
