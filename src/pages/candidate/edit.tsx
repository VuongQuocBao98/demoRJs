// routes
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import CandidateAddNew from 'src/sections/@dashboard/candidate/CandidateAddNewForm';
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
    createdAt:mock.createdAt(idx),
  }));

export default function CandidateEdit() {
  const { id } = useParams();
  const currentExam = mockData[Number(id)];
  console.log( currentExam);
  return (
    <PageLayout
      title="Exam"
      roles={FUNCTION_ROLE.CANDIDATE}
      headerBreadCrumbsProps={{
        heading: 'Edit Candidate',
      }}
    >
      <CandidateAddNew isEdit />
    </PageLayout>
  );
}
