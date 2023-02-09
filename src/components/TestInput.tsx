import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import { Button, Form } from "react-bootstrap";
import DropDownPicker from "./DropDownPicker";
import { GlobalContext } from "./../App";
import { TestInputProps, FlagsType } from "./../types";
import { getFlagsString } from "./../utils";

export default function TestInput({
  handleChange,
  flags,
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
      <Form.Control
        style={{ marginBottom: "5px" }}
        as="input"
        autoComplete="off"
        id="regexpInput"
        autoFocus={true}
        placeholder="Type regular expression"
        onChange={handleChange}
      ></Form.Control>
      <DropDownPicker
        open={isActiveFlagsBlock}
        setOpen={setIsActiveFlagsBlock}
        list={flags}
        setList={setFlags}
      >
        {getFlagsString(flags)}
      </DropDownPicker>
    </div>
  );
}
