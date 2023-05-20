import React, { useEffect, useRef, useState } from 'react';
import './../App.scss';
import './../styles/DropDownPicker.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateFlag } from '../features/testForm/testFormSlice';
import { getFlagsString } from '../utils';
import { IDropDownPicker } from '../models/componentModels';
export default function DropDownPicker({
  isMultiple,
  children,
}: IDropDownPicker) {
  const [isOpen, setIsOpen] = useState(false);
  const flags = useAppSelector((state) => state.testForm.flags);
  const isTestOver = useAppSelector((state) => state.testForm.isTestOver);
  const dispatch = useAppDispatch();

  if (isTestOver && isOpen) setIsOpen(false);

  const handleClickLi = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const liValue = (e.target as HTMLLIElement).getAttribute('data-value');
    console.log(e.target);
    console.log(e.target as HTMLLIElement);
    console.log(liValue);
    dispatch(updateFlag(liValue));
  };

  const handleClickSelectActivator = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const wrapperRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    //close flagsBlock if click outside of dropdownpicker
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        event.target instanceof Node &&
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
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];
  // return <ReactSelect isMulti options={options} />;

  return (
    <div ref={wrapperRef}>
      <div className="selectFlagsInput">
        <span
          className="flagsHint"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display:
              window.innerWidth > 670
                ? getFlagsString(flags).length > 0
                  ? 'none'
                  : 'block'
                : 'none',
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
        <ul className="flagsBlock" id="flagsSelect">
          {flags.map((el) => {
            return (
              <li
                data-value={el.name}
                className="flagsOption"
                key={el.name}
                onClick={(e) => handleClickLi(e)}>
                {el.name} ({'description' in el && el.description})
                {el.status && '\u2713'}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
