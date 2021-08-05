import PageContainer from '../layouts/PageContainer';
import FormContainer from '../layouts/FormContainer';
import InvoicesOverview from './InvoicesOverview';
import ViewInvoice from './ViewInvoice';
import { useState } from 'react';
import data from '../data.json';

export default function Home() {
  const [isFormOpen, isFormOpenSet] = useState<boolean>(false);

  return (
    <PageContainer>
      <ViewInvoice invoice={data[1]} />
      {/* <InvoicesOverview isFormOpen={isFormOpen} isFormOpenSet={isFormOpenSet} />
      <FormContainer isFormOpen={isFormOpen} isFormOpenSet={isFormOpenSet} /> */}
    </PageContainer>
  );
}
