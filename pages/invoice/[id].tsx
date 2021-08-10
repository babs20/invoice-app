import InvoiceStatus from '../../components/InvoiceStatus';
import data from '../../data.json';
import dayjs from 'dayjs';
import currency from 'currency.js';
import Button from '../../components/Button';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

type InvoiceType = typeof data[0];
interface ViewInvoiceProps {
  invoice: InvoiceType;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceItemList {
  items: Item[];
}

interface Path {
  params: { id: string };
}

const InvoiceItemList = ({ items }: InvoiceItemList): JSX.Element => {
  const InvoiceItem = ({ item }: { item: Item }): JSX.Element => {
    return (
      <tr className="view__line-item">
        <td className="view__item-and-quantity text-left">
          {item.name}
          <span>
            {item.quantity} x{' '}
            {currency(item.price, { fromCents: true }).format()}
          </span>
        </td>
        <td className="text-center">{item.quantity}</td>
        <td className="text-right">
          {currency(item.price, { fromCents: true }).format()}
        </td>
        <td className="text-right">
          {currency(item.total, { fromCents: true }).format()}
        </td>
      </tr>
    );
  };

  return (
    <div className="view__items-container">
      <table className="view__items">
        <thead className="view__items-headers">
          <tr className="view__header-row">
            <th scope="col" className="text-left">
              Item Name
            </th>
            <th scope="col" className="text-center">
              QTY.
            </th>
            <th scope="col" className="text-right">
              Price
            </th>
            <th scope="col" className="text-right">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return <InvoiceItem key={index} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export const ViewInvoice = ({ invoice }: ViewInvoiceProps): JSX.Element => {
  return (
    <main className="view">
      <Link href="/">
        <a className="view__go-back">
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.11401 9.22754L1.88611 4.99964L6.11401 0.771736"
              stroke="#7C5DFA"
              strokeWidth="2"
            />
          </svg>
          <span>Go back</span>
        </a>
      </Link>
      <header className="view__header">
        <InvoiceStatus showStatus status={invoice.status} />
        <div className="view__button-container">
          <Button isEdit text="Edit" />
          <Button isDestructive text="Delete" />
          <Button text="Mark as Paid" />
        </div>
      </header>
      <section className="view__details">
        <div className="view__top-section">
          <div className="view__id-description">
            <h2 className="view__id">
              <span>#</span>
              {invoice.id}
            </h2>
            <span className="view__description">{invoice.description}</span>
          </div>
          <div className="view__address">
            <p>
              {invoice.senderAddress.street} <br />
              {invoice.senderAddress.city} <br />
              {invoice.senderAddress.postCode} <br />
              {invoice.senderAddress.country}
            </p>
          </div>
        </div>
        <div className="view__invoice-info">
          <div className="view__invoice-date">
            <h2>Invoice Date</h2>
            <span>{dayjs(invoice.createdAt).format('DD MMM YYYY')}</span>
          </div>
          <div className="view__bill-to">
            <h2>Bill To</h2>
            <span>{invoice.clientName}</span>
            <p className="view__bill-to-address">
              {invoice.clientAddress.street} <br />
              {invoice.clientAddress.city} <br />
              {invoice.clientAddress.postCode} <br />
              {invoice.clientAddress.country}
            </p>
          </div>
          <div className="view__payment-due">
            <h2>Payment Due</h2>
            <span>{dayjs(invoice.paymentDue).format('DD MMM YYYY')}</span>
          </div>
          <div className="view__sent-to">
            <h2>Sent To</h2>
            <span>{invoice.clientEmail}</span>
          </div>
        </div>
        <InvoiceItemList items={invoice.items} />
        <div className="view__items-total">
          <span className="view__amount-due">Amount Due</span>
          <span className="view__total">
            {currency(invoice.total, { fromCents: true }).format()}
          </span>
        </div>
      </section>
    </main>
  );
};

export default ViewInvoice;

export const getStaticProps: GetStaticProps = async (context) => {
  const invoices = await data;
  //@ts-ignore
  const { id } = context.params;
  let invoice: InvoiceType = invoices[0];

  for (const i of invoices) {
    if (i.id === id) {
      invoice = i;
    }
  }

  return {
    props: { invoice },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const invoices = await data;

  const paths: Path[] = [];
  for (let i = 0; i < invoices.length; i++) {
    paths.push({ params: { id: invoices[i].id } });
  }

  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
  };
};
