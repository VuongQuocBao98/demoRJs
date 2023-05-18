// assets
import { Avatar, Button, Card, Divider, Stack, Typography, useTheme } from '@mui/material';
import {
  FilterOptionType,
  RemoteDataTable,
  TableFilterOptionProps,
} from 'src/components/@orbit/table';
import { TabsType } from 'src/components/@orbit/table/components/TableTabs';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { FUNCTION_ROLE } from 'src/config-global';
import { IResult } from 'src/core/result/domain';
import { useResult } from 'src/core/result/presentations';
import PageLayout from 'src/layouts/PageLayout';
import ResultAnalytic from 'src/sections/@dashboard/result/ResultAnalytic';

// ----------------------------------------------------------------------
const RESULT_ARRAY = ['', 'Fail', 'Pass'];

const TABLE_HEAD = [
  { id: 'stt', label: 'STT' },
  {
    id: 'fullName',
    label: 'Full name',
    rowCell: {
      render: (datum: IResult) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={datum.fullName} src={datum.avatar} />
          <Typography variant="subtitle2">{datum.fullName}</Typography>
        </Stack>
      ),
    },
  },
  {
    id: 'email',
    label: 'Email',
  },
  { id: 'fullName', label: 'Lecturer' },
  {
    id: 'listening',
    label: 'Listening',
    rowCell: {
      TableCellProps: {
        align: 'center',
      },
    },
    TableHeadCellProps: {
      align: 'center',
      sx: {
        background: '#173664',
        color: 'white',
      },
    },
  },
  {
    id: 'speaking',
    label: 'Speaking',
    rowCell: {
      TableCellProps: {
        align: 'center',
      },
    },
    TableHeadCellProps: {
      align: 'center',
      sx: {
        background: '#173664',
        color: 'white',
      },
    },
  },
  {
    id: 'reading',
    label: 'Reading',
    rowCell: {
      TableCellProps: {
        align: 'center',
      },
    },
    TableHeadCellProps: {
      align: 'center',
      sx: {
        background: '#173664',
        color: 'white',
      },
    },
  },
  {
    id: 'writing',
    label: 'Writing',
    rowCell: {
      TableCellProps: {
        align: 'center',
      },
    },
    TableHeadCellProps: {
      align: 'center',
      sx: {
        background: '#173664',
        color: 'white',
      },
    },
  },
  {
    id: 'total',
    label: 'Total',
    rowCell: {
      TableCellProps: {
        align: 'center',
      },
      render: (datum: IResult) =>
        datum.listening + datum.speaking + datum.reading + datum.writing || 0,
    },
    TableHeadCellProps: {
      align: 'center',
      sx: {
        background: '#173664',
        color: 'white',
      },
    },
  },
  {
    id: 'status',
    label: 'Status',
    rowCell: {
      render: (datum: IResult) => (
        <Label
          variant="soft"
          color={(datum.status === 2 && 'success') || (datum.status === 1 && 'error') || 'default'}
        >
          {RESULT_ARRAY[datum.status]}
        </Label>
      ),
    },
  },
  {
    id: 'examLevel',
    label: 'Result',
    rowCell: {
      render: (datum: IResult) => <Label variant="soft">{datum.examLevel}</Label>,
    },
  },
];

const TABS = [
  { value: 'all', label: 'All', color: 'info', count: 10 },
  { value: 'paid', label: 'Pass', color: 'success', count: 10 },
  { value: 'unpaid', label: 'Fail', color: 'error', count: 10 },
] as TabsType[];

const TABLE_FILTERS = [
  {
    compType: FilterOptionType.Select,
    metadata: {
      id: 'address',
      label: 'Điểm thu hồ sơ',
      defaultValue: [],
      options: [
        { name: 'All', value: '' },
        { name: '265', value: '265' },
        { name: '365', value: '365' },
      ],
      displayKey: 'name',
      valueKey: 'value',
      multiple: true,
    },
    compProps: {
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          maxWidth: 160,
        },
      }),
    },
  },
  {
    compType: FilterOptionType.Input,
    metadata: {
      id: 'SearchContent',
      label: '',
      // defaultValue: '',
    },
    compProps: {
      placeholder: 'Nhập từ khóa tìm kiếm',
      fullWidth: true,
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          maxWidth: 300,
        },
      }),
    },
  },
] as TableFilterOptionProps[];

const PageAction = () => {
  return (
    <Button variant="outlined" startIcon={<Iconify icon="eva:download-fill" />}>
      Export
    </Button>
  );
};

export default function Result() {
  const theme = useTheme();

  const { getListResultTable } = useResult();

  return (
    <PageLayout
      title="Results"
      roles={FUNCTION_ROLE.RESULTS}
      headerBreadCrumbsProps={{
        heading: 'Results',
        action: <PageAction />,
      }}
    >
      <Card sx={{ mb: 5 }}>
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 3 }}
          >
            <ResultAnalytic
              title="Total"
              total={1000}
              percent={100}
              icon="ic:round-receipt"
              color={theme.palette.info.main}
            />
            <ResultAnalytic
              title="Pass"
              total={900}
              percent={90}
              icon="eva:checkmark-circle-2-fill"
              color={theme.palette.success.main}
            />
            <ResultAnalytic
              title="Fail"
              total={100}
              percent={10}
              icon="eva:close-circle-fill"
              color={theme.palette.error.main}
            />
          </Stack>
        </Scrollbar>
      </Card>
      <RemoteDataTable
        fetcher={getListResultTable}
        columns={TABLE_HEAD as any}
        shouldPaginate={true}
        filters={TABLE_FILTERS}
        isAlwaysShowToolbar
        isHideOption
        tabs={TABS}
      />
    </PageLayout>
  );
}
