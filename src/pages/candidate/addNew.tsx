// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import CandidateAddNew from 'src/sections/@dashboard/candidate/CandidateAddNewForm';

// ----------------------------------------------------------------------

export default function CandidateAdd() {

  return (
    <PageLayout
      title="Add Candidate"
      roles={FUNCTION_ROLE.CANDIDATE}
      headerBreadCrumbsProps={{
        heading: 'Add Candidate',
        
      }}
    >
      <CandidateAddNew />
    </PageLayout>
  );
}
