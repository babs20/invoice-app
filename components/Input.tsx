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
}: InputProps): JSX.Element => {
  const inputClasses = classNames(`input${classes ? ' ' + classes : ''}`);

  return (
    <div className={inputClasses}>
      <div className="input__header">
        <label
          className={classNames('input__label', {
            'input__label--invalid': isInvalid,
          })}
          htmlFor={name}
        >
          {label}
        </label>
        <span
          className={classNames('input__error-message', {
            'input__error-message--show': isInvalid,
          })}
        >
          {errorMessage}
        </span>
      </div>
      <Field
        name={name}
        type={type}
        className={classNames('input__field', {
          'input__field--invalid': isInvalid,
        })}
        placeholder={placeholder}
        value={value}
      ></Field>
    </div>
  );
};
export default Input;
