import React, { useEffect, useState } from "react";
import { DropDownPickerProps, FlagsType } from "./../types";
import "./../styles/DropDownPicker.scss";

export default function DropDownPicker({
  open,
  setOpen,
  list,
  setList,
  children,
}: DropDownPickerProps) {
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
    setOpen(!open);
  };
  return (
    <>
      <button
        className="selectActivator"
        id="selectActivator"
        onClick={(e) => handleClickSelectActivator(e)}
      >
        /{children}
      </button>
      {open && (
        <select className="flagsBlock" id="flagsSelect" multiple={true}>
          {list.map((el) => {
            return (
              <option
                value={el.name}
                id="flagsOption"
                onClick={(e) => handleClickOption(e)}
              >
                {el.name} ({el.description}) {el.status && "✓"}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}
