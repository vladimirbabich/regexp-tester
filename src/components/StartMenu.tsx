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
        <p>{title}</p>
        {typeof text === 'string' ? (
          <p>{text}</p>
        ) : (
          text.map((row, i) => <p key={i}>{row}</p>)
        )}
        <button className="formBtn startBtn" onClick={handleClick}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
