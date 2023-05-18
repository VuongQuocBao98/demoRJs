// assets
import { format } from 'date-fns';
import {
  FilterOptionType,
  StaticDataTable,
  TableFilterOptionProps,
} from 'src/components/@orbit/table';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import mock from 'src/_mock/_mock';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@mui/material';
import Iconify from 'src/components/iconify';
import Actions from 'src/components/@orbit/Action';
import { IApplication } from 'src/@types/application';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'stt', label: 'STT' },
  { id: 'fullName', label: 'Full name' },
  { id: 'phoneNumber', label: 'Phone number' },
  { id: 'dateOfBirth', label: 'Date of birth' },
  { id: 'address', label: 'Address' },
  { id: 'id', label: 'CCCD' },
  { id: 'email', label: 'Email' },
  { id: 'action', label: 'Action' },
];

const TABLE_FILTERS = [
  {
    compType: FilterOptionType.Input,
    metadata: {
      id: 'fullName',
      label: 'Search by full name',
      defaultValue: '',
    },
    compProps: {
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          width: 250,
        },
      }),
    },
    filterFunc: (datum: IApplication, value) => datum.fullName.indexOf(value) > -1,
  },
  {
    compType: FilterOptionType.Select,
    metadata: {
      id: 'phoneNumber',
      label: 'Search by phone number',
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
          width: 250,
        },
      }),
    },
    filterFunc: (datum: IApplication, value) => datum.phoneNumber.indexOf(value) > -1,
  },
  {
    compType: FilterOptionType.Input,
    metadata: {
      id: 'email',
      label: 'Search by email',
      defaultValue: '',
    },
    compProps: {
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          width: 250,
        },
      }),
    },
    filterFunc: (datum: IApplication, value) => datum.email.indexOf(value) > -1,
  },
] as TableFilterOptionProps[];

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
    action: <Actions idx={idx} path={PATH_DASHBOARD.application.root} />,
  }));

const PageAction = () => {
  return (
    <Link component={RouterLink} to={PATH_DASHBOARD.application.createNew}>
      <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
        Add new
      </Button>
    </Link>
  );
};

export default function Application() {
  return (
    <PageLayout
      title="Application"
      headerBreadCrumbsProps={{
        heading: 'Application',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Application',
            href: PATH_DASHBOARD.application.root,
          },
        ],
        action: <PageAction />,
      }}
    >
      <StaticDataTable
        columns={TABLE_HEAD}
        data={mockData}
        selectable={true}
        shouldPaginate={true}
        filters={TABLE_FILTERS}
      />
    </PageLayout>
  );
}
