import { useAppDispatch, useAppSelector } from '../app/hooks';
import './../styles/Select.scss';
import { setSelectedFunction } from '../features/testForm/testFormSlice';

export function Select({ isMultiple, onChange }: any) {
  const dispatch = useAppDispatch();
  const currentFunction = useAppSelector(
    (state) => state.testForm.currentQuestion?.functionName
  );
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
      onChange={(e: any) => dispatch(setSelectedFunction(e.target.value))}>
      {list.map((el: any) => {
        return (
          <option value={el} key={el} id="functionsOption">
            {el}
          </option>
        );
      })}
    </select>
  );
}
