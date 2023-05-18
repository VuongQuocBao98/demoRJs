// routes
import { format } from 'date-fns';
import { useParams } from 'react-router';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ScheduleNewForm from 'src/sections/@dashboard/schedule/ScheduleNewForm';
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

export default function ScheduleEdit() {
  const { id } = useParams();
  const currentSchedule = mockData[Number(id)];

  return (
    <PageLayout
      title="Schedule"
      headerBreadCrumbsProps={{
        heading: 'Edit Schedule',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Schedule',
            href: PATH_DASHBOARD.schedule.root,
          },
          {
            name: 'Edit Schedule',
            href: PATH_DASHBOARD.schedule.edit,
          },
        ],
      }}
    >
      <ScheduleNewForm isEdit currentSchedule={currentSchedule} />
    </PageLayout>
  );
}
