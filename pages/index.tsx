import PageContainer from '../layouts/PageContainer';
import FormContainer from '../layouts/FormContainer';
import InvoicesOverview from './InvoicesOverview';

export default function Home() {
  return (
    <PageContainer>
      <InvoicesOverview />
      <FormContainer />
    </PageContainer>
  );
}
