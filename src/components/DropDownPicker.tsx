import React, { useEffect, useRef, useState } from 'react';
import { DropDownPickerFlagsPropsType } from '../Models';
import './../App.scss';
import './../styles/DropDownPicker.scss';
import store from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateFlag } from '../features/testForm/testFormSlice';
import { getFlagsString } from '../utils';
export default function DropDownPicker({
  isMultiple,
  children,
}: DropDownPickerFlagsPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  const dispatch = useAppDispatch();

  if (isTestOver && isOpen) setIsOpen(false);

  const handleClickOption = (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>
  ) => {
    const optionValue: string = (e.target as HTMLInputElement).value;
    dispatch(updateFlag(optionValue));
  };

  const handleClickSelectActivator = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const wrapperRef = useRef<any>(null);
  useEffect(() => {
    //close flagsBlock if click outside of dropdownpicker
    function handleClickOutside(event: any) {
      // console.log(wrapperRef.current);
      // console.log(event.target.className);
      // console.log(event.target.className.indexOf('flagsHint') > -1);
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen]);

  return (
    <div ref={wrapperRef}>
      <div className="selectFlagsInput">
        <span
          className="flagsHint"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: getFlagsString(flags).length > 0 ? 'none' : 'block',
          }}>
          Select flags:
        </span>
        <button
          disabled={isTestOver}
          className="selectActivator"
          id="selectActivator"
          onClick={(e) => handleClickSelectActivator(e)}
          style={{
            paddingRight: '10px',
            paddingLeft: '10px',
            color: isOpen ? 'rgb(2, 44, 136)' : 'rgb(0, 95, 0)',
          }}>
          /{children}
        </button>
      </div>
      {isOpen && (
        <select className="flagsBlock" id="flagsSelect" multiple={isMultiple}>
          {flags.map((el) => {
            return (
              <option
                value={el.name}
                id="flagsOption"
                key={el.name}
                onClick={(e) => handleClickOption(e)}>
                {el.name} ({'description' in el && el.description})
                {el.status && '\u2713'}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
