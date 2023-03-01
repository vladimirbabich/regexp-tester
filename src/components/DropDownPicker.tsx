import React, { useEffect, useRef, useState } from 'react';
import { DropDownPickerFlagsPropsType } from './../types';
import './../styles/DropDownPicker.scss';
import store from '../app/store';
import { useAppDispatch } from '../app/hooks';
import { setIsFlagsBlockOpen } from '../features/testInput/testInputSlice';
export default function DropDownPicker({
  isMultiple,
  list,
  setList,
  children,
}: DropDownPickerFlagsPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const currentState = store.getState().testInput.isFlagsBlockOpen;
  useEffect(() => {}, [currentState]);
  const dispatch = useAppDispatch();
  const handleClickOption = (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>
  ) => {
    const optionValue: string = (e.target as HTMLInputElement).value;
    setList((prev) => {
      return prev.map((el) => {
        if (el.name == optionValue) return { ...el, status: !el.status };
        return el;
      });
    });
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
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <div ref={wrapperRef}>
      <button
        className="selectActivator"
        id="selectActivator"
        onClick={(e) => handleClickSelectActivator(e)}
        style={{
          color: isOpen ? 'rgb(2, 44, 136)' : 'rgb(0, 95, 0)',
        }}>
        /{children}
      </button>
      {isOpen && (
        <select className="flagsBlock" id="flagsSelect" multiple={isMultiple}>
          {list.map((el) => {
            return (
              <option
                value={el.name}
                id="flagsOption"
                key={el.name}
                style={{
                  fontWeight: el.status ? 'bold' : 'normal',
                }}
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
