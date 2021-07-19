import classnames from 'classnames';
interface ButtonProps {
  text: string;
  expandedText?: string;
  showCirclePlus?: boolean;
  isEdit?: boolean;
  isSaveAsDraft?: boolean;
  isDestructive?: boolean;
  isAddNewItem?: boolean;
  isMini?: boolean;
}

const CirclePlusSVG = (): JSX.Element => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="button__circle-plus"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM17.3131 17.3131V21.0229H14.7328V17.3131H11.0229V14.7328H14.7328V11.0229H17.3131V14.7328H21.0229V17.3131H17.3131Z"
        fill="#fff"
      />
    </svg>
  );
};

export const Button = ({
  text,
  expandedText,
  showCirclePlus = false,
  isEdit = false,
  isSaveAsDraft = false,
  isDestructive = false,
  isAddNewItem = false,
  isMini = false,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classnames('button', {
        'button--with-plus-icon': showCirclePlus,
        'button--edit': isEdit,
        'button--save-as-draft': isSaveAsDraft,
        'button--destructive': isDestructive,
        'button--add-new-item': isAddNewItem,
        'button--mini': isMini,
      })}
    >
      {showCirclePlus && <CirclePlusSVG />}
      <span>
        {text}{' '}
        {expandedText && (
          <span className="button__expanded-text">{expandedText}</span>
        )}
      </span>
    </button>
  );
};
export default Button;
