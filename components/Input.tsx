import classNames from 'classnames';
import { Field } from 'formik';
interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  classes?: string;
  value: string | number;
  label: string;
  isInvalid?: boolean;
  errorMessage?: string;
  isTouched: boolean | undefined;
}

export const Input = ({
  placeholder,
  type = 'text',
  name,
  classes,
  value,
  label,
  isInvalid,
  errorMessage = 'Invalid input',
  isTouched,
}: InputProps): JSX.Element => {
  const inputClasses = classNames(`input${classes ? ' ' + classes : ''}`);

  return (
    <div className={inputClasses}>
      <div className="input__header">
        <label
          className={classNames('input__label', {
            'input__label--invalid': isTouched && isInvalid,
          })}
          htmlFor={name}
        >
          {label}
        </label>
        {/* <span
          className={classNames('input__error-message', {
            'input__error-message--show': isTouched && isInvalid,
          })}
        >
          {errorMessage}
        </span> */}
      </div>
      <Field
        name={name}
        type={type}
        className={classNames('input__field', {
          'input__field--invalid': isTouched && isInvalid,
        })}
        placeholder={placeholder}
        value={value}
      ></Field>
      <span
        className={classNames('input__error-message', {
          'input__error-message--show': isTouched && isInvalid,
        })}
      >
        {errorMessage}
      </span>
    </div>
  );
};
export default Input;
