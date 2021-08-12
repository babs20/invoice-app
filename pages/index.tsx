import Filter from '../components/Filter';
import Button from '../components/Button';
import Invoice from '../components/Invoice';
import currency from 'currency.js';
import { SetStateAction, useState, Dispatch } from 'react';
import { GetStaticProps } from 'next';
import { InvoiceArrType, InvoiceType, InvoiceStatus } from '../utils/types';
import FormContainer from '../layouts/FormContainer';

interface InvoicesOverviewProps {
  isFormOpen: boolean;
  isFormOpenSet: Dispatch<SetStateAction<boolean>>;
  invoices: InvoiceArrType;
}

export const InvoicesOverview = ({
  isFormOpen,
  isFormOpenSet,
  invoices,
}: InvoicesOverviewProps): JSX.Element => {
  type FilterType = {
    draft: boolean;
    pending: boolean;
    paid: boolean;
  };

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
      <FormContainer isFormOpen={isFormOpen} isFormOpenSet={isFormOpenSet} />
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
      </main>
    </>
  );
};
export default InvoicesOverview;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/invoices');
  const invoices = await res.json();

  return {
    props: { invoices },
  };
};
