interface InputProps {
  placeholder: string;
  type?: string;
}

export const Input = ({
  placeholder,
  type = 'text',
}: InputProps): JSX.Element => {
  return <input type={type} className="input" placeholder={placeholder} />;
};
export default Input;
