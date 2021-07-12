import classNames from 'classnames';
import { useState } from 'react';
import { Keys } from '../utils/keyboard';

export const Filter = (): JSX.Element => {
  interface CheckedType {
    draft: boolean;
    pending: boolean;
    paid: boolean;
  }
  const statusFilters: string[] = ['Draft', 'Pending', 'Paid'];
  const [checked, setChecked] = useState<CheckedType>({
    draft: false,
    pending: false,
    paid: false,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateCheckbox = (status: string): void => {
    setChecked(
      (prev): CheckedType => {
        return {
          ...prev,
          [status]: !checked[status as keyof CheckedType],
        };
      }
    );
  };

  const selectWithEnter = (
    event: React.KeyboardEvent<HTMLLIElement>,
    status: string
  ): void => {
    if (event.code === Keys.Enter) {
      updateCheckbox(status);
    }
  };

  const updateFocusOnEnter = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    if (event.code === Keys.Enter) {
      const firstOption: HTMLElement | null = document.querySelector(
        '.filter__optionbox :first-child'
      );

      if (firstOption) {
        firstOption.focus();
      }
    }
  };

  const handleInputInOptionBox = (
    event: React.KeyboardEvent<HTMLUListElement>
  ): void => {
    if (event.code === Keys.Escape) {
      const button: HTMLElement | null = document.querySelector(
        '.filter__button'
      );

      setIsOpen(false);
      if (button) {
        button.focus();
      }

      return;
    }

    if (event.code === Keys.ArrowDown) {
      const nextSibling = event.target.nextSibling;
      const firstSibling: HTMLElement | null = event.target.parentElement.querySelector(
        '.filter__option:first-child'
      );

      if (nextSibling) {
        nextSibling.focus();
      } else if (firstSibling) {
        firstSibling.focus();
      }
    }

    if (event.code === Keys.ArrowUp) {
      const previousSibling: HTMLElement | null = event.target.previousSibling;
      const lastSibling: HTMLElement | null = event.target.parentElement.querySelector(
        '.filter__option:last-child'
      );

      if (previousSibling) {
        previousSibling.focus();
      } else if (lastSibling) {
        lastSibling.focus();
      }
    }
  };

  return (
    <div className="filter">
      <button
        className="filter__button"
        aria-haspopup="listbox"
        onClick={() => setIsOpen(!isOpen)}
        onKeyUp={(event) => updateFocusOnEnter(event)}
      >
        <span>Filter by status</span>
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter__chevron"
          transform={isOpen ? 'rotate(0)' : 'rotate(180)'}
        >
          <path
            d="M9.22778 1.88574L4.99988 6.11364L0.77198 1.88574"
            stroke="#7C5DFA"
            strokeWidth="2"
          />
        </svg>
      </button>
      <ul
        role="listbox"
        tabIndex={isOpen ? 0 : -1}
        className={classNames('filter__optionbox', {
          'filter__optionbox--shown': isOpen,
        })}
        onKeyDown={(event) => handleInputInOptionBox(event)}
      >
        {statusFilters.map((status) => {
          return (
            <li
              key={status}
              role="option"
              className="filter__option"
              onClick={() => updateCheckbox(status)}
              tabIndex={isOpen ? 0 : -1}
              onKeyDown={(event) => selectWithEnter(event, status)}
            >
              <input
                id={status.toLowerCase()}
                type="checkbox"
                className="filter__input"
                checked={checked[status as keyof CheckedType]}
                tabIndex={-1}
              />
              <div className="filter__square" />
              <label htmlFor={status.toLowerCase()} className="filter__label">
                {status}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Filter;
