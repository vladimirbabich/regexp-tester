import React, { useEffect, useState } from "react";
import { DropDownPickerFlagsPropsType } from "./../types";
import "./../styles/DropDownPicker.scss";

export default function DropDownPicker({
  isMultiple,
  open,
  setOpen,
  list,
  setList,
  children,
}: DropDownPickerFlagsPropsType) {
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
        style={{ color: open ? "rgb(2, 44, 136)" : "rgb(0, 95, 0)" }}
      >
        /{children}
      </button>
      {open && (
        <select className="flagsBlock" id="flagsSelect" multiple={isMultiple}>
          {list.map((el) => {
            return (
              <option
                value={el.name}
                id="flagsOption"
                style={{
                  fontWeight: el.status ? "bold" : "normal",
                }}
                onClick={(e) => handleClickOption(e)}
              >
                {el.name} ({"description" in el && el.description})
                {el.status && "\u2713"}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}
