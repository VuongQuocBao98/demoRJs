// routes
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ResultNewForm from 'src/sections/@dashboard/result/ResultNewForm';
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

export default function ResultEdit() {
  const { id } = useParams();
  const currentResult = mockData[Number(id)];

  return (
    <PageLayout
      title="Result"
      roles={FUNCTION_ROLE.RESULTS}
      headerBreadCrumbsProps={{
        heading: 'Edit Result',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Result',
            href: PATH_DASHBOARD.results.root,
          },
          {
            name: 'Edit Result',
            href: PATH_DASHBOARD.results.edit,
          },
        ],
      }}
    >
      <ResultNewForm isEdit currentResult={currentResult} />
    </PageLayout>
  );
}
