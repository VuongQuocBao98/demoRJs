// assets
import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Actions from 'src/components/@orbit/Action';
import { RemoteDataTable } from 'src/components/@orbit/table';
import Iconify from 'src/components/iconify';
import { FUNCTION_ROLE } from 'src/config-global';
import { IExamRoom } from 'src/core/exam-room/domain';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDate, fDateTime } from 'src/utils/formatTime';
import { useExamRoom } from '../../core/exam-room/presentations/useExamRoom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'examRoomCode', label: 'Exam room code' },
  {
    id: 'date',
    label: 'Date',
    rowCell: {
      render: (datum: IExamRoom) => fDate(datum.date),
    },
  },
  {
    id: 'start',
    label: 'Start time',
    rowCell: {
      render: (datum: IExamRoom) => fDate(datum.start, 'hh:mm a'),
    },
  },
  {
    id: 'finish',
    label: 'End Time',
    rowCell: {
      render: (datum: IExamRoom) => fDate(datum.finish, 'hh:mm a'),
    },
  },
  {
    id: 'supervisorIDs',
    label: 'Giám thị thi',
    rowCell: {
      render: (datum: IExamRoom) => datum?.supervisorIDs?.[0]?.name,
    },
  },
  {
    id: 'exam',
    label: 'Đề thi',
    rowCell: {
      render: (datum: IExamRoom) => (
        <Link
          component={RouterLink}
          to={`${PATH_DASHBOARD.exam.edit}/${datum.testExamSetID}`}
          sx={{ textDecoration: 'underline', color: '#2F80ED' }}
        >
          Link
        </Link>
      ),
    },
  },
  {
    id: 'linkZoom',
    label: 'Link Zoom',
    rowCell: {
      render: (datum: IExamRoom) => (
        <Link
          component={RouterLink}
          to={datum.linkZoom}
          sx={{ textDecoration: 'underline', color: '#2F80ED' }}
        >
          Link
        </Link>
      ),
    },
  },
  {
    id: 'action',
    label: '',
    rowCell: {
      render: (datum: IExamRoom) => <Actions idx={datum.id!} path={PATH_DASHBOARD.room.root} />,
    },
  },
];

const PageAction = () => {
  return (
    <Link component={RouterLink} to={PATH_DASHBOARD.room.createNew}>
      <Button variant="outlined" startIcon={<Iconify icon={'eva:plus-fill'} />}>
        Add
      </Button>
    </Link>
  );
};

export default function ExamRoom() {
  const { getListExamRoom } = useExamRoom();

  return (
    <PageLayout
      title="Examination Room"
      roles={FUNCTION_ROLE.EXAM_ROOM}
      headerBreadCrumbsProps={{
        heading: 'Exam Room',
        action: <PageAction />,
      }}
    >
      <RemoteDataTable
        fetcher={getListExamRoom}
        columns={TABLE_HEAD as any}
        selectable
        shouldPaginate={true}
        isAlwaysShowToolbar
        isHideOption
      />
    </PageLayout>
  );
}
