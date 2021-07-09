export const Invoice = (): JSX.Element => {
  return (
    <article className="invoice">
      <span className="invoice__number">#RT3080</span>
      <span className="invoice__date">Due 19 Aug 2021</span>
      <span className="invoice__client">Jensen Huang</span>
      <span className="invoice__total">$1,800.90</span>
      <span className="invoice__status">Paid</span>
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
    </article>
  );
};

export default Invoice;
