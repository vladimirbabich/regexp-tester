import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

export default function Information() {
  return (
    <Container>
      <Row
        style={{
          fontSize: "0.7em",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        Don`t know regular expression? Learn here:
      </Row>
      <Row>
        <Col>
          <a
            href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            MDN web docs
          </a>
        </Col>
        <Col>
          <a
            href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            W3 schools
          </a>
        </Col>
        <Col>
          <a
            href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Python docs
          </a>
        </Col>
      </Row>
    </Container>
  );
}
