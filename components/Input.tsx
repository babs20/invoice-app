import classNames from 'classnames';
import { Field } from 'formik';
interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  classes?: string;
  value: string | number;
  label: string;
}

export const Input = ({
  placeholder,
  type = 'text',
  name,
  classes,
  value,
  label,
}: InputProps): JSX.Element => {
  const inputClasses = classNames(`input${classes ? ' ' + classes : ''}`);

  return (
    <div className={inputClasses}>
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="input__field"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
export default Input;
