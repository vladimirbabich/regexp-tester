import React, { useContext, useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestInput.scss';
import DropDownPicker from './DropDownPicker';
import { TestInputProps } from './../types';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppDispatch } from '../app/hooks';
import store from '../app/store';
import { setIsFlagsBlockOpen } from '../features/testInput/testInputSlice';

export default function TestInput({
  handleChange,
  flags,
  value,
  setFlags,
  regExpFunctions,
  currentFunction,
  setCurrentFunction,
}: TestInputProps) {
  const dispatch = useAppDispatch();
  getFlagsString(flags);

  return (
    <div className="testInput">
      <Select
        isMultiple={false}
        list={regExpFunctions}
        currentFunction={currentFunction}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setCurrentFunction(e.target.value);
        }}></Select>
      <DropDownPicker
        isMultiple={true}
        list={flags}
        setList={setFlags}>
        {getFlagsString(flags)}
      </DropDownPicker>
      <input
        style={{ marginBottom: '5px' }}
        autoComplete="off"
        id="regexpInput"
        value={value}
        autoFocus={true}
        placeholder="Type regular expression and choose flags ->"
        onChange={handleChange}></input>
    </div>
  );
}
