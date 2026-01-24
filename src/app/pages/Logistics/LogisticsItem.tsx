import React from "react";
import { Button } from "react-bootstrap";
import { FaTruck } from "react-icons/fa";

interface LogisticsItemProps {
  orderNo: string;
  dateReceived: string;
  customerName: string;
  color: string;
  status: string;
}

const getColorFilter = (color: string) => {
  switch (color) {
    case "red":
      return "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)";
    case "yellow":
      return "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)";
    case "lightgreen":
      return "invert(43%) sepia(77%) saturate(1800%) hue-rotate(95deg) brightness(120%) contrast(90%)";
    default:
      return "none";
  }
};

const LogisticsItem: React.FC<LogisticsItemProps> = ({
  orderNo,
  dateReceived,
  customerName,
  color,
  status,
}) => (
  <div className="mt-5 px-5 d-flex align-items-center justify-content-between border-custom">
    <div>
      <h4 className="mt-2 box-large-text">{orderNo} | Date | Online</h4>
      <div className="mt-3">Date Received: {dateReceived}</div>
      <div className="mt-2">{customerName}</div>
    </div>
    <div className="item-container d-flex align-items-center">
      <h3 className="rounded border p-2 M-logistics">M</h3>
      <div className="d-flex flex-column align-items-center">
        <Button variant="link" className="van-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
            style={{
              width: "40px",
              color: color,
              filter: getColorFilter(color),
            }}
          />
        </Button>
        <span style={{ width: "50px" }}>{status}</span>
      </div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  </div>
);

export default LogisticsItem;
