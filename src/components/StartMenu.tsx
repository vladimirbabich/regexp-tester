import { IStartMenu } from '../models/componentModels';
import './../styles/StartMenu.scss';

export default function StartMenu({
  title,
  text,
  btnText,
  handleClick,
}: IStartMenu) {
  return (
    <div className="appOverlay">
      <div className="startMenu">
        <h1 className="title" style={{ fontWeight: '600' }}>
          {title}
        </h1>
        {typeof text === 'string' ? (
          <p className="rows">{text}</p>
        ) : (
          text.map((row, i) => (
            <p className="rows" key={i}>
              {row}
            </p>
          ))
        )}
        <button className="formBtn startBtn" onClick={handleClick}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
