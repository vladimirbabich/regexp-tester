import React, { useEffect, useRef } from 'react';
import './../App.scss';
import './../styles/TestInput.scss';
import DropDownPicker from './DropDownPicker';
import { ITestInput } from '../models/componentModels';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppSelector } from '../app/hooks';

export default function TestInput({ handleChange, value, mode }: ITestInput) {
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, [mode]);

  return (
    <div
      className="testInput"
      style={{
        marginTop: '5px',
      }}>
      {mode !== 'flags' && <Select isMultiple={false}></Select>}

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
