import React, { useEffect, useRef } from 'react';
import './../App.scss';
import './../styles/TestInput.scss';
import DropDownPicker from './DropDownPicker';
import { ITestInput } from '../models/componentModels';
import { useAppSelector } from '../app/hooks';

export default function TestInput({
  handleChange,
  value,
  mode,
  inputRef,
  getFlagsString,
}: ITestInput) {
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const handleEnterKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          inputRef.current?.blur();
        }
      };

      inputRef.current.addEventListener('keydown', handleEnterKeyDown);
      return () => {
        inputRef.current?.removeEventListener('keydown', handleEnterKeyDown);
      };
    }
  }, [inputRef?.current?.value]);

  return (
    <div
      className="testInput"
      style={{
        marginTop: '5px',
      }}>
      <DropDownPicker isMultiple={true}>{getFlagsString(flags)}</DropDownPicker>
      <div className="inputBlock">
        <button className="startPtrn" disabled>
          /
        </button>
        <input
          autoComplete="off"
          id="regexpInput"
          value={value}
          style={
            mode === 'flags'
              ? {
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }
              : {}
          }
          ref={inputRef}
          autoFocus={true}
          disabled={isTestOver || mode === 'only-flags'}
          placeholder="Type regular expression"
          onChange={handleChange}></input>
      </div>
    </div>
  );
}
