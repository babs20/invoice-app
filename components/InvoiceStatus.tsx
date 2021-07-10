interface InvoiceStatusProps {
  status: string;
  rightIcon?: React.ReactNode;
  showStatus?: boolean;
}

export const InvoiceStatus = ({
  status,
  rightIcon,
  showStatus = false,
}: InvoiceStatusProps): JSX.Element => {
  const statusFormatted: string =
    status.slice(0, 1).toUpperCase() + status.slice(1);

  return (
    <div className="invoice-status__container">
      <div className="invoice-status__text-icon-container">
        {showStatus && <span className="invoice-status__text">Status</span>}
        <span
          className={`invoice-status__icon invoice-status__icon--${status}`}
        >
          {statusFormatted}
        </span>
      </div>
      {rightIcon}
    </div>
  );
};

export default InvoiceStatus;
