import classNames from 'classnames';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  invoiceId: string;
}

export const Modal = ({
  children,
  isOpen,
  invoiceId,
}: ModalProps): JSX.Element => {
  return (
    <div
      className={classNames('modal', {
        'modal--open': isOpen,
      })}
    >
      <div className="modal__box">
        <span className="modal__title">Confirm Deletion</span>
        <p className="modal__description">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className="modal__button-container">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
