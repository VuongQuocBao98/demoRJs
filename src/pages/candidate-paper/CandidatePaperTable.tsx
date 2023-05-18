// assets
import { Button, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { Link as RouterLink } from 'react-router-dom';
import {
  RemoteDataTable
} from 'src/components/@orbit/table';
import { TabsType } from 'src/components/@orbit/table/components/TableTabs';
import Label from 'src/components/label';
import { FUNCTION_ROLE } from 'src/config-global';
import { ICandidatePaper } from 'src/core/candidate-paper/domain';
import { useCandidatePaper } from 'src/core/candidate-paper/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { fDateTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const STATUS_ARRAY = ['Đã Chấm', 'Đang chấm', 'Chưa chấm'];

const TABLE_HEAD = [
  {
    id: 'fullName',
    label: 'Full name',
  },
  {
    id: 'identificationNumber',
    label: 'CCCD/CMT',
  },
  {
    id: 'exam',
    label: 'Exam',
    rowCell: {
      render: (datum: ICandidatePaper) => (
        <Link
          component={RouterLink}
          to={datum.exam}
          sx={{ textDecoration: 'underline', color: '#2F80ED' }}
        >
          <Typography>Link</Typography>
        </Link>
      ),
    },
  },
  { id: 'examLevel', label: 'Code' },
  { id: 'fullName', label: 'Giám thị' },
  {
    id: 'created',
    label: 'Ngày Thi',
    rowCell: {
      render: (datum: ICandidatePaper) => fDateTime(datum.created, 'dd MMM yyyy'),
    },
  },
  {
    id: 'status',
    label: 'Trạng thái',
    rowCell: {
      render: (datum: ICandidatePaper) => (
        <Label
          variant="soft"
          color={
            (datum.status === 0 && 'success') ||
            (datum.status === 1 && 'warning') ||
            (datum.status === 2 && 'error') ||
            'default'
          }
        >
          {STATUS_ARRAY[datum.status as number]}
        </Label>
      ),
    },
  },
];

const TABS = [
  { value: 'all', label: 'All', color: 'info', count: 10 },
  { value: '1', label: 'Đang chấm', color: 'error', count: 10 },
  { value: '0', label: 'Chưa chấm', color: 'warning', count: 10 },
  { value: '2', label: 'Đã chấm', color: 'success', count: 10 },
  { value: '3', label: 'Chấm lại', color: 'purple', count: 10 },
] as TabsType[];

const PageAction = ({ statusTab }: { statusTab: string }) => {
  return (
    <>
      <Switch>
        <Case condition={statusTab === TABS[1].value}>
          <Button
            variant="outlined"
          >
            Mark the test
          </Button>
        </Case>
        <Case condition={statusTab === TABS[3].value}>
          <Button
            variant="outlined"
          >
            Phúc khảo
          </Button>
        </Case>
        <Default>{null}</Default>
      </Switch>
    </>
  );
};

export default function CandidatePaperTable() {
  const { getListCandidatePaperTable } = useCandidatePaper();
  const [statusTab, setStatusTab] = useState('all');

  const handleDeleteMany = (ids: any) => {
    console.log('ids', ids);
  };

  const handleChangeTab = (tab: string | number) => {
    setStatusTab(`${tab}`);
  };

  return (
    <PageLayout
      title="Candidates’Paper"
      roles={FUNCTION_ROLE.RESULTS}
      headerBreadCrumbsProps={{
        heading: 'Candidates’Paper',
        action: <PageAction statusTab={statusTab} />,
      }}
    >
      <RemoteDataTable
        fetcher={getListCandidatePaperTable}
        selectable
        columns={TABLE_HEAD as any}
        shouldPaginate={true}
        // filters={TABLE_FILTERS}
        isAlwaysShowToolbar
        isHideOption
        tabs={TABS}
        onChangeTab={handleChangeTab}
        handleDeleteMany={handleDeleteMany}
        size="small"
      />
    </PageLayout>
  );
}
