import PageContainer from '../layouts/PageContainer';
import FormContainer from '../layouts/FormContainer';
import InvoicesOverview from './InvoicesOverview';
import { useState } from 'react';

export default function Home() {
  const [isFormOpen, isFormOpenSet] = useState<boolean>(false);

  return (
    <PageContainer>
      <InvoicesOverview isFormOpen={isFormOpen} isFormOpenSet={isFormOpenSet} />
      <FormContainer isFormOpen={isFormOpen} isFormOpenSet={isFormOpenSet} />
    </PageContainer>
  );
}
