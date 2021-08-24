import React from 'react';
import ReactDatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { useFormikContext, useField } from 'formik';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';

interface CustomHeaderProps {
  decreaseMonth: () => void;
  increaseMonth: () => void;
  monthDate: Date;
}

const CustomHeader = ({
  decreaseMonth,
  increaseMonth,
  monthDate,
}: CustomHeaderProps): JSX.Element => {
  return (
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
        {monthDate.toLocaleString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
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
  );
};

const DatePicker = ({
  name,
  isDisabled = false,
}: {
  name: string;
  isDisabled: boolean;
}): JSX.Element => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="datepicker">
      <div className="datepicker__input-container">
        <label
          htmlFor="datepicker"
          className={classNames('datepicker__input-label', {
            'datepicker__input-label--isDisabled': isDisabled,
          })}
        >
          Issue Date
        </label>
        <ReactDatePicker
          id="datepicker"
          name={field.name}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, dayjs(val as Date).format('YYYY-MM-DD'));
          }}
          className={classNames('datepicker__input', {
            'datepicker__input--isDisabled': isDisabled,
          })}
          calendarClassName="datepicker__dialogbox"
          weekDayClassName={() => 'datepicker__day-names'}
          dayClassName={() => 'datepicker__date-button'}
          renderCustomHeader={({ decreaseMonth, increaseMonth, monthDate }) => (
            <CustomHeader
              decreaseMonth={decreaseMonth}
              monthDate={monthDate}
              increaseMonth={increaseMonth}
            />
          )}
          value={dayjs(field.value).format('DD MMM YYYY')}
          popperPlacement={'bottom'}
          showPopperArrow={false}
          onFocus={(e) => (e.target.readOnly = true)}
          dropdownMode="scroll"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default DatePicker;
