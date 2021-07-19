import classNames from 'classnames';
interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  classes?: string;
}

export const Input = ({
  placeholder,
  type = 'text',
  name,
  classes,
}: InputProps): JSX.Element => {
  const inputClasses = classNames(`input${classes ? ' ' + classes : ''}`);

  return (
    <div className={inputClasses}>
      <label className="input__label" htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        type={type}
        className="input__field"
        placeholder={placeholder}
      />
    </div>
  );
};
export default Input;
