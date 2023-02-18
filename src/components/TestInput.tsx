import React, { useContext, useEffect, useState } from "react";
import "./../App.scss";
import "./../styles/TestInput.scss";
import DropDownPicker from "./DropDownPicker";
import { GlobalContext } from "./../App";
import { TestInputProps } from "./../types";
import { getFlagsString } from "./../utils";
import { Select } from "./Select";

export default function TestInput({
  handleChange,
  flags,
  value,
  setFlags,
  regExpFunctions,
  currentFunction,
  setCurrentFunction,
}: TestInputProps) {
  const globalContext = useContext(GlobalContext);
  const [isActiveFlagsBlock, setIsActiveFlagsBlock] = useState(false);
  getFlagsString(flags);

  const handleClickSelectActivator = () => {
    setIsActiveFlagsBlock(!isActiveFlagsBlock);
  };
  useEffect(() => {
    // console.log("flags");
    // console.log(flags);
  }, [flags]);

  useEffect(() => {
    // console.log("flags");
    // console.log(flags);
    console.log(
      `%cclickedElementIdInput: ${globalContext.clickedElementId}`,
      "%ccolor:red"
    );
    console.log(isActiveFlagsBlock);
    if (globalContext.clickedElementId.length == 0) {
      setIsActiveFlagsBlock(false);
    }
  }, [globalContext.clickedElementId]);

  return (
    <div className="testInput">
      <Select
        isMultiple={false}
        list={regExpFunctions}
        currentFunction={currentFunction}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setCurrentFunction(e.target.value);
        }}
      ></Select>
      <DropDownPicker
        isMultiple={true}
        open={isActiveFlagsBlock}
        setOpen={setIsActiveFlagsBlock}
        list={flags}
        setList={setFlags}
      >
        {getFlagsString(flags)}
      </DropDownPicker>
      <input
        style={{ marginBottom: "5px" }}
        autoComplete="off"
        id="regexpInput"
        value={value}
        autoFocus={true}
        placeholder="Type regular expression and choose flags ->"
        onChange={handleChange}
      ></input>
    </div>
  );
}
