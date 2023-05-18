// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import LecturerNewForm from 'src/sections/@dashboard/lecturer/LecturerNewForm';

// ----------------------------------------------------------------------

export default function LecturerCreateNew() {

  return (
    <PageLayout
      title="Lecturer"
      roles={FUNCTION_ROLE.LECTURER}
      headerBreadCrumbsProps={{
        heading: 'Add Lecturer',
      }}
    >
      <LecturerNewForm />
    </PageLayout>
  );
}
