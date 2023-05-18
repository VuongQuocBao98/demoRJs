// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ProfileColectionAddNew from 'src/sections/@dashboard/profileColection/ProfileAddNewForm';


// ----------------------------------------------------------------------

export default function CandidateAdd() {

  return (
    <PageLayout
      title="Add Submission location"
      roles={FUNCTION_ROLE.PROFILE_COLLECTION}
      headerBreadCrumbsProps={{
        heading: 'Add Submission location',
        
      }}
    >
      <ProfileColectionAddNew />
    </PageLayout>
  );
}
