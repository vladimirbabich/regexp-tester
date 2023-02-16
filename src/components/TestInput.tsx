import React, { useContext, useEffect, useState } from "react";
import "./../App.scss";
import "./../styles/TestInput.scss";
import DropDownPicker from "./DropDownPicker";
import { GlobalContext } from "./../App";
import { TestInputProps, FlagsType } from "./../types";
import { getFlagsString } from "./../utils";

export default function TestInput({
  handleChange,
  flags,
  value,
  setFlags,
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
      <DropDownPicker
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
