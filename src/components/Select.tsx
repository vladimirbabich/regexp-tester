import { useAppDispatch, useAppSelector } from '../app/hooks';
import './../styles/Select.scss';
import { setSelectedFunction } from '../features/testForm/testFormSlice';
import { ISelect } from '../models/componentModels';

export function Select({ isMultiple }: ISelect) {
  const dispatch = useAppDispatch();
  const selectedFunction = useAppSelector(
    (state) => state.testForm.selectedFunction
  );
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  const list = ['match', 'substitution'];

  return (
    <select
      className="functionsBlock"
      multiple={isMultiple}
      disabled={isTestOver}
      value={selectedFunction}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target instanceof Node)
          dispatch(setSelectedFunction(e.target.value));
      }}>
      {list.map((el: string) => {
        return (
          <option value={el} key={el} id="functionsOption">
            {el}
          </option>
        );
      })}
    </select>
  );
}
