import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DropDownPickerProps, FlagsType } from "./../types";


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
  const handleClickSelectActivator = () => {
    setOpen(!open);
  };

  const handleClickDropDownPicker = () => {};

  return (
    <>
      <Button
        className="selectActivator"
        id="selectActivator"
        onClick={handleClickSelectActivator}
      >
        /{children}
      </Button>
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
