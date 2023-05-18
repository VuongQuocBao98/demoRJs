// routes
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ExamRoomNewForm from 'src/sections/@dashboard/exam-room/ExamRoomNewForm';

// ----------------------------------------------------------------------

export default function ExamRoomCreateNew() {

  return (
    <PageLayout
      title="Examination Room"
      roles={FUNCTION_ROLE.EXAM_ROOM}
      headerBreadCrumbsProps={{
        heading: 'Add Exam Room',
        
      }}
    >
      <ExamRoomNewForm />
    </PageLayout>
  );
}
