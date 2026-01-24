import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";

const IconLogistics: React.FC = () => {
  return (
    <Container fluid>
      <Row className="mt-5 px-4 gap-5">
        <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-5">
          <Button variant="link" className="van-icon d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
              style={{
                width: "40px",
                filter:
                  "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)",
              }}
              alt="Driver Not Assigned"
            />
          </Button>
          <h4 className="ml-2 extra-large-text">Driver Not Assigned</h4>
        </Col>
        <Col className="d-flex align-items-center mb-3 gap-3 border-custom pr-2">
          <Button variant="link" className="van-icon d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
              style={{
                width: "40px",
                filter:
                  "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
              }}
              alt="Driver Assigned"
            />
          </Button>
          <h4 className="ml-2 extra-large-text">Driver Assigned</h4>
        </Col>
        <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-2">
          <Button variant="link" className="van-icon d-flex align-items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
              style={{
                width: "40px",
                filter:
                  "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
              }}
              alt="Driver Pick Up/Delivered"
            />
          </Button>
          <h4 className="ml-2 extra-large-text">Driver Pick Up/Delivered</h4>
        </Col>
        <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-2">
          <h3 className="rounded border M-logistics">M</h3>
          <h4 className="ml-2 extra-large-text">M Logistics</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default IconLogistics;
