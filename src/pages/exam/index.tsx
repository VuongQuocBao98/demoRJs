// assets
import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Actions from 'src/components/@orbit/Action';
import {
  FilterOptionType,
  RemoteDataTable,
  TableFilterOptionProps,
} from 'src/components/@orbit/table';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { DATE_FORMAT, FUNCTION_ROLE } from 'src/config-global';
import { IExam } from 'src/core/exam/domain';
import { useExam } from 'src/core/exam/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { getPathNameFromUrl } from 'src/utils/file';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'code',
    label: 'Exam',
    rowCell: {
      render: (datum: IExam) => (
        <Link
        to={PATH_DASHBOARD.exam.edit}
          component={RouterLink}
          
          sx={{ textDecoration: 'underline', textTransform: 'uppercase', color: '#2F80ED' }}
        >

          {datum.code}

        </Link>
      ),
    },
  },
  {
    id: 'creator',
    label: 'Creator',
  },
  {
    id: 'created',
    label: 'Created date',
    rowCell: {
      render: (datum: IExam) => fDate(datum.created, DATE_FORMAT),
    },
  },
  {
    id: 'updated',
    label: 'Updated date',
    rowCell: {
      render: (datum: IExam) => fDate(datum.updated ? datum.updated : datum.created, DATE_FORMAT),
    },
  },
  {
    id: 'status',
    label: 'Status',
    rowCell: {
      render: (datum: IExam) => (
        <Label
          variant="soft"
          color={
            (datum.status === 'Active' && 'success') ||
            (datum.status === 'Inactive' && 'error') ||
            'default'
          }
        >
          {datum.status}
        </Label>
      ),
    },
  },
  {
    id: 'action',
    label: '',
    rowCell: {
      render: (datum: IExam) => <Actions idx={datum.id!} path={PATH_DASHBOARD.exam.root} />,
    },
  },
];

const PageAction = () => {
  return (
    <Link component={RouterLink} to={PATH_DASHBOARD.exam.add}>
      <Button variant="outlined" startIcon={<Iconify icon={'eva:plus-fill'} />}>
        Add
      </Button>
    </Link>
  );
};

export default function Exam() {
  const { getListExam } = useExam();
  return (
    <PageLayout
      title="Exam"
      roles={FUNCTION_ROLE.EXAM}
      headerBreadCrumbsProps={{
        heading: 'Exam',
        action: <PageAction />,
      }}
    >
      <RemoteDataTable
        fetcher={getListExam}
        selectable
        columns={TABLE_HEAD as any}
        shouldPaginate={true}
      />
    </PageLayout>
  );
}
