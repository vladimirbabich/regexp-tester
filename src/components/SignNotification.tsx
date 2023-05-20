import { ISignNotification } from '../models/componentModels';
import './../App.scss';
// import './../styles/SignPage.scss';

export default function SignNotification({
  text,
  className,
}: ISignNotification) {
  return <span className={className}>{text}</span>;
}
