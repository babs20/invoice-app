import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="datepicker">
      <div className="datepicker__input-container">
        <label htmlFor="datepicker" className="datepicker__input-label">
          Issue Date
        </label>
        <ReactDatePicker
          id="datepicker"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          className="datepicker__input"
          calendarClassName="datepicker__dialogbox"
          weekDayClassName={() => 'datepicker__day-names'}
          dayClassName={() => 'datepicker__date-button'}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="datepicker__dialogbox-header">
              <button
                className="prevMonth"
                aria-label="previous month"
                onClick={decreaseMonth}
                type="button"
              >
                <svg
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.11401 9.22754L1.88611 4.99964L6.11401 0.771736"
                    stroke="#7C5DFA"
                    strokeWidth="2"
                  />
                </svg>
              </button>
              <h2 id="id-dialog-label" className="monthYear" aria-live="polite">
                idk
              </h2>
              <button
                className="nextMonth"
                aria-label="next month"
                onClick={increaseMonth}
                type="button"
              >
                <svg
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.88599 0.772461L6.11389 5.00036L1.88599 9.22826"
                    stroke="#7C5DFA"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default DatePicker;
