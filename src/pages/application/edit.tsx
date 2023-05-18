// routes
import { format } from 'date-fns';
import { useParams } from 'react-router';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ApplicationNewForm from 'src/sections/@dashboard/application/ApplicationNewForm';
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

export default function ApplicationEdit() {
  const { id } = useParams();
  const currentApplication = mockData[Number(id)];

  return (
    <PageLayout
      title="Application"
      headerBreadCrumbsProps={{
        heading: 'Edit Application',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Application',
            href: PATH_DASHBOARD.application.root,
          },
          {
            name: 'Edit Application',
            href: PATH_DASHBOARD.application.edit,
          },
        ],
      }}
    >
      <ApplicationNewForm isEdit currentApplication={currentApplication} />
    </PageLayout>
  );
}
