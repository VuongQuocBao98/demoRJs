// routes
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ExamRoomNewForm from 'src/sections/@dashboard/exam-room/ExamRoomNewForm';
import mock from 'src/_mock/_mock';

// ----------------------------------------------------------------------

const mockData = Array(30)
  .fill(0)
  .map((_, idx) => ({
    id: mock.id(idx),
    stt: idx + 1,
    fullName: mock.name.fullName(idx),
    phoneNumber: mock.phoneNumber(idx),
    dateOfBirth: format(mock.time(idx), 'MM/dd/yyyy'),
    address: mock.address.fullAddress(idx),
    email: mock.email(idx),
  }));

export default function ExamRoomEdit() {
  const { id } = useParams();
  const currentExamRoom = mockData[Number(id)];

  return (
    <PageLayout
      title="Examination Room"
      roles={FUNCTION_ROLE.EXAM_ROOM}
      headerBreadCrumbsProps={{
        heading: 'Edit Examination Room',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Examination Room',
            href: PATH_DASHBOARD.room.root,
          },
          {
            name: 'Edit Examination Room',
            href: PATH_DASHBOARD.room.edit,
          },
        ],
      }}
    >
      <ExamRoomNewForm isEdit currentRoom={currentExamRoom} />
    </PageLayout>
  );
}
