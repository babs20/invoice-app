import dayjs from 'dayjs';
import currency from 'currency.js';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import InvoiceStatus from '../../components/InvoiceStatus';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import FormContainer from '../../layouts/FormContainer';
import {
  InvoiceType,
  Action,
  InvoiceStatus as InvoiceStatusEnum,
} from '../../utils/types';
import { useRouter } from 'next/dist/client/router';
import { useState, Dispatch, SetStateAction } from 'react';

interface ViewInvoiceProps {
  initialInvoiceState: InvoiceType;
  isFormOpen: boolean;
  isFormOpenSet: Dispatch<SetStateAction<boolean>>;
  dispatch: React.Dispatch<Action>;
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

export const ViewInvoice = ({
  initialInvoiceState,
  isFormOpen,
  isFormOpenSet,
  dispatch,
}: ViewInvoiceProps): JSX.Element => {
  const [invoice, invoiceSet] = useState<InvoiceType>(initialInvoiceState);
  const [isModalOpen, isModalOpenSet] = useState<boolean>(false);
  const router = useRouter();

  const deleteInvoice = (): void => {
    fetch('http://localhost:3000/api/invoices', {
      method: 'DELETE',
      body: JSON.stringify({ invoice_id: invoice.id }, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        router.push('/');
      }
    });
  };

  const updateInvoiceStatus = (): void => {
    const updateStatusValues = {
      statusOnly: true,
      invoice_id: invoice.id,
      status: InvoiceStatusEnum.PAID,
    };
    fetch('http://localhost:3000/api/invoices', {
      method: 'PUT',
      body: JSON.stringify(updateStatusValues, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          invoiceSet((prev) => {
            return { ...prev, status: InvoiceStatusEnum.PAID };
          });
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <FormContainer
        isEdit={true}
        isFormOpen={isFormOpen}
        isFormOpenSet={isFormOpenSet}
        dispatch={dispatch}
        values={invoice}
      />
      <Modal isOpen={isModalOpen} invoiceId={invoice.id}>
        <Button isEdit text="Cancel" onClick={() => isModalOpenSet(false)} />
        <Button isDestructive text="Delete" onClick={() => deleteInvoice()} />
      </Modal>
      <main className="view">
        <div>
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
            <div
              className="view__button-container
            view__button-container--top"
            >
              <Button
                isEdit
                text="Edit"
                onClick={() => isFormOpenSet(!isFormOpen)}
              />
              <Button
                isDestructive
                text="Delete"
                onClick={() => isModalOpenSet(true)}
              />
              {invoice.status === InvoiceStatusEnum.PENDING && (
                <Button
                  text="Mark as Paid"
                  onClick={() => updateInvoiceStatus()}
                />
              )}
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
        </div>
        <div className="view__button-container view__button-container--bottom">
          <Button isEdit text="Edit" />
          <Button
            isDestructive
            text="Delete"
            onClick={() => isModalOpenSet(true)}
          />
          <Button text="Mark as Paid" />
        </div>
      </main>
    </>
  );
};

export default ViewInvoice;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('http://localhost:3000/api/invoices');
  const invoices = await res.json();

  //@ts-ignore
  const { id } = context.params;
  let invoice: InvoiceType = invoices[0];

  for (const i of invoices) {
    if (i.id === id) {
      invoice = i;
    }
  }

  return {
    props: { initialInvoiceState: invoice },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/invoices');
  const invoices = await res.json();

  const paths: Path[] = [];
  for (let i = 0; i < invoices.length; i++) {
    paths.push({ params: { id: invoices[i].id } });
  }

  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
  };
};
