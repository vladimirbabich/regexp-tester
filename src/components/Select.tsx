import "./../styles/Select.scss";

export function Select({ isMultiple, list, onChange, currentFunction }: any) {
  return (
    <select
      className="functionsBlock"
      multiple={isMultiple}
      value={currentFunction}
      onChange={onChange}
    >
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
