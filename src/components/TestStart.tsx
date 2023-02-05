import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./../App.css";

type ButtonProps = {
  setIsTestMode: (bool: boolean) => void;
};

export default function TestStart({ setIsTestMode }: ButtonProps) {
  return (
    <div>
      <h1>Test your regular expression knowledge</h1>
      <Button onClick={() => setIsTestMode(true)}>Start test</Button>
    </div>
  );
}
