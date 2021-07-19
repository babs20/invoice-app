interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
}

export const Input = ({
  placeholder,
  type = 'text',
  name,
}: InputProps): JSX.Element => {
  return (
    <div className="input">
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
