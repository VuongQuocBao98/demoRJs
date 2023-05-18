// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import ResultNewForm from 'src/sections/@dashboard/result/ResultNewForm';

// ----------------------------------------------------------------------

export default function ResultCreateNew() {

  return (
    <PageLayout
      title="Result"
      roles={FUNCTION_ROLE.RESULTS}
      headerBreadCrumbsProps={{
        heading: 'Add Result',
      }}
    >
      <ResultNewForm />
    </PageLayout>
  );
}
