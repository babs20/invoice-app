import dayjs from 'dayjs';
import React, { useState } from 'react';
import classNames from 'classnames';
import { Keys } from '../utils/keyboard';

export const DatePicker = (): JSX.Element => {
  const [calendar, setCalendar] = useState({
    month: dayjs().month(),
    year: dayjs().year(),
  });
  const [isDialogShown, setisDialogShown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  let dateFormatted: string = `${calendar.year}-${calendar.month + 1}`;

  const Date = ({
    date,
    isDisabled = false,
    formattedDate,
  }: {
    date: number;
    isDisabled?: boolean;
    formattedDate: string;
  }): JSX.Element => {
    const navigateCalendar = (
      e: React.KeyboardEvent<HTMLButtonElement>
    ): void => {
      if (e.key === Keys.ArrowLeft) {
        const leftDate = (e.target as HTMLElement)?.parentElement
          ?.previousSibling?.firstChild;
        // button (target) => td (parent) => tr (parent) =>
        // tr (prev sibling) => td (last child) => button (first child)
        const rowAbove = (e.target as HTMLElement)?.parentElement?.parentElement
          ?.previousSibling?.lastChild?.firstChild;
        if (leftDate) {
          (leftDate as HTMLButtonElement).focus();
        } else if (rowAbove) {
          (rowAbove as HTMLButtonElement).focus();
        }
      }
    };

    return (
      <td className="datepicker__date-cell">
        <button
          className={classNames('datepicker__date-button', {
            'datepicker__date-button--selected': formattedDate === selectedDate,
          })}
          tabIndex={formattedDate === selectedDate ? 0 : -1}
          disabled={false}
          onClick={() => setSelectedDate(formattedDate)}
          onKeyDown={(e) => navigateCalendar(e)}
        >
          {date}
        </button>
      </td>
    );
  };

  const Row = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return <tr className="datepicker__calendar-row">{children}</tr>;
  };

  const CalendarBody = (): JSX.Element => {
    let dates: React.ReactNode[] = [];
    let rows: React.ReactNode[] = [];

    const previousMonth = calendar.month - 1;
    const daysInMonth = dayjs(dateFormatted).daysInMonth();
    const firstDayOfMonth = dayjs(dateFormatted).startOf('month');
    const previousMonthDays = dayjs().month(previousMonth).daysInMonth();

    //Disabled Dates At Start
    let startCalendar = previousMonthDays - firstDayOfMonth.day() + 1;
    while (startCalendar <= previousMonthDays) {
      dates.push(
        <Date
          date={startCalendar}
          key={dates.length}
          isDisabled={true}
          formattedDate={dayjs(
            `${calendar.year}-${calendar.month}-${startCalendar}`
          ).format('YYYY-MM-DD')}
        />
      );
      startCalendar += 1;
    }

    //Main Dates
    let daysToEnable = 1;
    while (daysToEnable <= daysInMonth) {
      dates.push(
        <Date
          date={daysToEnable}
          key={dates.length}
          formattedDate={dayjs(
            `${calendar.year}-${calendar.month + 1}-${daysToEnable}`
          ).format('YYYY-MM-DD')}
        />
      );
      daysToEnable += 1;
    }

    //Disabled Dates At End
    if (dates.length % 7) {
      let daysToAdd: number = 1;
      while (dates.length % 7 !== 0) {
        dates.push(
          <Date
            date={daysToAdd}
            key={dates.length}
            isDisabled={true}
            formattedDate={dayjs(
              `${calendar.year}-${calendar.month + 2}-${daysToAdd}`
            ).format('YYYY-MM-DD')}
          />
        );
        daysToAdd += 1;
      }
    }

    //Add days to weeks
    while (dates.length > 0) {
      let content = dates.splice(0, 7);
      rows.push(<Row key={dates.length}>{content}</Row>);
    }

    return <tbody>{rows}</tbody>;
  };

  const goToPreviousMonth = (): void => {
    setCalendar((prev) => {
      return {
        year: prev.month === 1 ? prev.year - 1 : prev.year,
        month: prev.month === 1 ? 12 : prev.month - 1,
      };
    });
  };

  const goToNextMonth = (): void => {
    setCalendar((prev) => {
      return {
        year: prev.month === 12 ? prev.year + 1 : prev.year,
        month: prev.month === 12 ? 1 : prev.month + 1,
      };
    });
  };

  const openDialogBox = (): void => {
    setisDialogShown(!isDialogShown);
    const selectedDate: HTMLButtonElement | null = document.querySelector(
      '.datepicker__date-button--focus'
    );

    if (selectedDate) {
      selectedDate.focus();
    }
  };

  return (
    <div id="myDatepicker" className="datepicker">
      <div className="datepicker__input-container">
        <label htmlFor="id-textbox-1" className="datepicker__input-label">
          Issue Date
        </label>
        <div className="datepicker__input-button-container">
          <input
            type="text"
            placeholder={dayjs(selectedDate).format('DD MMM YYYY')}
            id="id-textbox-1"
            aria-autocomplete="none"
            className="datepicker__input"
            value={dayjs(selectedDate).format('DD MMM YYYY')}
            readOnly={true}
          />
          <button
            className="datepicker__calendar-button"
            aria-label="Choose Date"
            onClick={openDialogBox}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3334 2H14C15.1027 2 16 2.89734 16 4V14C16 15.1027 15.1027 16 14 16H2C0.897339 16 0 15.1027 0 14V4C0 2.89734 0.897339 2 2 2H2.66663V0.666626C2.66663 0.298706 2.96533 0 3.33337 0H4C4.36804 0 4.66663 0.298706 4.66663 0.666626V2H11.3334V0.666626C11.3334 0.298706 11.632 0 12 0H12.6666C13.0347 0 13.3334 0.298706 13.3334 0.666626V2ZM14 14.6666C14.3673 14.6666 14.6666 14.3673 14.6666 14V6.69336H1.33337V14C1.33337 14.3673 1.63269 14.6666 2 14.6666H14Z"
                fill="#7E88C3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="id-datepicker-1"
        className={classNames('datepicker__dialogbox', {
          'datepicker__dialogbox--show': isDialogShown,
        })}
        role="dialog"
        aria-modal="true"
        aria-labelledby="id-dialog-label"
      >
        <div className="datepicker__dialogbox-header">
          <button
            className="prevMonth"
            aria-label="previous month"
            onClick={goToPreviousMonth}
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
            {dayjs(dateFormatted).format('MMM YYYY')}
          </h2>
          <button
            className="nextMonth"
            aria-label="next month"
            onClick={goToNextMonth}
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
        <table
          id="myDatepickerGrid"
          className="datepicker__calendar"
          role="grid"
          aria-labelledby="id-dialog-label"
        >
          <CalendarBody />
        </table>
      </div>
    </div>
  );
};
export default DatePicker;
