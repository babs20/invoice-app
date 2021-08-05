import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import InvoiceStatus from './InvoiceStatus';
import Link from 'next/link';
interface InvoiceProps {
  id: string;
  paymentDue: string;
  status: string;
  clientName: string;
  total: string;
  href: string;
}

export const Invoice = ({
  id,
  status,
  paymentDue,
  clientName,
  total,
  href,
}: InvoiceProps): JSX.Element => {
  const dayFormatted = (): string => {
    const dateFormat: boolean = dayjs(paymentDue, 'YYYY MM DD').isValid();

    if (dateFormat) {
      return dayjs(paymentDue, 'YYYY MM DD').format('DD MMM YYYY');
    } else {
      return 'Date Unknown';
    }
  };

  // Chevron Icon for Medium and Large Breakpoints
  const ChevronSVG = (): JSX.Element => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="invoice__open-chevron"
      >
        <path d="M6 4L10 8L6 12" stroke="#7C5DFA" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <Link href={href} passHref={true}>
      <article className="invoice" role="link">
        <span className="invoice__number">
          <span>#</span>
          {id}
        </span>
        <span className="invoice__date">{`Due ${dayFormatted()}`}</span>
        <span className="invoice__client">{clientName}</span>
        <span className="invoice__total">{total}</span>
        <div className="invoice__status-container">
          <InvoiceStatus status={status} rightIcon={<ChevronSVG />} />
        </div>
      </article>
    </Link>
  );
};

export default Invoice;
