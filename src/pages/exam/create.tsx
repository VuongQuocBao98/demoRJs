// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import ExamNewForm from 'src/sections/@dashboard/exam/Exam';

// ----------------------------------------------------------------------

export default function ExamCreateNew() {

  return (
    <PageLayout
      title="Exam"
      roles={FUNCTION_ROLE.EXAM}
      headerBreadCrumbsProps={{
        heading: 'Add Exam',
      }}
    >
      <ExamNewForm />
    </PageLayout>
  );
}
