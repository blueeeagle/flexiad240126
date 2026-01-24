import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  handleDateChange,
}) => {
  return (
    <DatePicker
      selectsRange
      startDate={startDate ?? undefined}
      endDate={endDate ?? undefined}
      onChange={handleDateChange}
      isClearable
      className="form-control"
      placeholderText="Select Date Range"
      dateFormat="MMMM yyyy"
      showMonthYearPicker
    />
  );
};

export default DateRangePicker;
