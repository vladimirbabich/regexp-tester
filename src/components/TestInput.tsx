import React, { useContext, useEffect, useState } from 'react';
import './../App.scss';
import './../styles/TestInput.scss';
import DropDownPicker from './DropDownPicker';
import { TestInputProps } from './../types';
import { getFlagsString } from '../utils';
import { Select } from './Select';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import store from '../app/store';

export default function TestInput({ handleChange, value }: TestInputProps) {
  const dispatch = useAppDispatch();
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);

  return (
    <div className="testInput">
      <Select isMultiple={false}></Select>
      <DropDownPicker isMultiple={true}>{getFlagsString(flags)}</DropDownPicker>
      <input
        style={{ marginBottom: '5px' }}
        autoComplete="off"
        id="regexpInput"
        value={value}
        autoFocus={true}
        disabled={isTestOver}
        placeholder="Type regular expression and choose flags ->"
        onChange={handleChange}></input>
    </div>
  );
}
