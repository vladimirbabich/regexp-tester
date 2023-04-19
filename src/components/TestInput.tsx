import React, { useContext, useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestInput.scss';
import DropDownPicker from './DropDownPicker';
import { TestInputProps } from '../Models';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import store from '../app/store';

export default function TestInput({
  handleChange,
  value,
  mode,
}: TestInputProps) {
  const dispatch = useAppDispatch();
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);

  return (
    <div
      className="testInput"
      style={{
        marginTop: '5px',
      }}>
      <Select isMultiple={false}></Select>
      <button className="startPtrn" disabled>
        /
      </button>
      <DropDownPicker isMultiple={true}>{getFlagsString(flags)}</DropDownPicker>

      <input
        autoComplete="off"
        id="regexpInput"
        value={value}
        autoFocus={true}
        disabled={isTestOver || mode == 'flags'}
        placeholder="Type regular expression pattern"
        onChange={handleChange}></input>
    </div>
  );
}
