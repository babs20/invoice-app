import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { GetStaticProps } from 'next';
import currency from 'currency.js';
import Filter from '../components/Filter';
import Button from '../components/Button';
import Invoice from '../components/Invoice';
import NoInvoiceSVG from '../components/svg/NoInvoiceSVG';
import FormContainer from '../layouts/FormContainer';
import {
  InvoiceArrType,
  InvoiceType,
  InvoiceStatus,
  State,
  Action,
  ActionTypes,
} from '../utils/types';

interface InvoicesOverviewProps {
  isFormOpen: boolean;
  isFormOpenSet: Dispatch<SetStateAction<boolean>>;
  staticInvoices: InvoiceArrType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

type FilterType = {
  draft: boolean;
  pending: boolean;
  paid: boolean;
};

export const InvoicesOverview = ({
  state,
  dispatch,
  isFormOpen,
  isFormOpenSet,
  staticInvoices,
}: InvoicesOverviewProps): JSX.Element => {
  useEffect(() => {
    dispatch({
      type: ActionTypes.InitializeInvoices,
      payload: {
        invoices: staticInvoices,
      },
    });
  }, [staticInvoices, dispatch]);
  const { invoices } = state;

  const [checked, setChecked] = useState({
    draft: false,
    pending: false,
    paid: false,
  });

  const filterResults = ({
    draft,
    pending,
    paid,
  }: FilterType): Array<InvoiceType> => {
    // If nothing checked give all results
    if (!draft && !pending && !paid) {
      return invoices;
    }

    let results: Array<InvoiceType> = [];
    if (draft) {
      results = results.concat(
        invoices.filter((invoice) => invoice.status === InvoiceStatus.DRAFT)
      );
    }

    if (pending) {
      results = results.concat(
        invoices.filter((invoice) => invoice.status === InvoiceStatus.PENDING)
      );
    }

    if (paid) {
      results = results.concat(
        invoices.filter((invoice) => invoice.status === InvoiceStatus.PAID)
      );
    }

    return results;
  };

  const subHeadingText = (isMobile: boolean): string => {
    const numOfInvoices = filterResults(checked).length;
    if (numOfInvoices === 0) return 'No invoices';

    const verb = numOfInvoices > 1 ? 'are' : 'is';
    const invoiceQuantity = numOfInvoices > 1 ? 'invoices' : 'invoice';

    // Check if only one checkbox is checked. If so, use it in the sub heading.
    let activeFilters: string[] = [];
    for (const status in checked) {
      if (checked[status as keyof FilterType]) {
        activeFilters.push(status);
      }
    }
    const invoiceDescriptor =
      activeFilters.length === 1 ? activeFilters[0] : 'total';

    if (isMobile) {
      return `${numOfInvoices} ${invoiceQuantity}`;
    } else {
      return `There ${verb} ${numOfInvoices} ${invoiceDescriptor} ${invoiceQuantity}`;
    }
  };

  return (
    <>
      <FormContainer
        isEdit={false}
        isFormOpen={isFormOpen}
        isFormOpenSet={isFormOpenSet}
        dispatch={dispatch}
      />
      <main className="overview">
        <header className="overview__header">
          <div className="overview__heading-container">
            <h1 className="overview__heading">Invoices</h1>
            <h2 className="overview__sub-heading">{subHeadingText(false)}</h2>
            <h2 className="overview__sub-heading--mobile">
              {subHeadingText(true)}
            </h2>
          </div>
          <div className="overview__options">
            <Filter checked={checked} setChecked={setChecked} />
            <Button
              text="New"
              expandedText="Invoice"
              showCirclePlus
              onClick={() => {
                isFormOpenSet(!isFormOpen);
              }}
            />
          </div>
        </header>
        {filterResults(checked).length ? (
          <section className="overview__invoice-section">
            {filterResults(checked).map(
              ({ id, status, paymentDue, clientName, total }) => {
                return (
                  <Invoice
                    key={id}
                    id={id}
                    status={status}
                    paymentDue={paymentDue}
                    clientName={clientName}
                    total={currency(total, { fromCents: true }).format()}
                    href={`/invoice/${id}`}
                  />
                );
              }
            )}
          </section>
        ) : (
          <div className="overview__no-invoice">
            <NoInvoiceSVG />
            <h2>There is nothing here</h2>
            <p className="overview__no-invoice--small-text">
              Create an invoice by clicking the <strong>New</strong> button and
              get started
            </p>
            <p className="overview__no-invoice--large-text">
              Create a new invoice by clicking the <strong>New Invoice</strong>{' '}
              button and get started
            </p>
          </div>
        )}
      </main>
    </>
  );
};
export default InvoicesOverview;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/invoices');
  const staticInvoices = await res.json();

  return {
    props: { staticInvoices },
  };
};
