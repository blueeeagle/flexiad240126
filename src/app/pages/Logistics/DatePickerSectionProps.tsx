// import React from "react";
// import { Form } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface DatePickerSectionProps {
//   startDate: Date | undefined;
//   endDate: Date | undefined;
//   setStartDate: (date: Date | undefined) => void;
//   setEndDate: (date: Date | undefined) => void;
//   isAssigned: boolean;
//   setIsAssigned: (assigned: boolean) => void;
// }

// const DatePickerSection: React.FC<DatePickerSectionProps> = ({
//   startDate,
//   endDate,
//   setStartDate,
//   setEndDate,
//   isAssigned,
//   setIsAssigned,
// }) => {
//   const handleDateChange = (dates: [Date | undefined, Date | undefined]) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//    <div className="d-flex justify-content-between px-4 py-3">
 

//   {/* Date Picker */}
//   <div className="mb-4 d-flex ">
//     <Form.Group>
//       <Form.Label className="fw-semibold text-muted mb-1">Select Date Range</Form.Label>
//       <DatePicker
//         selected={startDate || undefined}
//         onChange={handleDateChange as any}
//         startDate={startDate}
//         endDate={endDate}
//         selectsRange
//         placeholderText="Select Date Range"
//         className="form-control shadow-sm  "
//       />
//     </Form.Group>
//   </div>

//   {/* Assignment Status  */}
// <div className="">
//   <Form.Label className="fw-semibold text-muted mb-2 d-block">Assignment Status</Form.Label>
//   <Form.Check
//     type="switch"
//     id="assignmentStatusSwitch"
//     label={isAssigned ? "Assigned" : "Not Assigned"}
//     checked={isAssigned}
//     onChange={() => setIsAssigned(!isAssigned)}
//   />
// </div>
  
  
// </div>
//   );
// };

// export default DatePickerSection;



import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerSectionProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  isAssigned: boolean;
  setIsAssigned: (assigned: boolean) => void;
}

const DatePickerSection: React.FC<DatePickerSectionProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  isAssigned,
  setIsAssigned,
}) => {
  const handleDateChange = (dates: [Date | undefined, Date | undefined]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Card className="shadow-sm border-0 rounded-3">
      <Card.Body>
        <Row className="align-items-center g-4">
          {/* Date Picker */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold text-secondary">
                Select Date Range
              </Form.Label>
              <DatePicker
                selected={startDate || undefined}
                onChange={handleDateChange as any}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText="Select Date Range"
                className="form-control shadow-sm"
              />
            </Form.Group>
          </Col>

            {/* Assignment Status */}
            <Col md={6} className="d-flex align-items-center">
            <Form.Label className="fw-semibold text-secondary mb-0 me-3">
              Assignment Status
            </Form.Label>
            <div className="d-flex align-items-center ">
              <Form.Check
              type="checkbox"
              id="assignedCheckbox"
              label="Assigned"
              checked={isAssigned}
              onChange={() => setIsAssigned(false)}
              className="me-3 text-center"
              />
              <Form.Check
              type="checkbox"
              id="notAssignedCheckbox"
              label="Not Assigned"
              checked={!isAssigned}
              onChange={() => setIsAssigned(true)}
              />
            </div>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DatePickerSection;
